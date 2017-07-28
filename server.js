const http = require('http');
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(dom.window);
const jquerver = require('./jquerver');
const calculateRoof = require('./calculator').calculateRoof;
const templates = require('./template');
const css = require('./css').css;

const server = http.createServer();
jquerver.jquerate(server, $);

let weatherData = {
  data: { title: 'NO', tmp: 0.0, precip: 0.0, wind: 0.0, uv: 0.0, clouds: 0.0, metric: 0.0 },
  timestamp: null
};

// App code here
/* GET home page. */
const home = (req, res) => {
  // Cache the results so we don't have to ping their api all the time
  const currentTime = +new Date();
  if (weatherData.timestamp && !((currentTime - weatherData.timestamp) > 60 * 60 * 100)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    $('body').html(templates.main(weatherData.data));
    return res.end(dom.serialize());
  }

  let tmp = 0;
  let precip = 0;
  let wind = 0;
  let clouds = 0;

  return $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?zip=29707,us&appid=${process.env.WEATHER_KEY}`,
    method: 'GET'
  }).then(function(weather) {
    tmp = (9/5) * (weather.main.temp - 273) + 32;
    precip = weather.precipitation ? weather.precipitation.value : 0;
    wind = weather.wind.speed;
    clouds = weather.clouds.all;

    return $.ajax({
      url: `http://api.openweathermap.org/v3/uvi/35.2,-80.8/current.json?appid=${process.env.WEATHER_KEY}`,
      method: 'GET'
    });
  }).then(function(weather) {
    let uv = weather.data;
    const [roofday, metric] = calculateRoof(tmp, precip, wind, uv);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    weatherData = {
      timestamp: currentTime,
      data: { title: roofday ? 'YES' : 'NO', tmp, precip, wind, uv: uv, clouds, metric }
    };

    $('body').html(templates.main(weatherData.data));
    return res.end(dom.serialize());
  });
};

$(server).on('listening', function(e) {
  console.log('Server is listening on port:', e.target.address().port);
});

$(server).on('request', function(server, req, res) {
  switch (req.url) {
  case '/':
    home(req, res);
    break;
  case '/stylesheets/style.css':
    res.writeHead(200, {
      'Content-Type': 'text/css',
      'Cache-Control': `max-age=${60*60*24*7*365}`
    });
    res.end(css);
    break;
  default:
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Not found');
    break;
  }
});

server.listen(process.env.PORT || 8000);
