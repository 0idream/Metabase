/* --------------------- metabase+express+cors 实现可以跨域查询 metabase 的node.js服务器 --------------------- */

const express = require('express');
const cors = require('cors');
var pgp = require('pg-promise')(/* options */);
const { QueryFile } = require('pg-promise');
const bodyParser = require('body-parser')
var getMetabase = require('../metabase/index')
var config = require('../config/config.js')
const app = express();
app.use(cors());
app.use(express.json())
// app.use(bodyParser.json())//这里有个删除线，不影响使用，我可以忽略.如果上面的 exress.json() 不能用的话，就用这个

/* ---------------------------------- 全局参数 ---------------------------------- */
const port = process.env.port || 1111;//关于 process.env.port 的知识我还不清楚，但是教程建议这样设置
//sql 语句 
let sql = 'select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1';
//请求数据库
let database = 69;//代表数据库的id，需要打开 metabase 切换到对应的数据库，在 network 的请求参数中即可找到.
//metabase 用户名和密码
let username = "18200353856@163.com"
let password = "ass12345678"
/* ----------------------------------- 基于 metabase 构建的 api ---------------------------------- */
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
    console.log('成功了')
    res.send(a);//关于 send 与 end 的区别我还不了解，不过有的时候用 res.send 正确，但是用 res.end就错误。可能后者支持的数据格式比较少吧。
    // res.end(a)
  })
})

/* -------------------------- 基于 ng-Promise 构建的 api ------------------------- */
var dbString = 'postgres://postgres:arup.2020@10.209.7.3:5432/anthony'// 'pg-promise' 将要链接的数据库参数
var updateRawPolygonSqlPath = './sql/updateRawPolygonParameter.sql';//这里的文件路径可能要参考这里会更规范:https://vitaly-t.github.io/pg-promise/QueryFile.html
var updateHabitatSqlPath = './sql/updateHabitat.sql';//更新整个habitat
var updateProjectPolygonSqlPath = './sql/updateProjectPolygon.sql';//更新 project 下的的某个polygon
var db = pgp(dbString);
var updateRawPolygonQueryFile = new QueryFile(updateRawPolygonSqlPath, { minify: true });//更新最原始的训练数据；
var updateHabitatQueryFile = new QueryFile(updateHabitatSqlPath, { minify: true });
var updateProjectPolygonQueryFile = new QueryFile(updateProjectPolygonSqlPath, { minify: true });//更新project范围下的原始数据
app.post('/updatepolygon', function (req, res) {
  console.log(req.body)
  db.any(updateProjectPolygonQueryFile, [req.body.gid, JSON.stringify(req.body.geojson)]).then(a => {
    console.log('成功了')
    res.send(a);
  });
})

app.get('/getHabitat', function (req, res) {
  var result = [];
  db.any('select *,st_asgeojson(geog) as geojson from project_habitat').then(a => {

    a.forEach(element => {
      if (JSON.parse(element.geojson).coordinates.length > 0) {
        result.push(element)

      }
    });
    res.send(result)
  })
})

//update habitat
app.get('/updateHabitat', function (req, res) {
  db.any(updateHabitatQueryFile).then(a => {
    console.log('成功了')
    res.send(a);
  });
})

//get Important Species
app.post('/getImportantSpecies', function (req, res) {
  db.any('select b.*,st_asgeojson(b.geog) as geojson from project_habitat a, habitat_category_species_4326 b  where st_intersects(a.geog,b.geog) and a.gid=$1', [req.body.gid]).then(a => {
    console.log(req.body)
    console.log('成功了')
    res.send(a);
  });
})
/* ----------------------------- express 后端 log ----------------------------- */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


