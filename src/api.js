const express = require('express');
const serverless = require('serverless-http');
const PRODUCTS = require('./products')
const app = express();
const router = express.Router();

router.get('/', (req,res) => {
    res.json( PRODUCTS );
});

app.use('/.netlify/functions/api',router);

module.exports.handler = serverless(app);