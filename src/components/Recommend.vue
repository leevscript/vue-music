<template>
  <div class="recommend" ref="recommend">
    <swiper :options="swiperOptionIn" class="swiper-position">
      <swiper-slide v-for="(item,index) in imgList" :key="index">
        <img :src="item">
      </swiper-slide>
    </swiper>
    <div class="recommend-list">
      <div class="title">
        推荐歌单
      </div>
      <div class="hotdiss">
        <router-link :to="{name:'cdlist',params: {id: item.dissid }}" class="item"
             v-for="(item,index) in hotdiss"
             :key="index">
          <img v-lazy="item.imgurl" class="musicImg">
          <p class="dissname" v-text="item.dissname"></p>
          <div class="listennum">
            <img src="../assets/icon-erji.svg" width="12"><span>{{item.listennum | formatNum}}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="title">
        最新音乐
      </div>
      <div class="shoubomv">
        <div class="item" v-for="item in shoubomv">
          <img v-lazy="item.picurl">
          <div class="details">
            <p class="name" v-text="item.mvtitle"></p>
            <p class="singer" v-text="item.singer_name"></p>
            <p class="date" v-text="item.pub_date"></p>
            <p class="singer">{{item.listennum | formatNum}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        hotdiss: [],
        shoubomv: [],
        imgList: [],
        swiperOptionIn: {
          autoplay: 3000,
          lazyLoading: true,
          autoplayDisableOnInteraction: false
        }
      }
    },
    filters: {
      formatNum(val) {
        return val > 10000 ? (Math.round(val / 1000)) / 10 + '万' : val
      }
    },
    created() {
      this.$store.dispatch('getRecommands').then((ret) => {
        ret = ret.data.data
        console.log(ret)
        this.imgList = ret.focus.map(v => v.pic)
        this.hotdiss = ret.hotdiss.list.slice(0, 6).map(v => {
          let {imgurl, dissname, listennum, dissid} = v
          return {imgurl, dissname, listennum, dissid}
        })
        this.shoubomv = ret.shoubomv.all

      })
    }
  }
</script>

<style lang="less" scoped>
  .recommend {
    .recommend-list {
      .title {
        border-left: 3px solid #58B7FF;
        margin: 0.8rem 0;
        font-size: 1.3rem;
        padding-left: 0.8rem;
      }
      .hotdiss {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 32%;
          position: relative;
          .musicImg {
            width: 100%;
            display: block;
          }
          .dissname {
            padding: 2px;
            margin-bottom: 5px;
          }
          .listennum {
            position: absolute;
            right: 5px;
            top: 5px;
            color: #fff;
            font-size: 13px;
            padding-left: 13px;
            img {
              position: absolute;
              left: 0;
              top: 3px;
            }
          }
        }
      }
    }
    .new-list {
      .title {
        border-left: 3px solid #58B7FF;
        margin: 1rem 0;
        font-size: 1.3rem;
        padding-left: 0.8rem;
      }
      .shoubomv {
        padding: 0px 10px;
        .item {
          width: 100%;
          position: relative;
          border-bottom: 1px solid #EFF2F7;
          padding: 5px;
          overflow: hidden;
          img {
            width: 30%;
            display: block;
            float: left;
          }
          .details {
            width: 65%;
            float: right;
          }
        }
      }
    }
  }

</style>
