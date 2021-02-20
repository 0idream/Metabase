var axios = require('axios')
var config = require('../config/config.js')

/* ---------------------------- 测试metabase的api请求 ---------------------------- */


console.log(config.default.api)
async function metabasePost(params) {
  let result = await axios({
    method: 'post',
    url: config.default.api,
    data: {
      database: 69,
      type: 'native',
      parameters: [],
      native: {
        "query": "select st_asgeojson(sr_trained_4326.geog) as geojson from sr_trained_4326 where gid=1",
        "template-tags": {}
      }
    }
  });
  console.log(result)
}

metabasePost()