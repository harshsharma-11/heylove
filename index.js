const express=require('express');
const app=express();
const port=8000;

app.set('view engine','ejs');
app.set('views','./view');

const db=require('./config/mongoose');