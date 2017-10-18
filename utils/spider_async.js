//const agent = require("superagent").agent()
const agent = require('superagent').agent()
const moment = require('moment')
const cheerio = require('cheerio')

async function start(u, p, y, s) {
  console.log('call')
  res = await agent
    .get('https://cas.sysu.edu.cn/cas/login')
    .query({service: "http://uems.sysu.edu.cn/elect/casLogin"})

    //console.log(res.header['set-cookie'][0].split(';')[0].split('=')[1])
  let jsessionid = res.header['set-cookie'][0].split(';')[0].split('=')[1]
  //console.log(res.text)
  let $ = cheerio.load(res.text)
  let test = $( "section[class='row btn-row']").find('input')
  let lt = test['0'].attribs['value']
  let execution = test['1'].attribs['value']
  console.log('fetch login data')
  return await login(jsessionid, lt, execution, u, p, y, s)
}

async function login (jsessionid, lt, exe, u, p, y, s) {
  let h = {
    Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.8",
    "Cache-Control":"max-age=0",
    Connection:"keep-alive",
    "Content-Type":"application/x-www-form-urlencoded",
    //Cookie:"JSESSIONID="+jsessionid,
    //Origin:"https://cas.sysu.edu.cn",
    //Referer:"https://cas.sysu.edu.cn/cas/login?service=http%3A%2F%2Fuems.sysu.edu.cn%2Felect%2FcasLogin",
    "Upgrade-Insecure-Requests":1,
    "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36"
  }

  let p_data = {
    username:u,
    password:p,
    lt:lt,
    execution: exe,
    _eventId:"submit",
    submit:"登录"
  }

  console.log('call login')

  res = await agent
    .post('https://cas.sysu.edu.cn/cas/login;jsessionid='+jsessionid)
    .query({service: "http://uems.sysu.edu.cn/elect/casLogin"})
    .set(h)
    .send(p_data)

    //console.log(res.text)
  res2 = await agent
    .get("http://uems.sysu.edu.cn/elect/casLogin")
    //.set({Cookie: "JSESSIONID="+jsessionid})

  let full_url = 'http://uems.sysu.edu.cn/'+res2.req.path

  if (res2.req.path.split('/')[1] !== 'elect') {
    return 'ERROR: Wrong username or password'
  } else {
    let sid = res2.req.path.split('=')[1]
    //setTimeout((sid, y, s)=> {return fetch_class(sid, y, s)}, 5000)
    return await fetch_class(sid, y, s)
  }
}

async function fetch_class(sid, year, semester) {
  let url = 'http://uems.sysu.edu.cn/elect/s/courseAll'
  let q = {
    sort:'',
    ord:'',
    sid:sid,
    xnd:year,
    xq:semester,
    pylb:'',
    kcmc:'',
    kclb:'',
    xkzt:'',
    sjdd:'',
    rkjs:''
  }
  res = await agent
    .get(url)
    .query(q)
  //console.log(res.text)
  let $ = cheerio.load(res.text)
  let dpack = []
  let test = $("tr", "table[class='grid']").each((i, ele) => {
    if (i !== 0) {
      //console.log('---------------')
      let oneclass = {}
      $(ele).find('td').each((i2, ele2) => {
        if (i2 === 8) {
          oneclass[i2] = ($(ele2).text().trim())
        } else {
          oneclass[i2] = $(ele2).text()
        }
      })
      dpack.push(oneclass)
    }
  })
  //console.log(dpack)
  return dpack
}

async function main () {
  let v = await start('xingjf3', '7endOrse$d', '2017-2018', '1')
  console.log(v)
}

main()
