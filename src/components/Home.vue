<template>
  <div class="home">
    <div class="tab">
      <tab :line-width="1" active-color="#20A0FF" class="music-tab" v-model="index">
        <tab-item @on-item-click="tabClick" :key="index" v-for="(item,index) in TAB_NAME" v-text="item"></tab-item>
      </tab>
    </div>
    <div class="main">
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide class="swiper-item">
          <keep-alive>
            <recommend></recommend>
          </keep-alive>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <keep-alive>
            <hot></hot>
          </keep-alive>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <keep-alive>
            <search></search>
          </keep-alive>
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
    name: 'home',
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
        swiperOption: {
          onTransitionEnd: (swiper) => {
            document.getElementById('app').scrollTop = 0
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
      this.minHeight = window.screen.availHeight - 104 + 'px'
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
      width: 100%;
      height: 100%;
      .swiper-slide {
        height: 0 !important;
      }
      .swiper-container {
        min-height: 100%;
        background-color: #EFF2F7;
        padding-bottom: 60px;
      }
      .swiper-slide.swiper-slide-active {
        height: auto !important;
      }
    }
  }
</style>
