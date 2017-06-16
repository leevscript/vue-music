<template>
  <div class="wrap"
       @touchstart="touchstart"
       @touchmove="touchmove"
       @touchend="touchend"
       ref="wrap">
    <div class="music-lyric" :style="{'top': top + 'px'}" ref="lyric" :class="{'transition': !touching}">
      <p class="lyric-item" v-for="(v,k) in lyric" :class="{active: k === currentKey}">{{v}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Base64 from '../utils/base64'
  export default {
    props: ['currentTime', 'songid'],
    data () {
      return {
        lyric: {},
        keys: [],
        top: 0,
        start: 0,
        end: 0,
        touching: false
      }
    },
    computed: {
      currentKey() {
        if (this.keys.length === 0) return 0
        return this.keys.find((key) => {
          return (key.split(':').reduce((a, b) => parseInt(a) * 60 * 100 + b.split('.').reduce((a, b) => parseInt(a) * 100 + parseInt(b))) + 120 > this.currentTimeStamp)
        })
      },
      currentindex() {
        return this.keys.indexOf(this.currentKey)
      },
      currentTimeStamp() {
        let t = this.currentTime.split(':')
        return (parseInt(t[0]) * 60 + parseInt(t[1])) * 100
      }
    },
    watch: {
      songid(id) {
        let lyr = {}
        this.$store.dispatch('getLyric', id)
          .then((responce) => {
            Base64
              .decode(responce.data.lyric)
              .split('[')
              .slice(5)
              .forEach(str => {
                let t = str.split(']')
                if (/./.test(t[1])) lyr[t[0]] = t[1]
              })
            this.lyric = lyr
            this.keys = Object.keys(lyr)
            this.touching = false
            this.top = 0
          })
      },
      currentindex(val) {
        val = val < 2 ? 2 : val
        this.top = -(val - 2) * 60
      }
    },
    methods: {
      touchstart(e) {
        e.preventDefault()
        this.touching = true
        this.start = e.changedTouches[0].pageY
      },
      touchmove(e) {
        e.preventDefault()
        let distance = e.changedTouches[0].pageY - this.start
        this.top = this.end + distance
      },
      touchend(e) {
        e.preventDefault()
        let maxHeight = -this.$refs.lyric.offsetHeight + this.$refs.wrap.offsetHeight
        if (this.top > 0) this.top = 0
        if (this.top < maxHeight) this.top = maxHeight
        this.end = this.top
        this.touching = false

      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less">
  .wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    .music-lyric {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .lyric-item {
        text-align: center;
        font-size: 1.3rem;
        font-weight: 500;
        color: #D3DCE6;
        line-height: 60px;
        height: 60px;
        overflow: hidden;
      }
      .lyric-item.active {
        color: #13CE66;
      }
    }
    .music-lyric.transition {
      transition: top 0.5s;
    }
  }

</style>
