export default {
  rank_songs: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    params: (id) => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: id,
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  rank_list: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    params: () => {
      return {
        format: 'jsonp',
        g_tk: 5381,
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  album: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
    params: (id) => {
      return {
        albummid: id,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  },
  singer_info: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    params: (id) => {
      return {
        order: 'listen',
        begin: 0,
        num: 8,
        singermid: id,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5page',
        needNewCode: 1,
        from: 'h5',
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  mv_info: {
    url: 'https://c.y.qq.com//mv/fcgi-bin/fcg_getmvinfo.fcg',
    params: (id) => {
      return {
        vid: id,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        format: 'jsonp',
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  mv_key: {
    url: 'https://bkh5vv.video.qq.com/getinfo',
    params: (option) => {
      return {
        platform: 11001,
        charge: 0,
        otype: 'json',
        ehost: 'https://y.qq.com',
        sphls: 0,
        sb: 1,
        nocache: 0,
        guid: option.guid,
        appVer: 'V2.0Build9397',
        vids: option.id,
        defaultfmt: 'auto',
        sdtfrom: 'v3010'
      }
    },
    jsonp: 'callback'
  },
  smart_search: {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
    params: (key) => {
      return {
        is_xml: 0,
        format: 'jsonp',
        key: key,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        perpage: 20
      }
    },
    jsonp: 'jsonpCallback'
  },
  search: {
    url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
    params: (key) => {
      return {
        qqmusic_ver: 1298,
        format: 'jsonp',
        w: key,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        ct: 24,
        new_json: 1,
        t: 0,
        aggr: 1,
        cr: 1,
        catZhida: 1,
        lossless: 0,
        flag_qc: 0,
        remoteplace: 'txt.yqq.center',
        p: 1,
        n: 20
      }
    },
    jsonp: 'jsonpCallback'
  },
  hotkey: {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    params: () => {
      return {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  },
  home_page_data: {
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    params: () => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  lyric: {
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
    params: (id) => {
      return {
        nobase64: 1,
        musicid: id,
        songtype: 0
      }
    },
    jsonp: 'callback'
  },
  cd: {
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    params: (id) => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        new_format: 1,
        pic: 500,
        disstid: id,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        nosign: 1,
        _: new Date().getTime()
      }
    },
    jsonp: 'jsonpCallback'
  },
  first_page_data: {
    url: "https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg",
    params(){
      return {
        format: 'jsonp',
        tpl: 'v12',
        page: 'other',
        rnd: 0,
        g_tk: new Date().getTime(),
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'GB2312',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'jsonpCallback'
  }
}

