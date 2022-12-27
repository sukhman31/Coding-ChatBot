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
//to allow cross origin requests
app.use(cors());

//to allow json to pass from frontend to backend
app.use(express.json());

//dummy route
app.get('/',async(req,res)=>{
    res.status(200).send({
        message: 'Hello from Codex'
    })
});

//get cant receive data from frontend so we make post
app.post('/',async(req,res)=>{
    try{
        const prompt = req.body.propmt;

        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${prompt}`,
            temperature:0,
            max_tokens:3000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

app.listen(5000, ()=> console.log('Server is running on port 5000'));
