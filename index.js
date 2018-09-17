const request = require('request');
const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = (opts = { checker: false, timeout: 5e3 }) => {

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

              if (!opts.checker) {

                cache.set('proxies', proxies, 3600, err => {
                  if (!err) {
                    resolve({
                      list: proxies,
                      random: () => proxies[Math.floor(Math.random()*proxies.length)]
                    });
                  }
                });

              } else {

                const checkers = []

                proxies
                .map(
                  ip => {

                    checkers
                    .push(
                      new Promise((_resolve) => {

                        request({
                          method: "GET",
                          url: 'http://httpbin.org/get',
                          proxy: `http://${ip}`,
                          timeout: opts.timeout
                        }, (err, response, body) => {

                          if (!err) {
                            _resolve(ip)
                          } else {
                            _resolve()
                          }

                        })

                      })
                    )

                  }
                )

                Promise
                .all(checkers)
                .then(proxies => {

                  proxies = proxies.filter(ip => ip)

                  cache.set('proxies', proxies, 3600, err => {
                    if (!err) {
                      resolve({
                        list: proxies,
                        random: () => proxies[Math.floor(Math.random()*proxies.length)]
                      });
                    }
                  });

                })

              }

            }
          }
        );
      }
    });
  });
};
