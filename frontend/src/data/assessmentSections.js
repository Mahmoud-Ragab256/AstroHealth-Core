export const assessmentSections = {
  radiation: [
    { title: 'Radiation dose', description: 'Enter the readings reported by your dosimeter.', keys: ['absorbed_dose', 'equivalent_dose', 'effective_dose', 'cumulative_radiation_dose'] },
    { title: 'Blood cell counts', description: 'Use the units shown beneath each measurement.', keys: ['wbc', 'neutrophils_absolute', 'lymphocytes_absolute', 'monocytes_absolute', 'eosinophils_absolute', 'basophils_absolute'] },
    { title: 'DNA markers & exposure', keys: ['gamma_h2ax', 'comet_assay', 'micronucleus_assay', 'radiation_type', 'exposure_duration'] }
  ],
  psychological: [
    { title: 'Sleep measurements', description: 'All four sleep measurements are needed for the sleep model.', keys: ['sleep_duration', 'sleep_efficiency', 'sleep_latency', 'awakenings'] },
    { title: 'Wellbeing & cognitive measurements', description: 'Optional recorded measurements. The current model does not analyze these values.', keys: ['mood_score', 'stress_score', 'attention', 'memory', 'decision_making', 'reaction_time', 'sleep_quality'] }
  ],
  gravity: [
    { title: 'Bone health', keys: ['bmd_t_score', 'bone_density_change', 'calcium', 'vitamin_d', 'p1np', 'ctx_i', 'osteocalcin'] },
    { title: 'Muscle strength & balance', keys: ['muscle_mass', 'muscle_strength', 'muscle_loss', 'balance_score', 'physical_performance', 'orthostatic_tolerance'] }
  ],
  nutrition: [
    { title: 'Nutrition & blood markers', keys: ['protein_intake', 'ferritin', 'hemoglobin_male', 'hemoglobin_female', 'transferrin_saturation', 'serum_iron', 'vitamin_k', 'omega_3'] },
    { title: 'Hydration & body weight', keys: ['hydration_score', 'urine_specific_gravity', 'urine_volume', 'body_weight'] }
  ],
  respiration: [{ title: 'Arterial blood gases', description: 'Enter all three readings for the respiratory assessment.', keys: ['pao2', 'paco2', 'blood_ph'] }]
};
