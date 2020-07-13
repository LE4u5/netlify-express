const express = require('express');
const serverless = require('serverless-http');
const MongoClient = require('mongodb').MongoClient;
const {API_UN, API_PASS, API_URL} = process.env;
const url = `mongodb+srv://${API_UN}:${API_PASS}${API_URL}`;
const dbname = 'GlossedByK';

const mongoHandler = async () => {
    try {
        const connection = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Connected to server');
        const db = await connection.db(dbname);
        const coll = await db.collection('products');
        const data = await coll.find().toArray();
        
        return data;
    } catch(err){
        console.log('Error: ', err);
    }
    
}


const app = express();
const router = express.Router();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
});
//app.use(mongoHandler);

router.get('/', async (req, res) => {
    data = await mongoHandler();
    console.log('Retrieved data');
    res.json(data);
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);