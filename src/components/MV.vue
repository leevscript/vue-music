<template>
  <div class="mv">
    <div class="title">
      <div class="back" @click="back">
        <icon name="arrow-circle-o-left" scale="2"></icon>
      </div>
      <scroll-txt class="mvname" :txt="info.mvname"></scroll-txt>
    </div>
    <div class="video">
      <video :src="vaidesrc"
             controls="controls"
             width="100%"
             @play="play">
      </video>
    </div>
    <div class="bg" :style="{backgroundImage: `url(${info.picurl}`}"></div>
    <div class="info">
      <div class="description">
        <p v-text="info.desc"></p>
      </div>
      <div class="listennum">
        <p v-text="`播放： ${info.listennum} 次`"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import ScrollTxt from './ScrollTxt.vue'
  export default {
    components: {
      ScrollTxt
    },
    data() {
      return {
        vaidesrc: '',
        playing: false,
        info: {}
      }
    },
    methods: {
      play() {
        this.$store.commit('pause')
      },
      back() {
        this.$router.go(-1)
      },
      createGUID(num) {
        num = num || 32
        let guid = ''
        for (let i = 1; num >= i; i++) {
          var tmp = Math.floor(16 * Math.random()).toString(16);
          guid += tmp
        }
        return guid
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        let id = to.params.id
        let guid = vm.createGUID()
        vm.$store
          .dispatch('getMvInfo', id)
          .then(ret => {
            let data = ret.data.data
            vm.info.mvname = data.mvname
            vm.info.picurl = data.picurl
            vm.info.singer = data.singers
            vm.info.desc = data.desc || '该MV没有描述信息'
            vm.info.listennum = data.listennum
          })
          .then(() => {
            vm.$store
              .dispatch('getMVKey', {
                id: id,
                guid: guid
              })
              .then(ret => {
                let key = ret.data.vl.vi[0]
                vm.vaidesrc = `${key.ul.ui[0].url}/${key.fn}?vkey=${key.fvkey}&br=60&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=${guid}`
              })
          })
      })
    },
    beforeRouteLeave(to, from, next) {
      next()
    }
  }
</script>

<style lang="less" scoped>
  .mv {
    color: #F9FAFC;
    background-color: rgba(0, 0, 0, 0.25);
    height: 100%;
    padding-bottom: 60px;
    .title {
      background-color: #000;
      height: 5rem;
      position: relative;
      padding-left: 4rem;
      .back {
        position: absolute;
        width: 3rem;
        height: 3rem;
        left: 1rem;
        top: 1rem;
      }
      .mvname {
        font-size: 1.6rem;
        line-height: 5rem;
      }
    }
    .bg {
      position: absolute;
      filter: blur(20px);
      z-index: -100;
      width: 100%;
      background-size: cover;
      padding-bottom: 56.25%;
    }
    .info {
      padding: 2rem;
      height: 20rem;
      position: relative;
      .description {
        font-size: 1.2rem;
        line-height: 2rem;
        letter-spacing: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        text-indent: 2rem;
      }
      .listennum {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
      }
    }
  }
</style>
