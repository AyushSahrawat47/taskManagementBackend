import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';

// env 
dotenv.config();
const PORT = process.env.PORT

const app = express();
connectDB();

//middlewares
app.use(cors());
app.use(helmet());


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})