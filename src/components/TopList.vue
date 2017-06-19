<template>
  <div class="top-list" :style="{'background-color': color}">
    <div class="album">
      <div class="bg" :style="{'background-image': `url(${picAlbum})`}"></div>
      <div class="gradient" :style="{'background-image': `linear-gradient(to bottom, transparent, ${color} 80%)`}"></div>
      <a href="javascript:;" class="back" @click="back">
        <icon name="arrow-circle-left" scale="2"></icon>
      </a>
      <div class="header">
        <div class="info">
          <div class="title">
            <p v-text="listName"></p>
          </div>
          <div class="date">
            <p v-text="updateTime+' 更新'"></p>
          </div>
        </div>
        <div class="switch"><icon name="play-circle" scale="3"></icon></div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in songlist">
        <div class="no">{{index + 1}}</div>
        <div class="info"  @click="play(index)">
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
        updateTime: '',
        songlist: [],
        color: 0,
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
    created() {
      this.$store
        .dispatch('getRankSongs', this.$route.params.id)
        .then((ret) => {
          let data = ret.data
          this.picAlbum = data.topinfo.pic_album
          this.listName = data.topinfo.ListName
          this.updateTime = data.update_time
          this.songlist = data.songlist.map((v) => {
            return {name: v.data.songname, singer: v.data.singer, id: v.data.songid, albummid: v.data.albummid}
          })
          this.color = $.colorTransform(data.color).hex
        })
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
          height: 5rem;
          width: 70%;
          margin-right:0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            font-size: 2rem;
            line-height: 3rem;
            overflow: hidden;
            p {
              white-space: nowrap;
              width: 1000px;
            }
          }
          .date {
            font-size: 1.2rem;
            line-height: 2rem;
          }
        }
        .switch {
          width: 20%;
          height: 4rem;
          line-height: 4rem;
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
