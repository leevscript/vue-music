import URLConsts from './URLConsts'

export default class Singer {

  constructor(singermid) {
    // 歌手id
    this.singermid = singermid
  }

  // 相似歌手
  simsinger(start = 0, num = 5) {
    let url = `${URLConsts.URL_SINGER_SIM}&singer_mid=${this.singermid}&start=${start}&num=${num}`
    return fetch(url)
  }

  // 歌曲
  songs(begin = 0, num = 30) {
    let url = `${URLConsts.URL_SINGER_SONGS}&singermid=${this.singermid}&begin=${begin}&num=${num}`
    return fetch(url)
  }

  // 专辑
  albums(begin = 0, num = 30) {
    let url = `${URLConsts.URL_SINGER_ALBUM}&singermid=${this.singermid}&begin=${begin}&num=${num}`
    return fetch(url)
  }

  /**
   * 歌手描述 tested
   * var doc = (new DOMParser()).parseFromString(content,'text/xml')
   * doc.querySelector('info').textContent
   */
  desc() {
    let r = new Date().getTime()
    let url = `${URLConsts.URL_SINGER_DESC}&singermid=${this.singermid}&r=${r}`
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'referer': 'https://c.y.qq.com/xhr_proxy_utf8.html'
      }
    })
  }
}
