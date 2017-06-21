<template>
  <div class="play-control" :class="{active: show}">
    <audio ref="music"
           :src="dataUrl"
           @timeupdate="updateTime"
           @ended="playContinue"
           autoplay>
    </audio>
    <actionsheet v-model="actionsheetShow" :menus="musicMenus" show-cancel></actionsheet>
    <div v-transfer-dom>
      <alert v-model="alertShow" title="播放列表为空" content="请添加音乐到列表"></alert>
    </div>
    <transition name="filter">
      <div class="bg"
           v-show="show"
           :style="{'background': `url(${coverImgUrl}) no-repeat center / cover`}"></div>
    </transition>

    <div class="player-panel" v-show="show">
      <div class="tool">
        <div class="back" @click="showPlayer(false)">
          <icon name="arrow-circle-o-down" scale="2"></icon>
        </div>
        <div class="pick-pink">
          <color-picker :colors="colors" v-model="color" size="small" class="color"></color-picker>
          <icon name="exchange" scale="2" class="exchange"></icon>
        </div>

      </div>
      <Lyric class="lyric" :songid="song.id" :currentTime="currentTime"></Lyric>
      <div class="control">
        <div class="progress">
          <div class="current-time">
            {{currentTime}}
          </div>
          <div class="progress-wrap">
            <div class="progress-content" :style="{'width': `${progress}%`}"></div>
          </div>
          <div class="total-time">
            {{duration}}
          </div>
        </div>
        <div class="button">
          <div class="play-button" @click.stop="isPlay">
            <icon name="play-circle" scale="4" v-show="!playing"></icon>
            <icon name="pause-circle" scale="4" v-show="playing"></icon>
          </div>
        </div>
        <!--<div class="manger">
          <div class="menus" @click="showMenus">
            <icon name="bars" scale="3"></icon>
          </div>
        </div>-->
      </div>
    </div>

    <div class="player-bar" @click="showPlayer(true)" v-show="!show">
      <div class="wrap">
        <div class="cover-img">
          <img v-lazy="coverImgUrl">
        </div>
        <div class="music-info">
          <p class="music-name">{{song.name}}</p>
          <p class="music-singer">{{song.singer | concatSinger}}</p>
        </div>
        <div class="play-button" @click.stop="isPlay">
          <icon name="play-circle-o" scale="3" v-show="!playing"></icon>
          <icon name="pause-circle-o" scale="3" v-show="playing"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState, mapGetters} from 'vuex'
  import {Alert, ColorPicker, Actionsheet, TransferDomDirective as TransferDom} from 'vux'

  import Lyric from './Lyric.vue'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Alert,
      ColorPicker,
      Lyric,
      Actionsheet
    },
    data() {
      return {
        show: false,
        alertShow: false,
        colors: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff'],
        color: '',
        actionsheetShow: false,
        musicMenus: []
      }
    },
    methods: {
      showPlayer(flag) {
        if (flag) {
          window.addEventListener('touchmove', preDef)
        } else {
          window.removeEventListener('touchmove', preDef)
        }
        this.show = flag
      },
      isPlay() {
        if (!this.song.id) {
          return this.alertShow = true
        }
        this.playing ? this.pause() : this.play()
      },
      updateTime() {
        this.$store.commit('updateCurrentTime', parseInt(this.$refs.music.currentTime))
        this.$store.commit('updateDuration', parseInt(this.$refs.music.duration))
      },
      showMenus() {
        this.actionsheetShow = true
      },
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ])
    },
    watch: {
      playing(val) {
        setTimeout(() => {
          val ? this.$refs.music.play() : this.$refs.music.pause()
        }, 0)
      }
    },
    computed: {
      ...mapGetters([
        'coverImgUrl', 'currentTime', 'duration'
      ]),
      ...mapState({
        dataUrl (state) {
          if (!state.PlayService.song.id) return ''
          return 'http://ws.stream.qqmusic.qq.com/' + state.PlayService.song.id + '.m4a?fromtag=46'
        },
        playing: state => state.PlayService.playing,
        song: state => state.PlayService.song
      }),
      progress() {
        if (!this.duration || !this.currentTime) return 0
        let ct = this.currentTime.split(':')
        let dt = this.duration.split(':')
        return parseInt(((parseInt(ct[0]) * 60 + parseInt(ct[1])) / (parseInt(dt[0]) * 60 + parseInt(dt[1]))) * 100)
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
    mounted() {
      console.log(this.$store.state)
    }
  }
  function preDef(e) {
    e.preventDefault()
  }
</script>

<style lang="less" scoped>
  .play-control {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1994;
    height: 60px;
    transition: height .3s;
    background-color: #fff;
    .bg {
      position: absolute;
      left: -50%;
      z-index: 1;
      width: 200%;
      height: 100%;
      filter: blur(10px)
    }
    .player-bar {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 5rem;
      background-image: linear-gradient(to right, #EFF2F7, #1F2D3D);
      overflow: hidden;
      z-index: 2;
      .wrap {
        position: absolute;
        width: 100%;
        height: 5rem;
        top: 50%;
        transform: translateY(-50%);
        .cover-img {
          width: 4rem;
          height: 4rem;
          overflow: hidden;
          margin: 0.5rem 0 0 1rem;
          float: left;
        }
        .music-info {
          float: left;
          margin-left: 1rem;
          .music-name {
            line-height: 3rem;
            font-size: 1.3rem;
          }
          .music-singer {
            line-height: 1rem;
          }
        }
        .play-button {
          float: right;
          line-height: 4rem;
          margin-right: 1rem;
          margin-top: 0.5rem;
          color: #58B7FF;
        }
      }
    }
    .player-panel {
      position: absolute;
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 233;
      .tool {
        position: relative;
        height: 6rem;
        margin-bottom: 1rem;
        z-index: 2;
        .back {
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #E5E9F2;
        }
        .pick-pink {
          position: absolute;
          right: 1rem;
          top: 1rem;
          .color {
            float: left;
            margin-top: 8px;
            margin-right: 5px;
          }
          .exchange {
            float: left;
            color: #E5E9F2;
          }
        }
      }
      .lyric {
        position: relative;
        width: 100%;
        z-index: 2;
        overflow: hidden;
        flex: auto;
      }
      .control {
        position: relative;
        margin-top: 1rem;
        height: 30rem;
        background-color: rgba(0, 0, 0, 0.3);
        overflow: hidden;
        z-index: 2;
        .progress {
          width: 100%;
          height: 22px;
          display: flex;
          font-size: 0.8rem;
          color: #C0CCDA;
          line-height: 22px;
          .current-time {
            width: 4rem;
            text-align: right;
            padding-right: 1rem;
          }
          .total-time {
            width: 4rem;
            text-align: left;
            padding-left: 1rem;
          }
          .progress-wrap {
            flex: auto;
            height: 2px;
            position: relative;
            background-color: #C0CCDA;
            margin-top: 10px;
            .progress-content {
              height: 2px;
              position: absolute;
              width: 0;
              background-color: #13CE66;
            }
          }
        }
        .button {
          height: 10rem;
          color: #fff;
          .play-button {
            line-height: 10rem;
            text-align: center;
          }
        }
      }
    }

    .filter-enter-active {
      transition: 1s .3s;
    }
    .filter-leave-active {
      transition: 1s 0s;
    }
    .filter-enter, .filter-leave-active {
      filter: blur(0px)
    }
  }

  .play-control.active {
    height: 100%;
  }
</style>
