'use strict';

const   {PORT} = require('../conf'),
        os = require('os'),
        ifaces = os.networkInterfaces(),
        ipProvider = {};

const Ip = function(name, address) {
    this.name = name;
    this.address = address;
    this.port = PORT;
  }

ipProvider.getIps = function() {

    var ips = [];

    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
              // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              return;
            }

            var ip = new Ip(ifname, iface.address);

            if (alias >= 1) {
              // This single interface has multiple ipv4 addresses
              // console.log(ifname + ':' + alias, iface.address);
              ip.alias = alias;
            } else {
              // This interface has only one ipv4 adress
              // console.log(ifname, iface.address);
            }

            ips.push(ip);

            ++alias;
          });
      });

    return ips;

  };

module.exports = ipProvider;
