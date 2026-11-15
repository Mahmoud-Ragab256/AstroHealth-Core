import dotenv from 'dotenv';
import express from 'express';
import connectDB from './mongo/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('السيرفر يعمل ومتصل بقاعدة البيانات بنجاح (ES Modules)!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on : http://localhost:${PORT}`);
});