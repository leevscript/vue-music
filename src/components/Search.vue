<template>
  <div class="search">
    <search
      placeholder="搜索歌曲\歌手\专辑"
      v-model.trim="value"
      :autoFixed="false"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <div class="hot-key" v-show="!searching">
      <h3 class="title">热门搜索</h3>
      <div class="content">
        <div class="item" v-for="item in hotKey" @click="hotClick(item.k)">
          <span v-text="item.k"></span>
        </div>
      </div>
    </div>
    <div class="results" v-show="searching">
      <div class="zhida item" v-if="zhida" @click="goZhida">
        <div class="result-icon">
          <img :src="zhida.img">
        </div>
        <div class="result-info">
          <p class="title ellipsis" v-text="zhida.title"></p>
          <p class="sub ellipsis" v-text="zhida.sub"></p>
        </div>
      </div>
      <div class="item" v-for="(item,index) in results" :key="index" @click="playMusic(item)">
        <div class="result-icon">
          <icon name="music" scale="2"></icon>
        </div>
        <div class="result-info">
          <p class="title ellipsis" v-text="item.name"></p>
          <p class="sub ellipsis" v-text="concatName(item.singer)"></p>
        </div>
        <div class="result-mv" v-if="item.vid" @click.stop="playMV(item.vid)">
          <icon name="video-camera" scale="1"></icon>
        </div>
      </div>
    </div>
    <div class="history-key" v-show="historyShow">
      <div class="item" v-for="(item,index) in historyKey" :key="index" @click="onSubmit(item)">
        <icon class="clock" name="clock-o" scale="2"></icon>
        <span class="key" v-text="item"></span>
        <span class="close" @click.stop="clearHistory(index)">
          <icon name="close"></icon>
        </span>
      </div>
      <div class="clear">
        <span @click="clearHistory">清除搜索记录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {Search} from 'vux'

  export default {
    components: {
      Search
    },
    data () {
      return {
        zhida: null,
        results: [],
        hotKey: [],
        value: '',
        searching: false,
        historyKey: [],
      }
    },
    computed: {
      historyShow() {
        return this.searching && this.historyKey.length > 0 && !this.value && this.results.length === 0
      },
    },
    methods: {
      onSubmit(val) {
        this.$refs.search.setBlur()
        if (!val) return
        if (this.historyKey.indexOf(val) === -1) {
          if (this.historyKey.length > 6) this.historyKey.splice(0, 1)
          this.historyKey.push(val)
          window.localStorage.historyKey = JSON.stringify(this.historyKey)
        }
        this.$store
          .dispatch('search', val)
          .then((ret) => {
            let data = ret.data.data
            let zhida = data.zhida
            if (zhida.type === 1) {
              zhida = zhida.zhida_singer
              this.zhida = {
                title: zhida.singerName,
                sub: `单曲：${zhida.songNum} 专辑：${zhida.albumNum}`,
                img: zhida.singerPic,
                url: {name: 'songlist', params: {id: zhida.singerMID, type: 'singerlist'}}
              }
            } else if (zhida.type === 2) {
              zhida = zhida.zhida_album
              this.zhida = {
                title: zhida.albumName,
                sub: zhida.singerName,
                img: zhida.albumPic,
                url: {name: 'songlist', params: {id: zhida.albumMID, type: 'albumlist'}}
              }
            }
            this.results = data.song.list.map(v => {
              return {name: v.name, singer: v.singer, id: v.id, albummid: v.album.mid, vid: v.mv.vid}
            })
          })
      },
      playMusic (song) {
        this.$store.commit('setPlayList', {
          index: 0,
          list: [song]
        })
        this.$store.commit('play')
      },
      onFocus () {
        this.searching = true
      },
      hotClick(val) {
        this.value = val
        this.searching = true
        this.onSubmit(val)
      },
      onCancel () {
        this.searching = false
        this.results = []
      },
      clearHistory(index) {
        this.$refs.search.setBlur()
        if (typeof index === 'number') {
          this.historyKey.splice(index, 1)
          window.localStorage.historyKey = JSON.stringify(this.historyKey)
        } else {
          this.historyKey = []
          window.localStorage.historyKey = ''
        }
      },
      concatName(arr) {
        return (arr.map(function (v) {
          return v.name
        })).join('、')
      },
      goZhida() {
        this.$router.push(this.zhida.url)
      },
      playMV(vid) {
        this.show = false
        this.$router.push({name: 'mv', params: {id: vid}})
      }
    },
    created() {
      this.$store
        .dispatch('getHotKey')
        .then((ret) => {
          this.hotKey = ret.data.data.hotkey.slice(0, 10)
        })
      if (window.localStorage.historyKey) {
        this.historyKey = JSON.parse(window.localStorage.historyKey)
      }
    }
  }
</script>

<style lang="less" scoped>
  .search {
    .hot-key {
      padding: 1rem;
      .title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #475669;
      }
      .content {
        .item {
          display: inline-block;
          padding: 0 10px;
          height: 2.5rem;
          line-height: 2.5rem;
          border: 1px solid #58B7FF;
          border-radius: 2.5rem;
          font-size: 1.2rem;
          color: #58B7FF;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
    }
    .results {
      .item {
        width: 100%;
        height: 4rem;
        border-top: 1px solid #D3DCE6;
        padding-left: 1rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
        padding-right: 5rem;
        .result-icon {
          flex: none;
          color: #99A9BF;
          width: 3rem;
          height: 3rem;
          img, svg {
            height: 3rem;
          }
        }
        .result-info {
          margin-left: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            font-size: 1.3rem;
          }
          .sub {
            font-size: 0.9rem;
            color: #888;
          }
        }
        .result-mv {
          position: absolute;
          right: 2rem;
        }
      }
    }
    .history-key {
      .item {
        height: 4rem;
        line-height: 4rem;
        border-top: 1px solid #D3DCE6;
        padding-left: 1rem;
        .fa-icon {
          height: 4rem;
          line-height: 4rem;
          float: left;
          color: #99A9BF;
        }
        .clock {
          float: left;
        }
        .close {
          float: right;
          margin-right: 1rem;
        }
        .key {
          float: left;
          font-size: 1.2rem;
          margin-left: 3rem;
        }
      }
      .clear {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        font-size: 1.1rem;
        color: green;
      }
    }
  }
</style>
