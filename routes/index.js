const express = require('express');
const Promise = require('bluebird');
const request = require('request');
const moment = require('moment');

const router = express.Router();

const tempWeights = {
  68: 1,
  69: 2,
  70: 3,
  71: 4,
  72: 7,
  73: 10,
  74: 13,
  75: 16,
  76: 15,
  77: 14,
  78: 13,
  79: 12,
  80: 11,
  81: 10,
  82: 9,
  83: 8,
  84: 7,
  85: 6,
  86: 5,
  87: 4,
  88: 3,
  89: 2,
  90: 1
};

const calculateRoof = (temp, precip, wind, uv) => {
  // Rain change over 35% is a no go
  if (precip >= 0.35) return [false, 0];

  // Get the current weight of the temperature
  const tmpWeight = tempWeights[Math.floor(temp)] || 0;

  // roofday is temperature weight times wind minus UV
  const windWeight = wind > 20 ? 0 : wind * -0.7;
  if (windWeight === 0) return [false, 0];

  // UV Weight is 1.5 * the UV but it's bad so we weight it negatively
  const uvWeight = uv * -1.5;
  const roofday = tmpWeight + (windWeight - uvWeight);

  return [roofday > 9.5, roofday];
};

const getWeather = (location) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?${location},us&appid=${process.env.WEATHER_KEY}`;
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if (err) console.log(err);
      resolve(JSON.parse(body));
    });
  });
};

const getUV = () => {
  // Use coordinates from Charlotte since not available for Fort Mills
  const url = `http://api.openweathermap.org/v3/uvi/35.2,-80.8/current.json?appid=${process.env.WEATHER_KEY}`;

  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      if (err) console.log(err);
      resolve(JSON.parse(body));
    });
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  let tmp = 0;
  let precip = 0;
  let wind = 0;
  let clouds = 0;

  getWeather('zip=29707').then((body) => {
    if(body.cod !== 200) {
      return Promise.reject(new Error(body.message));
    }
    tmp = (9/5) * (body.main.temp - 273) + 32;
    precip = body.precipitation ? body.precipitation.value : 0;
    wind = body.wind.speed;
    clouds = body.clouds.all;

    return getUV();
  }).then((body) => {
    let uv = body.data;
    const [roofday, metric] = calculateRoof(tmp, precip, wind, uv);
    res.render('index', { title: roofday ? 'YES' : 'NO', tmp, precip, wind, uv: uv, clouds, metric });
  }).catch((err) => {
    console.error(err);
    res.render('index', { title: 'ERR', tmp: 0, precip: 0, wind: 0, uv: 0, clouds: 0, metric: 0});
  });
});

module.exports = router;
