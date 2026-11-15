import Report from './mongo/models/Report.js';

// One report write keeps the submitted values and model result together atomically.
export function assessmentHandler(type, fields) {
  return async (req, res) => {
    const data = req.body;
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      return res.status(400).json({ message: 'A JSON object is required' });
    }
    for (const key of ['astronaut_id', 'mission']) {
      if (typeof data[key] !== 'string' || !data[key].trim()) {
        return res.status(400).json({ message: `${key} is required` });
      }
    }
    if (!Number.isInteger(data.day) || data.day < 0) {
      return res.status(400).json({ message: 'day must be a non-negative integer' });
    }
    const suppliedFields = fields.filter(field => data[field.key] !== undefined);
    if (!suppliedFields.length) {
      return res.status(400).json({ message: 'Provide at least one assessment measurement' });
    }
    for (const field of suppliedFields) {
      const value = data[field.key];
      const valid = field.key === 'radiation_type'
        ? typeof value === 'string' && value.trim().length > 0
        : typeof value === 'number' && Number.isFinite(value);
      if (!valid) {
        return res.status(400).json({ message: `Invalid value for ${field.key}` });
      }
    }

    let modelResponse;
    try {
      const baseUrl = (process.env.MODEL_API_URL || 'http://localhost:8000').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(30000)
      });
      if (!response.ok) {
        if (response.status === 400 || response.status === 422) {
          const details = await response.json();
          const missing = (details.skipped_models || [])
            .map(item => `${item.model}: ${(item.missing_fields || []).join(', ')}`)
            .join('; ');
          const validation = (details.errors || [])
            .map(item => `${item.field}: ${item.message}`).join('; ');
          return res.status(422).json({
            message: [details.message || 'Invalid model input', missing || validation].filter(Boolean).join('. '),
            details
          });
        }
        return res.status(502).json({ message: 'Model service returned an error' });
      }
      modelResponse = await response.json();
      if (!modelResponse || Array.isArray(modelResponse) || typeof modelResponse !== 'object' || !Object.keys(modelResponse).length) {
        return res.status(502).json({ message: 'Model service must return a non-empty JSON object' });
      }
    } catch (error) {
      const timeout = error.name === 'TimeoutError' || error.name === 'AbortError';
      return res.status(timeout ? 504 : 502).json({
        message: timeout ? 'Model service timed out' : 'Model service is unavailable or returned invalid JSON'
      });
    }

    try {
      const report = await Report.create({
        assessment: { name: `${type[0].toUpperCase()}${type.slice(1)} Assessment`, type, date: new Date() },
        astronaut: { id: data.astronaut_id, mission: data.mission, day: data.day },
        submittedValues: data,
        inputMeasurements: suppliedFields.map(field => ({
          key: field.key, measurement: field.name, unit: field.unit, value: data[field.key]
        })),
        modelResponse
      });
      return res.status(201).json({ message: 'Success', report });
    } catch {
      return res.status(500).json({ message: 'Could not save the assessment report' });
    }
  };
}
