import dotenv from 'dotenv';
import express from 'express';
import dbConnect from './src/db/dbconnect.js';

dotenv.config();
dbConnect();


const app = express();
const port = process.env.PORT || 9652;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });


