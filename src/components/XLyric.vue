<template>
  <div class="wrap"
       @touchstart.prevent="touchstart"
       @touchmove.prevent="touchmove"
       @touchend.prevent="touchend"
       ref="wrap">
    <div class="music-lyric"
         :style="{'transition': `-webkit-transform ${duration}ms ease-out`,
                  'transform-origin': '0px 0px 0px',
                  'transform': `translate3d(0px, ${top}px, 0px) scale(1)`}"
         ref="lyric">
      <p class="lyric-item"
         v-for="(v,k) in lyric"
         :class="{active: k === currentKey}">
        {{v}}
      </p>
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
        duration: 0,
        start: 0,
        end: 0,
        startTime: 0,
        maxHeight: 0
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
            this.end = this.top = 0
          })
      },
      currentindex(val) {
        val = val < 2 ? 2 : val
        this.duration = 300
        this.end = this.top = -(val - 2) * 50
      }
    },
    methods: {
      touchstart(e) {
        this.duration = 0
        this.startTime = (new Date()).getTime()
        this.start = e.changedTouches[0].pageY
        this.maxHeight = this.$refs.lyric.offsetHeight - this.$refs.wrap.offsetHeight
      },
      touchmove(e) {
        let distance = e.changedTouches[0].pageY - this.start
        let top = this.end + distance
        if (top > 100) top = 100
        if (top < -this.maxHeight - 100) top = -this.maxHeight - 100
        this.top = top
      },
      touchend(e) {
        let end = e.changedTouches[0].pageY
        let endTime = (new Date()).getTime()
        let distance = end - this.start
        let difference = endTime - this.startTime
        difference = difference > 1000 ? 1000 : difference
        let ratio = distance / (difference * 5)
        this.end = this.end + ratio * this.maxHeight
        this.duration = (Math.abs(parseInt(ratio * this.maxHeight)))
        if (this.end > 0) this.end = 0
        if (this.end < -this.maxHeight) this.end = -this.maxHeight
        this.top = this.end
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
      overflow: hidden;
      .lyric-item {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 1.3rem;
        font-weight: 500;
        color: #D3DCE6;
        overflow: hidden;
      }
      .lyric-item.active {
        color: #13CE66;
      }
    }
  }

</style>
