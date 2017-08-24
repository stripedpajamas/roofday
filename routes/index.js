const weatherGenerator = require('../controller/weather');
const css = require('../templates/assets/css');

module.exports = ($) => {
  const weatherController = weatherGenerator($);

  // '/' and '/stylesheets'
  $.route('index')
    .append('<stylesheets>')
    .append('<not-found>');

  // '/stylesheets/style.css'
  $.route('stylesheets')
    .append('<style.css>');

  // index route handler
  $.route('index')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      weatherController(req, res);
    });

  // css route handler
  $.route('style\.css')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      res.writeHead(200, {
        'Content-Type': 'text/css',
        'Cache-Control': `max-age=${60*60*24*7*365}`
      });
      res.end(css);
    });

  // this is the default 404 route added by Yttrium
  // by specifying a handler we can customize the 404 response
  $.route('not-found')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('Not found');
    });
};
