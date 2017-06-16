<template>
  <div>
    <swiper :list="imgList" loop auto :aspect-ratio="432/1080" dots-class="custom-bottom"
            dots-position="center"></swiper>
  </div>
</template>

<script>
  import {Swiper} from 'vux'
  import loading from '../assets/loading.jpg'

  export default {
    data() {
      return {
        imgList: [
          {img: loading}
        ]
      }
    },
    components: {
      Swiper
    },
    created() {
      this.$store.dispatch('getRecommands').then((ret) => {
        ret = ret.data.data
        this.imgList = ret.focus.map(v => ({img: v.pic}))
      })
    }
  }
</script>

<style>


</style>
