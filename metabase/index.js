var axios = require('axios')
var config = require('../config/config.js')
let metabaseConnect = {};
/* ---------------------------------- 自定义参数 --------------------------------- */
//API 地址
console.log(config.sqlRequire)
//sql 语句 
// let sql = 'select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1';
let sql = 'select * from projectextent';

//请求数据库
let database = 69;//代表数据库的id，需要打开 metabase 切换到对应的数据库，在 network 的请求参数中即可找到.
//metabase 用户名和密码
let username = "18200353856@163.com"
let password = "ass12345678"

/* ---------------------------------- 方法 ---------------------------------- */

metabaseConnect.getResult =
  async function (username, password, database, sql) {
    let sessionToken = await axios({
      method: 'post',
      url: config.getSessionToken,//获取sessionToken
      data: {
        username: username,
        password: password
      },
    });

    let result = await axios({
      method: 'post',
      url: config.sqlRequire,//sql 查询
      data: {
        database: database,
        type: 'native',
        parameters: [],
        native: {
          "query": sql,
          "template-tags": {}
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Metabase-Session': sessionToken.data.id
      }
    });
    let outResult = {
      cols: result.data.data.cols,
      rows: result.data.data.rows
    }
    return outResult;
  }
//如下代码用于调试
// metabaseConnect.getResult(username, password, database, 'select * from sr_trained_4326 where gridcode=1').then(a => {
//   console.log(a)
// })
module.exports = metabaseConnect;
