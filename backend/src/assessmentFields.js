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
