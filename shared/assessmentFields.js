// Field names and units transcribed from the supplied assessment sheets.
// Reference ranges are interpreted by the model service, not this API.
export const gravityFields = [
  { key: 'bmd_t_score', name: 'BMD T-score', unit: 'T-score' },
  { key: 'bone_density_change', name: 'Bone Density Change', unit: '% change' },
  { key: 'calcium', name: 'Calcium', unit: 'mg/dL' },
  { key: 'vitamin_d', name: 'Vitamin D (25-OH)', unit: 'ng/mL' },
  { key: 'muscle_mass', name: 'Muscle Mass', unit: 'relative to baseline' },
  { key: 'muscle_strength', name: 'Muscle Strength', unit: 'relative to baseline' },
  { key: 'muscle_loss', name: 'Muscle Loss', unit: '%' },
  { key: 'balance_score', name: 'Balance Score', unit: '%' },
  { key: 'physical_performance', name: 'Physical Performance', unit: '%' },
  { key: 'orthostatic_tolerance', name: 'Orthostatic Tolerance', unit: 'seconds' },
  { key: 'p1np', name: 'P1NP', unit: 'assay-specific' },
  { key: 'ctx_i', name: 'CTX-I', unit: 'assay-specific' },
  { key: 'osteocalcin', name: 'Osteocalcin', unit: 'assay-specific' }
];

export const respirationFields = [
  { key: 'pao2', name: 'PaO2', unit: 'mmHg' },
  { key: 'paco2', name: 'PaCO2', unit: 'mmHg' },
  { key: 'blood_ph', name: 'Blood pH', unit: 'pH' }
];

export const nutritionFields = [
  { key: 'protein_intake', name: 'Protein Intake', unit: 'g/day' },
  { key: 'ferritin', name: 'Ferritin', unit: 'ng/mL' },
  { key: 'hemoglobin_male', name: 'Hemoglobin (Male)', unit: 'g/dL' },
  { key: 'hemoglobin_female', name: 'Hemoglobin (Female)', unit: 'g/dL' },
  { key: 'transferrin_saturation', name: 'Transferrin Saturation', unit: '%' },
  { key: 'serum_iron', name: 'Serum Iron', unit: 'µg/dL' },
  { key: 'vitamin_k', name: 'Vitamin K', unit: 'assay-specific' },
  { key: 'omega_3', name: 'Omega-3', unit: 'assay-specific' },
  { key: 'hydration_score', name: 'Hydration Score', unit: '%' },
  { key: 'urine_specific_gravity', name: 'Urine Specific Gravity', unit: 'ratio' },
  { key: 'urine_volume', name: 'Urine Volume', unit: 'mL/kg/hr' },
  { key: 'body_weight', name: 'Body Weight', unit: 'kg / % change' }
];

export const psychologicalFields = [
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


export const radiationFields = [
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


export const assessmentFields = { radiation: radiationFields, psychological: psychologicalFields, gravity: gravityFields, respiration: respirationFields, nutrition: nutritionFields };
