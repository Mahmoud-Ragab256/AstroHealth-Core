import dotenv from 'dotenv';
import express from 'express';
import connectDB from './mongo/db.js';
import { analytics, radiation, psychological, gravity, respiration, nutrition, getReport, listReports } from './endpoints.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/api/analytics/:astronautId', analytics);
app.post('/api/radiation', radiation);
app.post('/api/psychological', psychological);
app.post('/api/gravity', gravity);
app.post('/api/respiration', respiration);
app.post('/api/nutrition', nutrition);
app.get('/api/reports', listReports);
app.get('/api/reports/:id', getReport);

app.get('/', (req, res) => {
  res.send('السيرفر يعمل ومتصل بقاعدة البيانات بنجاح (ES Modules)!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on : http://localhost:${PORT}`);
});
