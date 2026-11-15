import mongoose from 'mongoose';

// Legacy reports contain interpreted fields; new reports preserve the model's
// complete response without assuming its clinical output schema.
function requiresLegacyResult() {
  return this.modelResponse == null;
}

const reportSchema = new mongoose.Schema({
  assessment: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true }
  },

  astronaut: {
    id: { type: String, required: true },
    mission: { type: String, required: true },
    day: { type: Number, required: true }
  },

  measurements: [
    {
      measurement: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
      reference: { type: String, required: true },
      status: { type: String, required: true }
    }
  ],

  diagnosis: { type: String, required: requiresLegacyResult },
  prediction: { type: String, required: requiresLegacyResult },
  recommendation: { type: String, required: requiresLegacyResult },

  submittedValues: { type: mongoose.Schema.Types.Mixed },
  inputMeasurements: [{
    key: { type: String, required: true },
    measurement: { type: String, required: true },
    unit: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
  }],
  modelResponse: { type: mongoose.Schema.Types.Mixed },

  date: { type: Date, default: Date.now }
}, {
  timestamps: true,
  minimize: false
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
