<template>
  <div class="home">
    <div class="tab">
      <tab :line-width="1" active-color="#20A0FF" class="music-tab" v-model="index">
        <tab-item @on-item-click="tabClick" :key="index" v-for="(item,index) in TAB_NAME" v-text="item"></tab-item>
      </tab>
    </div>
    <div class="main" ref="main">
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide class="swiper-item" :style="{minHeight: minHeight}">
          <recommend></recommend>
        </swiper-slide>
        <swiper-slide class="swiper-item" :style="{minHeight: minHeight}">
          <hot></hot>
        </swiper-slide>
        <swiper-slide class="swiper-item" :style="{minHeight: minHeight}">
          <search></search>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import Hot from './Hot.vue'
  import Search from './Search.vue'
  import Recommend from './Recommend.vue'

  import {Tab, TabItem} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      Hot,
      Search,
      Recommend,
      Tab,
      TabItem,
      swiper,
      swiperSlide
    },
    data() {
      return {
        index: 0,
        TAB_NAME: ['推荐音乐', '热歌榜', '搜索'],
        minHeight: 0,
        swiperOption: {
          onTransitionEnd: (swiper) => {
            window.scrollTo(0, 0)
            this.index = swiper.activeIndex
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      }
    },
    methods: {
      tabClick(index) {
        this.swiper.slideTo(index)
      }
    },
    mounted() {

      this.minHeight = this.$refs.main.offsetHeight + 'px'
    }
  }
</script>

<style scoped lang="less">
  .home {
    height: 100%;
    width: 100%;
    padding-top: 44px;
    position: relative;
    .tab {
      position: fixed;
      width: 100%;
      height: 44px;
      left: 0;
      top: 0;
      background-color: #fff;
      z-index: 2;
      .music-tab a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .main {
      height: 100%;
      .swiper-slide {
        height: 0 !important;
      }
      .swiper-slide.swiper-slide-active {
        height: auto !important;
        min-height: 100% !important;
      }
    }
  }
</style>
