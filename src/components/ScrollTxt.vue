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
        txtWidth: 0,
        containerWidth: 0,
        showSecondTitle: false,
        maxWidth: 0
      }
    },
    methods: {
      run() {
        this.scrollX += 1
        if (this.scrollX < this.maxWidth) {
          requestAnimationFrame(this.run)
        }
        else {
          this.scrollX = 0
          this.timeEvent = setTimeout(() => {
            requestAnimationFrame(this.run)
          }, 1000)
        }
      }
    },
    watch: {
      txt(val) {
        if (val) {
          this.timeEvent = setTimeout(()=>{
            this.txtWidth = this.$refs.txt.offsetWidth
            this.containerWidth = this.$refs.container.offsetWidth
            this.maxWidth = this.txtWidth + this.distance
            if(this.showSecondTitle = (this.containerWidth < this.maxWidth)) this.run()
          }, 1000)
        }
      }
    },
    beforeDestroy() {
      if (this.timeEvent) clearTimeout(this.timeEvent)
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
