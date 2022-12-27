import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

//to use .env variables and start config
dotenv.config();

const configuration=new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const app = new express();
app.use(cors());
app.use(express.json());

