import mongoose from 'mongoose';

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

  diagnosis: { type: String, required: true },
  prediction: { type: String, required: true },
  recommendation: { type: String, required: true },

  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

export default Report;