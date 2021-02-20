let baseUrl = 'http://localhost:3000'

let urlConfig = {
  sqlRequire: baseUrl + '/api/dataset',
  getSessionToken: baseUrl + '/api/session',
  testGet: baseUrl + '/api/collection/99/items'
}
module.exports.default = urlConfig;