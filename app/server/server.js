/*
* Server 
*/
'use strict';

const   {PORT} = require('./../conf'),
        http = require('http'),
        dispatcher = require('./http-dispatcher'),
        ipProvider = require('../utils/ip-provider'),
        ips = ipProvider.getIps();

let     instance;

const init = function() {

    if(init.initialized){ return false; }
    init.initialized = true;

    dispatcher.init();

    instance = http.createServer(handleRequest);

    // Lets start our server
    instance.listen(PORT, function() {
        console.log('Server listening on: %s:%s',ips[0].address, PORT);
      });

  };

const handleRequest = function(request, response) {
    try {
      dispatcher.instance.dispatch(request, response);
    } catch (err) {
      console.log(err);
    }
  };


module.exports = {
    init: init,
    isInitialized: function() {
        return !!init.initialized;
      },
    instance: instance
  };