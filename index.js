const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine',"ejs");

app.post('/find',(req,res)=>{
    var city = req.body.city;
    var code = req.body.code;
// Enter your API code below
    var API_KEY = '';
    var URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${API_KEY}`;
    axios.get(URL)
    .then((weather)=>{
        console.log(weather.data.base);
        app.set('data',weather.data);
        res.redirect('/');
    });
});

app.get('/',(req,res)=>{
    res.render('index',{retrievedData : app.get('data')});
});

app.listen(port);
