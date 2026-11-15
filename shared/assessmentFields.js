import fields from './assessmentFields.json' with { type: 'json' };

export const assessmentFields = fields;
export const { gravity: gravityFields, respiration: respirationFields, nutrition: nutritionFields, psychological: psychologicalFields, radiation: radiationFields } = fields;
