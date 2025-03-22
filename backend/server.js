import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const app = express();
app.use(cors());
const { Pool } = pkg;