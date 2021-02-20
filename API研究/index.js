var axios = require('axios')
var config = require('../config/config.js')

/* ---------------------------- 测试metabase的api请求 ---------------------------- */


console.log(config.default.testGet)

axios({
  method: 'get',
  url: config.default.testGet,
  data: {
    database: 69,
    type: 'native',
    parameters: [],
    native: {
      "query": "select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1",
      "template-tags": {}
    }
  },
  headers: {
    'Content-Type': 'application/json',
    'Cookie': '_ga=GA1.1.423776059.1603684443; metabase.SESSION=3cc72cf3-a18b-491b-b8ce-7886e3292473'
  }
}).then(a => {
  console.log(a)
});




// async function metabasePost(params) {
//   let result = await axios({
//     method: 'post',
//     url: config.default.sqlRequire,
//     data: {
//       database: 69,
//       type: 'native',
//       parameters: [],
//       native: {
//         "query": "select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1",
//         "template-tags": {}
//       }
//     },
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Metabase-Session': '3cc72cf3-a18b-491b-b8ce-7886e3292473'
//     }
//   });
//   console.log(result)
// }

// metabasePost()