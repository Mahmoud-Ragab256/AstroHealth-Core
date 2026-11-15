import Measurement from './mongo/models/Measurement.js';
import Report from './mongo/models/Report.js';
import { assessmentHandler } from './assessmentHandler.js';
import { gravityFields, respirationFields, nutritionFields } from './assessmentFields.js';

const psychologicalFields = [
  { key: 'sleep_duration', name: 'Sleep Duration', unit: 'hours' },
  { key: 'sleep_efficiency', name: 'Sleep Efficiency', unit: '%' },
  { key: 'sleep_latency', name: 'Sleep Latency', unit: 'minutes' },
  { key: 'awakenings', name: 'Awakenings', unit: 'count/night' },
  { key: 'mood_score', name: 'Mood Score', unit: '1–10' },
  { key: 'stress_score', name: 'Stress Score', unit: '0–100' },
  { key: 'phq_9', name: 'PHQ-9', unit: 'score / 27' },
  { key: 'attention', name: 'Attention', unit: '%' },
  { key: 'memory', name: 'Memory', unit: '%' },
  { key: 'decision_making', name: 'Decision Making', unit: '%' },
  { key: 'reaction_time', name: 'Reaction Time', unit: 'ms' },
  { key: 'sleep_quality', name: 'Sleep Quality', unit: 'score' }
];


const radiationFields = [
  { key: 'absorbed_dose', name: 'Absorbed Dose', unit: 'Gy' },
  { key: 'equivalent_dose', name: 'Equivalent Dose', unit: 'Sv' },
  { key: 'effective_dose', name: 'Effective Dose', unit: 'Sv' },
  { key: 'cumulative_radiation_dose', name: 'Cumulative Radiation Dose', unit: 'Sv' },
  { key: 'wbc', name: 'WBC', unit: 'cells/µL' },
  { key: 'neutrophils_absolute', name: 'Neutrophils (absolute)', unit: '10^9/L' },
  { key: 'lymphocytes_absolute', name: 'Lymphocytes (absolute)', unit: '10^9/L' },
  { key: 'monocytes_absolute', name: 'Monocytes (absolute)', unit: '10^9/L' },
  { key: 'eosinophils_absolute', name: 'Eosinophils (absolute)', unit: '10^9/L' },
  { key: 'basophils_absolute', name: 'Basophils (absolute)', unit: '10^9/L' },
  { key: 'gamma_h2ax', name: 'γ-H2AX', unit: 'assay-specific' },
  { key: 'comet_assay', name: 'Comet Assay', unit: 'assay-specific' },
  { key: 'micronucleus_assay', name: 'Micronucleus Assay', unit: 'assay-specific' },
  { key: 'radiation_type', name: 'Radiation Type', unit: 'categorical' },
  { key: 'exposure_duration', name: 'Exposure Duration', unit: 'time' }
];

export const psychological = assessmentHandler('psychological', psychologicalFields);
export const radiation = assessmentHandler('radiation', radiationFields);
export const gravity = assessmentHandler('gravity', gravityFields);
export const respiration = assessmentHandler('respiration', respirationFields);
export const nutrition = assessmentHandler('nutrition', nutritionFields);

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


