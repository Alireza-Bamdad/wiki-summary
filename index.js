import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';

const app = express();

app.get('/topic/:topic',async (req, res)=>{
    try{

    
        const response = await axios.get(`https://en.wikipedia.org/wiki/${req.params.topic}`)
        const data = await response.data;
        const $ = load(data)
        const summary =  $("#mw-content-text > div > table.infobox + p").text();
        console.log("statusCode  : ",res.statusCode)
        res.send(summary);

    }catch(error){
        res.send(`Topic "${req.params.topic}" not found !`)
    
    };

    
})

app.listen(3000 , ()=>{
    console.log("Wikipedia summary is running on port 3000 !")
})