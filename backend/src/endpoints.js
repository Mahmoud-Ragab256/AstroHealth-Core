import Measurement from './mongo/models/Measurement.js';
import Report from './mongo/models/Report.js';
import { assessmentHandler } from './assessmentHandler.js';
import { gravityFields, respirationFields, nutritionFields, psychologicalFields, radiationFields } from './assessmentFields.js';

export const psychological = assessmentHandler('psychological', psychologicalFields);
export const radiation = assessmentHandler('radiation', radiationFields);
export const gravity = assessmentHandler('gravity', gravityFields);
export const respiration = assessmentHandler('respiration', respirationFields);
export const nutrition = assessmentHandler('nutrition', nutritionFields);

export const getReport = async (req, res) => {
  if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
    return res.status(400).json({ message: 'Invalid report ID' });
  }
  try {
    const report = await Report.findById(req.params.id).lean();
    if (!report) return res.status(404).json({ message: 'Report not found' });
    return res.json({ report });
  } catch {
    return res.status(500).json({ message: 'Could not load the report' });
  }
};

export const listReports = async (req, res) => {
  if (typeof req.query.astronaut_id !== 'string' || !req.query.astronaut_id.trim()) {
    return res.status(400).json({ message: 'astronaut_id is required' });
  }
  try {
    const reports = await Report.find({ 'astronaut.id': req.query.astronaut_id })
      .sort({ createdAt: -1 }).limit(100).lean();
    return res.json({ reports });
  } catch {
    return res.status(500).json({ message: 'Could not load reports' });
  }
};

export const analytics = async (req, res) => {
  try {
    const { astronautId } = req.params;
    const [legacyMeasurements, reports] = await Promise.all([
      Measurement.find({ astronaut_id: astronautId }).sort({ createdAt: 1 }).lean(),
      Report.find({ 'astronaut.id': astronautId, 'inputMeasurements.0': { $exists: true } })
        .select('inputMeasurements createdAt').lean()
    ]);
    const measurements = [
      ...legacyMeasurements,
      ...reports.flatMap(report => report.inputMeasurements.map(measurement => ({
        ...measurement,
        astronaut_id: astronautId,
        report_id: report._id,
        createdAt: report.createdAt
      })))
    ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const analyticsData = {
      heartRate: measurements.filter(m => m.measurement.includes('Heart Rate')),
      bloodPressure: measurements.filter(m => m.measurement.includes('Blood Pressure')),
      oxygenSaturation: measurements.filter(m => m.measurement.includes('Oxygen Saturation')),
      radiationExposure: measurements.filter(m => m.measurement.includes('Radiation Exposure') ||
        ['absorbed_dose', 'equivalent_dose', 'effective_dose', 'cumulative_radiation_dose'].includes(m.key)),
      boneDensity: measurements.filter(m => m.measurement.includes('Bone Density') || m.key === 'bmd_t_score'),
      muscleMass: measurements.filter(m => m.measurement.includes('Muscle Mass')),
      sleepDuration: measurements.filter(m => m.measurement.includes('Sleep Duration'))
    };

    res.status(200).json(analyticsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
