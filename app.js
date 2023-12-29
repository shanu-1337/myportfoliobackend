require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const cors = require('cors');
const router = require('./Routes/router')
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json())
app.use('/uploads',express.static("./uploads"));
app.use(router);


// app.get('/',(req,res)=>{
//     res.status(201).json('server started')
// })

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
})