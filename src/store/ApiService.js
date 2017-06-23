import Vue from 'vue'

import API from '../config/api'

function apiFactory(api) {
  return (id = null) => Vue.http.jsonp(
    api.url,
    {
      params: api.params(id),
      jsonp: api.jsonp
    }
  )
}

export default {
  actions: {
    getTopSongs({}, id){
      return apiFactory(API.rank_songs)(id)
    },
    getRankList({}){
      return apiFactory(API.rank_list)()
    },
    getAlbum({}, id){
      return apiFactory(API.album)(id)
    },
    getSingerInfo({}, id){
      return apiFactory(API.singer_info)(id)
    },
    getMvInfo({}, id){
      return apiFactory(API.mv_info)(id)
    },
    getMvKey({}, option){
      return apiFactory(API.mv_key)(option)
    },
    smartSearch({}, key){
      return apiFactory(API.smart_search)(key)
    },
    search({}, key){
      return apiFactory(API.search)(key)
    },
    getHotKey({}){
      return apiFactory(API.hotkey)()
    },
    getRecommands({}){
      return apiFactory(API.first_page_data)()
    },
    getCdSongs({}, id){
      return apiFactory(API.cd)(id)
    },
    getLyric({}, id){
      return Vue.http.jsonp('https://api.darlin.me/music/lyric/' + id + '/', {
        jsonp: 'callback'
      })
    }
  }
}
