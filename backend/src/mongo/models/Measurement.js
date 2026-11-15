import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema({
  astronaut_id: {
    type: String,
    required: true
  },
  measurement: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Measurement = mongoose.model('Measurement', measurementSchema);

export default Measurement;