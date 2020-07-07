const express = require('express');
const serverless = require('serverless-http');
const PRODUCTS = require('./products')


const app = express();
const router = express.Router();

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.get('/', (req,res) => {
    res.json( PRODUCTS );
});

app.use('/.netlify/functions/api',router);

module.exports.handler = serverless(app);