<template>
  <div class="top-list" :style="{'background-color': color}">
    <div class="album">
      <div class="bg" :style="{'background-image': `url(${picAlbum})`}"></div>
      <div class="gradient"
           :style="{'background-image': `linear-gradient(to bottom, transparent, ${color} 80%)`}"></div>
      <a href="javascript:;" class="back" @click="back">
        <icon name="arrow-circle-left" scale="2"></icon>
      </a>
      <div class="header">
        <div class="info" ref="info">
          <div class="title" :style="{'transform': `translateX(-${titleScrollX}px)`}">
            <p v-text="listName" ref="title"></p>
            <p v-text="listName" v-if="showSecondTitle"></p>
          </div>
          <div class="date">
            <p v-text="sub"></p>
          </div>
        </div>
        <div class="switch">
          <icon name="play-circle" scale="3"></icon>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in songlist">
        <div class="no">{{index + 1}}</div>
        <div class="info" @click="play(index)">
          <h3 class="song-name">{{item.name}}</h3>
          <p class="singer-name">{{item.singer | concatSinger}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '../utils/$utils'

  export default {
    name: 'toplist',
    data() {
      return {
        picAlbum: '',
        listName: '',
        titleWidth: 0,
        titleScrollX: 0,
        sub: '',
        songlist: [],
        color: 0,
        showSecondTitle: false
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      play (index) {
        this.$store.commit('setPlayList', {
          index: index,
          list: this.songlist
        })
        this.$store.commit('play')
      },
      getTopSongs() {
        this.$store
          .dispatch('getTopSongs', this.$route.params.id)
          .then((ret) => {
            let data = ret.data
            this.picAlbum = data.topinfo.pic_album
            this.listName = data.topinfo.ListName
            this.sub = data.update_time + ' 更新'
            this.songlist = data.songlist.map((v) => {
              return {name: v.data.songname, singer: v.data.singer, id: v.data.songid, albummid: v.data.albummid}
            })
            this.color = $.colorTransform(data.color).hex
            setTimeout(this.startScroll, 1000)
          })
      },
      getCdSongs() {
        this.$store
          .dispatch('getCdSongs', this.$route.params.id)
          .then((ret) => {
            let data = ret.data.cdlist[0]
            let visitnum = data.visitnum
            visitnum = visitnum > 10000 ? (Math.round(visitnum / 1000)) / 10 + '万' : visitnum
            this.picAlbum = data.logo
            this.listName = data.dissname
            this.sub = visitnum + ' 次播放'
            this.songlist = data.songlist.map((v) => {
              return {name: v.name, singer: v.singer, id: v.id, albummid: v.album.mid}
            })
            this.color = '#000'
            setTimeout(this.startScroll, 1000)
          })
      },
      startScroll() {
        if (!(this.showSecondTitle = (this.$refs.info.offsetWidth < this.$refs.title.offsetWidth))) return
        this.titleWidth = this.$refs.title.offsetWidth + 100
        let _run = () => {
          this.titleScrollX += 1
          if (this.titleScrollX < this.titleWidth) {
            requestAnimationFrame(_run)
          }
          else {
            this.titleScrollX = 0
            setTimeout(() => {
              requestAnimationFrame(_run)
            }, 1000)
          }
        }
        _run()
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
    computed: {},
    created() {
      switch (this.$route.name) {
        case 'toplist':
          return this.getTopSongs()
        case 'cdlist':
          return this.getCdSongs()
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-list {
    position: relative;
    overflow: hidden;
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
        left: 15px;
        top: 15px;
        z-index: 2;
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
            width: 9999px;
            animation: title-scroll 9s linear 0s infinite running;
            p {
              white-space: nowrap;
              float: left;
              text-overflow: ellipsis;
              margin-right: 100px;
            }
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
          line-height: 60px;
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
        height: 60px;
        color: #fff;
        display: flex;
        .no {
          width: 30px;
          font-size: 1.5rem;
          line-height: 60px;
          flex: none;
          text-align: right;
          margin-right: 1.5rem;
        }
        .info {
          height: 60px;
          border-bottom: 1px solid rgba(255, 255, 255, .15);
          flex: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .song-name {
            font-size: 1.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .singer-name {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, .6);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
