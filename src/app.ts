import express from 'express';
import mongoose from 'mongoose';
import menuRoute from './routes/menuRoute';
import restaurentRoute from './routes/restaurentRoute';
import cors from 'cors';
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurent');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3001',
}));
app.use(express.json());

app.use('/api/restaurent', restaurentRoute);
app.use('/api/menu', menuRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
