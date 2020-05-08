const test = require('ava');
const ProxyList = require('.')
const rp = require('request-promise')

test('test', async t => {

  const pl = await ProxyList({ checker: true, timeout: 1000 });
  
	for (let i=0;i<3;i++) {
    const options = {
      uri: 'https://api.myip.com',
      proxy: `http://${pl.random()}`,
      json: true
    }
    
		t.is(typeof (await rp(options)), "object")
  }

})
