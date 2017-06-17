<template>
  <div class="top-list" :style="{'background-color': color}">
    <div class="album" :style="{'background-image': `url(${topinfo.pic_album})`}">
      <div class="header">
        <div class="title"></div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in songlist">
        <div class="no">{{index+1}}</div>
        <div class="info">
          <h3 class="song-name">{{item.songname}}</h3>
          <p class="singer-name">{{item.singer|concatSinger}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '../utils/$utils'

  export default {
    data() {
      return {
        songlist: {},
        topinfo: {},
        color: 0
      }
    },
    filters: {
      concatSinger(arr) {
        if (!arr) return ''
        return arr.map((v) => {
          return v.name
        }).join('、')
      }
    },
    created() {
      this.$store
        .dispatch('getRankSongs', this.$route.params.id)
        .then((ret) => {
          let data = ret.data
          this.topinfo = data.topinfo
          this.songlist = data.songlist.map((v) => {
              return {
                songname: v.data.songname,
                singer: v.data.singer
              }
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
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
      .header {
        position: absolute;
      }
    }
    .album::after {
      content: "";
      display: block;
      padding-top: 100%;
    }
    .list {
      .item {
        height: 60px;
        color: #fff;
        margin-left: 20px;
        display: flex;
        .no {
          width: 30px;
          margin-right: 10px;
          font-size: 18px;
          line-height: 40px;
        }
        .info {
          height: 60px;
          border-bottom: 1px solid #fff;
          flex: auto;
          .song-name {
            height: 30px;
            font-size: 18px;
            line-height: 40px;
            font-weight: 400;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis
          }
          .singer-name {
            height: 20px;
            line-height: 20px;
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
