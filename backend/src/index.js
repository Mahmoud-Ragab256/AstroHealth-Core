import dotenv from 'dotenv';
import express from 'express';
import connectDB from './mongo/db.js'; // ملاحظة: كتابة .js هنا إجبارية

dotenv.config();

const app = express();

// الاتصال بقاعدة البيانات
connectDB();

// Middleware لقراءة بيانات JSON
app.use(express.json());

// مسار تجريبي
app.get('/', (req, res) => {
  res.send('السيرفر يعمل ومتصل بقاعدة البيانات بنجاح (ES Modules)!');
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});