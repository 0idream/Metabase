/* --------------------- 基于 listenbox 的 youtube 频道自动播客制作 -------------------- */

var axios = require('axios')
var config = require('../config/config.js')

/* ---------------------------------- 自定义参数 --------------------------------- */
var cookie = '_ga=GA1.2.1601165561.1609291924; __stripe_mid=0ddc294c-b128-491a-b415-e44969ed7f7109294c; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiOTA2Mzc3YmQtZDUwYy00NmQ4LWIwYWEtY2YyN2U0ZTIwYWJkIiwiZW1haWwiOiIxODIwMDM1Mzg1NkAxNjMuY29tIiwiaWF0IjoxNjEyNDEwNTk5LCJleHAiOjE2MTUwMDI1OTl9.PFuvsz6-XYS7pARDMO3n1IQhh86W7dLs_ws53IINREjVFnCQFfpMOV5blKDlFVWYoxKkKKovUj8MVh0mzftIFnmIIFAKbiIjxCpZ7hU4Uy0WKm2Yo0z42fVSCEy2a1ED61ubWXOWr_adApKopJSP_s00A_pIHQdtwN-HM3UBffrFoz_tKTsWchyPsoLcuX3UDnGU_HEbpC8-jQ0QejL_cS8yCzvdpm0Ijjao8A1FdtOr0mPV9Si7NeuC-q0sfuHf2qjuHzqOYCZ8QgG3f4N0L0UJ0u-j9KdlNnrJeVmI9_s37qOrV44ybbJ4vS-jUkKGsVIFncTW-749m5EgdKBcQA; _gid=GA1.2.2018445686.1614731788; __stripe_sid=ae045eea-01aa-4460-9510-60ce46fe91251a2df6';//此处后需要考虑如何自动获取
var youtubeUrl = 'https://www.youtube.com/playlist?list=PL5vUqWxKaXp8SLgdbfT0iTq-nSnqmqCIm';
/* ---------------------------------- 获取 feedId ---------------------------------- */
async function getFeedId(params) {
  let feedId = await axios({
    method: 'post',
    url: 'https://listenbox.app/japi/submit',
    data: {
      url: youtubeUrl
    },
    headers: {
      cookie: cookie
    }
  })
  return feedId
}

getFeedId().then(a => {
  console.log(a.data.showID.id)
})

/* ------------------------------- 获取 youtube Channel Rss Url------------------------------- */

var feed_id = 'Ak86rbM7wDNn'


async function getRssUrl() {
  let feedId = await getFeedId();
  let rssUrl = await axios({
    method: 'get',
    url: 'https://listenbox.app/_next/data/XIvL_zW2rBQCiDi_ieOza/i/' + feedId.data.showID.id + '.json',
    data: {
      feed_id: feedId.data.showID.id
    }
  })
  return rssUrl
}

getRssUrl().then(a => {
  console.log(a.data.pageProps.feed.audioFeedURL)
})

