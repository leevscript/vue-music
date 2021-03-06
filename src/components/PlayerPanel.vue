<template>
  <div class="player-panel">
    <actionsheet v-model="actionsheetShow" :menus="musicMenus" show-cancel></actionsheet>
    <transition name="filter">
      <div class="bg"
           :style="{'background': `url(${coverImgUrl}) no-repeat center / cover`}"></div>
    </transition>
    <div class="play-control">
      <div class="tool">
        <div class="back" @click.stop="back">
          <icon name="arrow-circle-o-down" scale="2"></icon>
        </div>
        <div class="pick-pink">
          <color-picker :colors="colors" v-model="color" size="small" class="color"></color-picker>
          <icon name="exchange" scale="2" class="exchange"></icon>
        </div>
      </div>
      <lyric class="lyric" :songid="song.id" :currentTime="currentTime"></lyric>
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
        <div class="operation">
          <div class="list-button" @click.stop="showMenus" v-if="isOne">
            <icon name="align-justify" scale="2"></icon>
          </div>
          <div class="mv-button" @click.stop="playMV(song.vid)" v-if="song.vid">
            <icon name="video-camera" scale="2"></icon>
          </div>
          <div class="love-button" @click.stop="">
            <icon name="heart-o" scale="2"></icon>
          </div>
        </div>
        <div class="button">
          <div class="backward-button" @click.stop="playFront" v-if="isOne">
            <icon name="backward" scale="2"></icon>
          </div>
          <div class="play-button" @click.stop="isPlay">
            <icon name="play-circle" scale="4" v-show="!playing"></icon>
            <icon name="pause-circle" scale="4" v-show="playing"></icon>
          </div>
          <div class="forward-button" @click.stop="playNext" v-if="isOne">
            <icon name="forward" scale="2"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState, mapGetters} from 'vuex'
  import {ColorPicker, Actionsheet} from 'vux'

  import Lyric from './Lyric.vue'

  export default {
    components: {
      ColorPicker,
      Lyric,
      Actionsheet
    },
    data() {
      return {
        alertShow: false,
        colors: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff'],
        color: '',
        actionsheetShow: false,
        musicMenus: []
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
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
      playMV(vid) {
        this.show = false
        this.$router.push({name: 'mv', params: {id: vid}})
      },
      ...mapMutations([
        'play', 'pause', 'playContinue', 'playFront', 'playNext'
      ])
    },
    watch: {
      playing(val) {
        val ? this.play() : this.pause()
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
        song: state => state.PlayService.song,
        playList: state => state.PlayService.playList
      }),
      progress() {
        if (!this.duration || !this.currentTime) return 0
        let ct = this.currentTime.split(':')
        let dt = this.duration.split(':')
        return parseInt(((parseInt(ct[0]) * 60 + parseInt(ct[1])) / (parseInt(dt[0]) * 60 + parseInt(dt[1]))) * 100)
      },
      isOne() {
        return this.playList.length > 1
      }
    },
    filters: {
      concatSinger(arr) {
        if (!arr) return ''
        return arr.map((v) => {
          return v.name
        }).join(' / ')
      }
    }
  }
</script>

<style lang="less" scoped>
  .player-panel {
    position: fixed;
    z-index: 2016;
    width: 100%;
    height: 100%;
    .bg {
      position: absolute;
      left: -50%;
      z-index: 1;
      width: 200%;
      height: 100%;
      filter: blur(10px)
    }
    .play-control {
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
        height: 18rem;
        background-color: rgba(0, 0, 0, 0.3);
        overflow: hidden;
        z-index: 2;
        flex: none;
        color: #C0CCDA;
        .progress {
          width: 100%;
          height: 2rem;
          display: flex;
          font-size: 0.8rem;
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
        .operation {
          height: 6rem;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
        }
        .button {
          height: 8rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .backward-button,
          .forward-button {
            height: 3rem;
          }
          .play-button {
            height: 5rem;
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
</style>
