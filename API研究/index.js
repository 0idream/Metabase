var axios = require('axios')
var config = require('../config/config.js')

/* ---------------------------- 测试metabase的api请求 ---------------------------- */
//## post 请求函数
async function metabasePost(database, sql) {
  let result = await axios({
    method: 'post',
    url: config.default.sqlRequire,
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
      'X-Metabase-Session': '3cc72cf3-a18b-491b-b8ce-7886e3292473'
    }
  });
  console.log(result.data.data.rows[0][0])
}


//##请求 API 
console.log(config.default.sqlRequire)
//## sql 语句 
let sql = 'select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1';
//##请求数据库
let database = 69;//代表数据库的id，需要打开 metabase 切换到对应的数据库，在 network 的请求参数中即可找到

metabasePost(database, sql)