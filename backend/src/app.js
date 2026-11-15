import express from 'express';
import connectDB from './mongo/db.js';
import { analytics, radiation, psychological, gravity, respiration, nutrition, getReport, listReports } from './endpoints.js';

const app = express();



app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'astrohealth-backend' }));
app.use('/api', async (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  try { await connectDB(); next(); }
  catch { res.status(503).json({ message: 'Database connection is unavailable' }); }
});

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


export default app;
