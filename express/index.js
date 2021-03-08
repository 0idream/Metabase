/* --------------------- metabase+express+cors 实现可以跨域查询 metabase 的node.js服务器 --------------------- */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
var getMetabase = require('../metabase/index')
var config = require('../config/config.js')
const app = express();
app.use(cors());
app.use(bodyParser.json())//这里有个删除线，不影响使用，我可以忽略

/* ---------------------------------- 全局参数 ---------------------------------- */
const port = 1111;
//sql 语句 
let sql = 'select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1';
//请求数据库
let database = 69;//代表数据库的id，需要打开 metabase 切换到对应的数据库，在 network 的请求参数中即可找到.
//metabase 用户名和密码
let username = "18200353856@163.com"
let password = "ass12345678"

/* ----------------------------------- api ---------------------------------- */
//使用默认的sql查询语句，进行get请求
app.get('/', (req, res) => {
  getMetabase.getResult(username, password, database, sql).then(a => {
    console.log('成功')
    res.end(a)
  })
})
//前端定义sql 查询语句，post请求
app.post('/', function (req, res) {
  console.log(req.body)
  getMetabase.getResult(username, password, database, req.body.sql).then(a => {  //req.body.sql 为前端传入的 sql 语句
    console.log('成功')
    res.send(a);//关于 send 与 end 的区别我还不了解，不过有的时候用 res.send 正确，但是用 res.end就错误。可能后者支持的数据格式比较少吧。
    // res.end(a)
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
