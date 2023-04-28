const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '26b660f3c823da707c6483ce3872eb4c';
// const mapAPI = 'AIzaSyDmiEZVYtyD8hd13Bg9E2zSa5kQtmeC3Sk';

app.use('/public/css', express.static(__dirname + '/public/css', { 
  setHeaders: function (res, path, stat) {
    res.set('Content-Type', 'text/css');
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null });
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
        res.render('index', { weather: weatherText, error: null, lat: latitude, lon: longitude, apiKey: apiKey });
      }
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Weather app listening on port ${port}!`);
});