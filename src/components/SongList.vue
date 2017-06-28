<template>
  <div class="top-list" :style="{'background-color': info.color}">
    <div class="album">
      <div class="bg" :style="{'background-image': `url(${info.picAlbum})`}"></div>
      <div class="gradient"
           :style="{'background-image': `linear-gradient(to bottom, transparent, ${info.color} 80%)`}"></div>
      <div class="back" @click.stop="back">
        <icon name="arrow-circle-left" scale="2"></icon>
      </div>
      <div class="header">
        <div class="info" ref="info">
          <scroll-txt class="title" :distance="100" :txt="info.listName"></scroll-txt>
          <div class="date">
            <p v-text="info.sub"></p>
          </div>
        </div>
        <div class="switch">
          <div @click="play()">
            <icon name="play-circle" scale="3"></icon>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in songlist" :class="{active: item.id === song.id}">
        <div class="no">{{index + 1}}</div>
        <div class="info" @click="play(index)">
          <h3 class="song-name ellipsis">{{item.name}}</h3>
          <p class="singer-name ellipsis">{{item.singer | concatSinger}}</p>
        </div>
        <div class="mv" v-if="item.vid"  @click.stop="playMV(item.vid)">
          <icon name="video-camera" scale="1"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScrollTxt from './ScrollTxt.vue'
  import {mapState} from 'vuex'

  import $ from '../utils/$utils'

  export default {
    name: 'toplist',
    components: {
      ScrollTxt
    },
    data() {
      return {
        info: {},
        songlist: []
      }
    },
    computed: {
      ...mapState({
        song: state => state.PlayService.song,
        playList: state => state.PlayService.playList
      }),
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      play (index = 0) {
        if (this.songlist === this.playList) {
          this.$store.commit('playIndex', index)
        } else {
          this.$store.commit('setPlayList', {
            index: index,
            list: this.songlist
          })
        }
        this.$store.commit('play')
      },
      getTopSongs() {
        this.$store
          .dispatch('getTopSongs', this.$route.params.id)
          .then(ret => {
            let data = ret.data
            this.info.picAlbum = data.topinfo.pic_album
            this.info.listName = data.topinfo.ListName
            this.info.sub = data.update_time + ' 更新'
            this.info.color = $.colorTransform(data.color).hex
            this.songlist = data.songlist.map((v) => {
              return {name: v.data.songname, singer: v.data.singer, id: v.data.songid, albummid: v.data.albummid, vid: v.data.vid}
            })
          })
      },
      getCdSongs() {
        this.$store
          .dispatch('getCdSongs', this.$route.params.id)
          .then(ret => {
            let data = ret.data.cdlist[0]
            let visitnum = data.visitnum
            visitnum = visitnum > 10000 ? (Math.round(visitnum / 1000)) / 10 + '万' : visitnum
            this.info.picAlbum = data.logo
            this.info.listName = data.dissname
            this.info.sub = visitnum + ' 次播放'
            this.info.color = '#000'
            this.songlist = data.songlist.map((v) => {
              return {name: v.name, singer: v.singer, id: v.id, albummid: v.album.mid, vid: v.mv.vid}
            })
          })
      },
      getAlbumlSongs() {
        this.$store
          .dispatch('getAlbum', this.$route.params.id)
          .then(ret=>{
            let data = ret.data.data
            this.info.picAlbum = `https://y.gtimg.cn/music/photo_new/T002R500x500M000${data.mid}.jpg`
            this.info.listName = data.name
            this.info.sub = `${data.singername} ${data.aDate} ${data.genre}`
            this.info.color = $.colorTransform(data.color).hex
            this.songlist = data.list.map((v) => {
              return {name: v.songname, singer: v.singer, id: v.songid, albummid: v.albummid,vid: v.vid}
            })
          })
      },
      getSingerSongs() {
        this.$store
          .dispatch('getSingerInfo', this.$route.params.id)
          .then(ret=>{
            let data = ret.data.data
            this.info.picAlbum = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.singer_mid}.jpg`
            this.info.listName = data.singer_name
            this.info.sub = `粉丝 ${data.fans}人`
            this.info.color = $.colorTransform(data.color).hex
            this.songlist = data.list.map((v) => {
              return {name: v.musicData.songname, singer: v.musicData.singer, id: v.musicData.songid, albummid: v.musicData.albummid,vid: v.vid.Fvid}
            })
          })
      },
      playMV(vid) {
        this.$router.push({name: 'mv', params: {id: vid}})
      }
    },
    filters: {
      concatSinger(arr) {
        if (!arr) return ''
        return arr.map((v) => {
          return v.name
        }).join(' / ')
      }
    },
    beforeRouteEnter(to, from, next) {
      window.scrollTo(0, 0)
      next(vm => {
        switch (to.params.type) {
          case 'toplist':
            return vm.getTopSongs()
          case 'cdlist':
            return vm.getCdSongs()
          case 'albumlist':
            return vm.getAlbumlSongs()
          case 'singerlist':
            return vm.getSingerSongs()
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .top-list {
    position: relative;
    overflow: hidden;
    padding-bottom: 60px;
    .album {
      position: relative;
      .bg {
        background-repeat: no-repeat;
        background-position: top center;
        background-size: cover;
        width: 100%;
        z-index: 1;
      }
      .gradient {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 70%;
      }
      .back {
        position: fixed;
        color: rgba(255, 255, 255, 0.75);
        left: 1rem;
        top: 1rem;
        z-index: 5;
      }
      .header {
        position: absolute;
        color: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 20px 15px;
        display: flex;
        justify-content: space-around;
        z-index: 3;
        .info {
          height: 60px;
          flex: auto;
          margin-right: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          .title {
            font-size: 24px;
          }
          .date {
            font-size: 16px;
          }
        }
        .switch {
          flex: none;
          margin-left: 10px;
          width: 4rem;
          height: 60px;
        }
      }
    }
    .bg::after {
      content: "";
      display: block;
      padding-top: 100%;
    }
    .list {
      .item {
        width: 100%;
        height: 5rem;
        color: #fff;
        display: flex;
        align-items: center;
        position: relative;
        .no {
          width: 30px;
          font-size: 1.5rem;
          flex: none;
          text-align: right;
          margin-right: 1.5rem;
        }
        .info {
          height: 5rem;
          padding-right: 5rem;
          border-bottom: 1px solid rgba(255, 255, 255, .15);
          flex: auto;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .song-name {
            font-size: 1.5rem;
          }
          .singer-name {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, .6);
          }
        }
        .mv {
          position: absolute;
          right: 2rem;
        }
      }
      .item.active {
        color: #58B7FF;
        .singer-name {
          color: #58B7FF;
        }
      }
    }
  }
</style>
