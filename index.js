const request = require('request');
const fs = require('fs');
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = () => {
  return new Promise((resolve, reject) => {
    cache.get('proxies', (err, proxies) => {
      if (!err && proxies) {
        resolve(proxies);
      } else {
        request(
          'https://raw.githubusercontent.com/a2u/free-proxy-list/master/free-proxy-list.txt',
          (error, response, body) => {
            if (!error && response.statusCode === 200) {
              proxies = body.trim().split(/\n/);

              cache.set('proxies', proxies, 60000, err => {
                if (!err) {
                  resolve({
                    list: proxies,
                    random: () => proxies[Math.floor(Math.random()*proxies.length)]
                  });
                }
              });
            }
          }
        );
      }
    });
  });
};
