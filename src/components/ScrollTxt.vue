<template>
  <div class="scroll-txt-container" ref="container">
    <div class="scroll-txt-wrap" :style="{'transform': `translateX(-${scrollX}px)`}">
      <p class="scroll-txt-content" :style="{'margin-right': `${distance}px`}" v-text="txt" ref="txt"></p>
      <p class="scroll-txt-content" v-text="txt" v-if="showSecondTitle"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      txt: {
        type: String,
        default: ''
      },
      distance: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        scrollX: 0,
        timeEvent: null,
        animationFrame: null,
        txtWidth: 0,
        containerWidth: 0,
        showSecondTitle: false,
        maxWidth: 0
      }
    },
    methods: {
      run() {
        this.scrollX += 1
        if (this.scrollX >= this.maxWidth) {
          this.scrollX = 0
          this.stopAnimation()
          return this.timeEvent = setTimeout(this.run, 1000)
        }
        this.animationFrame = requestAnimationFrame(this.run)
      },
      stopAnimation() {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame)
      },
      stopTimeEvent() {
        if (this.timeEvent) clearTimeout(this.timeEvent)
      }
    },
    watch: {
      txt(val) {
        if (val) {
          this.stopTimeEvent()
          this.stopAnimation()
          this.timeEvent = setTimeout(() => {
            this.txtWidth = this.$refs.txt.offsetWidth
            this.containerWidth = this.$refs.container.offsetWidth
            this.maxWidth = this.txtWidth + this.distance
            if (this.showSecondTitle = (this.containerWidth < this.maxWidth)) this.run()
          }, 1000)
        }
      }
    },
    beforeDestroy() {
      this.stopAnimation()
      this.stopTimeEvent()
    }
  }
</script>

<style lang="less">
  .scroll-txt-container {
    width: 100%;
    overflow: hidden;
    .scroll-txt-wrap {
      width: 9999px;
      .scroll-txt-content {
        white-space: nowrap;
        float: left;
        text-overflow: ellipsis;
      }
    }
  }

</style>
