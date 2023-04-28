const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

app.use('/public/css', express.static(__dirname + '/public/css', { 
  setHeaders: function (res, path, stat) {
    res.set('Content-Type', 'text/css');
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null, apiKey: process.env.MAPS_API_KEY});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name} with humidity of ${weather.main.humidity}!`;
        let latitude = parseFloat(weather.coord.lat);
        let longitude = parseFloat(weather.coord.lon);
        res.render('index', { weather: weatherText, error: null, lat: latitude, lon: longitude, apiKey: process.env.MAPS_API_KEY});
      }
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Weather app listening on port ${port}!`);
});