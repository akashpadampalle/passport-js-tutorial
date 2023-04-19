const express = require('express');
const db = require('./configs/db_connection');
const port = 8000;


const app = express();



app.listen(port, (err) => {
    if(err){console.log(err);return;}
    console.log(`server is runnig at port ${port}`);
})