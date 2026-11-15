import 'dotenv/config';
import connectDB from './mongo/db.js';
import Report from './mongo/models/Report.js';
import Measurement from './mongo/models/Measurement.js';

connectDB();

const measurementTypes = [
  { name: 'Heart Rate', unit: 'BPM' },
  { name: 'Blood Pressure', unit: 'mmHg' },
  { name: 'Oxygen Saturation', unit: 'SpO2' },
  { name: 'Radiation Exposure - Daily Dose', unit: 'Sv' },
  { name: 'Radiation Exposure - Cumulative Dose', unit: 'Sv' },
  { name: 'Bone Density', unit: 'BMD' },
  { name: 'Muscle Mass', unit: 'kg' },
  { name: 'Sleep Duration', unit: 'H' }
];

const generate30Records = (astronautId) => {
  const records = [];
  for (let i = 1; i <= 30; i++) {
    const type = measurementTypes[(i - 1) % measurementTypes.length];
    records.push({
      astronaut_id: astronautId,
      measurement: `${type.name} #${i}`,
      unit: type.unit,
      value: Number((Math.random() * 50 + 10).toFixed(2))
    });
  }
  return records;
};

const importData = async () => {
  try {
    await Report.deleteMany();
    await Measurement.deleteMany();

    const reports = [];
    const measurements = [];

    const sameAstronautId = 'ASTRONAUT_SAME_001';
    for (let i = 1; i <= 5; i++) {
      const reportMeasurements = generate30Records(sameAstronautId);
      reports.push({
        assessment: {
          name: `Assessment`,
          type: 'Routine',
          date: new Date()
        },
        astronaut: {
          id: sameAstronautId,
          mission: 'Artemis Mission',
          day: i
        },
        measurements: reportMeasurements.map(m => ({
          measurement: m.measurement,
          unit: m.unit,
          value: m.value,
          reference: 'Standard',
          status: 'Normal'
        })),
        diagnosis: 'Normal parameters observed',
        prediction: 'Stable health trajectory',
        recommendation: 'Continue standard protocol',
        date: new Date()
      });
      measurements.push(...reportMeasurements);
    }

    const differentAstronautIds = [
      'ASTRONAUT_DIFF_002',
      'ASTRONAUT_DIFF_003',
      'ASTRONAUT_DIFF_004',
      'ASTRONAUT_DIFF_005',
      'ASTRONAUT_DIFF_006'
    ];

    for (let i = 0; i < 5; i++) {
      const astronautId = differentAstronautIds[i];
      const reportMeasurements = generate30Records(astronautId);
      reports.push({
        assessment: {
          name: 'Initial Screening',
          type: 'Comprehensive',
          date: new Date()
        },
        astronaut: {
          id: astronautId,
          mission: 'Gateway Mission',
          day: 1
        },
        measurements: reportMeasurements.map(m => ({
          measurement: m.measurement,
          unit: m.unit,
          value: m.value,
          reference: 'Standard',
          status: 'Normal'
        })),
        diagnosis: 'Initial checks passed',
        prediction: 'Ready for deep space',
        recommendation: 'Monitor daily vitals',
        date: new Date()
      });
      measurements.push(...reportMeasurements);
    }

    await Report.insertMany(reports);
    await Measurement.insertMany(measurements);

    console.log('Data Imported Successfully for Reports and Measurements!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();