import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import APIRouter from './api/graphql.js';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('./public'));

app.use('/api',APIRouter);

app.use('*',(req,res)=>{res.sendFile(path.resolve(__dirname,'./public/index.html'))})

app.listen(PORT,()=>console.log(`App listening on port ${PORT}`));