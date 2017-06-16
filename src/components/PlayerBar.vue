<template>
  <div class="play-control">
    <audio ref="music"
           :src="dataUrl"
           @timeupdate="updateTime"
           @ended="playContinue"
           autoplay>
    </audio>
    <transition name="filter">
      <div class="bg"
           v-show="show"
           :style="{'background': `url(${coverImgUrl}) no-repeat center / cover`}"></div>
    </transition>
    <div class="player-bar" @click="showPlayer(true)" v-show="!show">
      <div v-transfer-dom>
        <alert v-model="alertShow" title="播放列表为空" content="请添加音乐到列表"></alert>
      </div>
      <div class="wrap">
        <div class="cover-img">
          <img v-lazy="coverImgUrl">
        </div>
        <div class="music-info">
          <p class="music-name">{{song.name}}</p>
          <p class="music-singer">{{song.singer | concatSinger}}</p>
        </div>
        <div class="play-button" @click.stop="isPlay">
          <img src="../assets/icon-play.png" v-show="!playing">
          <img src="../assets/icon-pause.png" v-show="playing">
        </div>
      </div>
    </div>
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
      <div class="progress">
        <div class="wrap">
          <div class="cover-img">
            <img v-lazy="coverImgUrl">
          </div>
          <div class="music-info">
            <p class="music-name">{{song.name}}</p>
            <p class="music-singer">{{song.singer | concatSinger}}</p>
          </div>
          <div class="play-button" @click.stop="isPlay">
            <img src="../assets/icon-play.png" v-show="!playing">
            <img src="../assets/icon-pause.png" v-show="playing">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState, mapGetters} from 'vuex'
  import {Alert, ColorPicker, TransferDomDirective as TransferDom} from 'vux'

  import Lyric from './XLyric.vue'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Alert,
      ColorPicker,
      Lyric
    },
    data() {
      return {
        show: false,
        alertShow: false,
        colors: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff'],
        color: ''
      }
    },
    methods: {
      showPlayer(flag) {
        if (flag) {
          window.addEventListener('touchmove', preDef)
        } else {
          window.removeEventListener('touchmove', preDef)
        }
        this.$emit('showPlayer', flag)
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
        'coverImgUrl', 'currentTime'
      ]),
      ...mapState({
        dataUrl (state) {
          if (!state.PlayService.song.id) return ''
          return 'http://ws.stream.qqmusic.qq.com/' + state.PlayService.song.id + '.m4a?fromtag=46'
        },
        playing: state => state.PlayService.playing,
        song: state => state.PlayService.song
      })
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

    }
  }
  function preDef(e) {
    e.preventDefault()
  }
</script>

<style lang="less" scoped>
  .play-control {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .bg {
      position: absolute;
      left: -50%;
      z-index: -1;
      width: 200%;
      height: 100%;
      filter: blur(15px)
    }
    .player-bar {
      position: relative;
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
          width: 3rem;
          margin: 1rem 1rem 0 0;
        }
      }
    }
    .player-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      .tool {
        position: relative;
        height: 5rem;
        margin-bottom: 1rem;
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
      .progress {
        position: relative;
        margin-top: 1rem;
        height: 30rem;
        background-color: rgba(0, 0, 0, 0.5);
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
            width: 3rem;
            margin: 1rem 1rem 0 0;
          }
        }
      }
    }

    .filter-enter-active {
      transition: 1s .3s;
    }
    .filter-leave-active {
      transition: none;
    }
    .filter-enter, .filter-leave-active {
      filter: blur(0px)
    }
  }
</style>
