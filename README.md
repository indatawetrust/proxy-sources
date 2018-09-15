[![Travis Build
Status](https://img.shields.io/travis/indatawetrust/proxy-list.svg)](https://travis-ci.org/indatawetrust/proxy-list)

proxy list resource: https://github.com/a2u/free-proxy-list

# proxy-list
Free proxy servers list

#### install
```
npm i -S proxy-list
```

#### usage
```js
const ProxyList = require('proxy-list')
const rp = require('request-promise')

;(async () => {

  const pl = await ProxyList();
  
  console.log(pl.list)

  /*
  [ '125.141.200.14:80',
  '125.141.200.36:80',
  '125.141.200.15:80',
  '125.141.200.7:80',
  '125.141.200.38:80',
  '191.252.185.161:8090',
  '5.196.224.39:8080',
  '5.135.164.72:3128' ] 
  */
  
  // request usage
  const options = {
    uri: 'https://api.myip.com',
    proxy: `http://${pl.random()}`,
    json: true
  }
  
  console.log(await rp(options))
  
  // sample
  // {"ip":"212.93.119.116","country":"Latvia","cc":"LV"}

})()
```
