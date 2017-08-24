const yt = require('yttrium-server');
const routes = require('./routes');

const { $, server, router } = yt;

// load routes into Yttrium router
routes($);

// install router into server
$(server).on('request', router);

// start everything up
$(server).on('listening', function(e) {
  console.log('Server is listening on port:', e.target.address().port);
});

$.listen(server, process.env.PORT || 8000);