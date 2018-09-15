import test from 'ava'
import ProxyList from '.'
import rp from 'request-promise'

test('test', async t => {

  const pl = await ProxyList();
    
  for (let i=0;i<3;i++) {
  
    const options = {
      uri: 'https://api.myip.com',
      proxy: `http://${pl.random()}`,
      json: true
    }
    
    t.is(typeof (await rp(options)), "object")

  }

})
