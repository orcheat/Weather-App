const express=require('express');
const https=require('https');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res)
{
    res.sendFile(__dirname +"/index.html")
    
});
app.post('/', function(req, res)
{
    const url="https://api.weatherapi.com/v1/current.json?key=1eb27a451e2a4423954185311221708&q="+req.body.cityName+"&aqi=no"
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
           const temp = weatherData.current.temp_c;
           const weatherDescription=weatherData.current.condition.text;
           const icon=weatherData.current.condition.icon;
        res.write("<h1>The temperature in "+req.body.cityName+" is "+temp+" degree Celcius</h1>" );
        res.write("<h3>The weather condition is "+weatherDescription+" </h3>");
        res.write("<img src="+icon+">");
        res.send();
        });

    });
});
app.listen(3000,function(){
    console.log("server is running");
});