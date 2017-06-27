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
            <icon name="headphones" scale="1"></icon>
            <span>{{item.listennum | formatNum}}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="new-list">
      <div class="title">
        最新MV
      </div>
      <div class="shoubomv">
        <router-link :to="{name: 'mv',params: {id: item.vid}}" class="item"
                     v-for="(item,index) in shoubomv"
                     :key="index">
          <img v-lazy="item.picurl">
          <div class="details">
            <p class="ellipsis name" v-text="item.mvtitle"></p>
            <p class="ellipsis singer" v-text="item.singer_name"></p>
            <p class="ellipsis date" v-text="item.pub_date"></p>
            <p class="ellipsis singer">播放 {{item.listennum | formatNum}} 次</p>
          </div>
        </router-link>
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
          autoplayDisableOnInteraction: false,
          loop: true
        }
      }
    },
    filters: {
      formatNum(val) {
        return val > 10000 ? (Math.round(val / 1000)) / 10 + '万' : val
      }
    },
    created() {
      this.$store.dispatch('getRecommands').then(ret => {
        ret = ret.data.data
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
            left: 5px;
            top: 5px;
            color: #fff;
            font-size: 12px;
            padding-left: 16px;
            .fa-icon {
              position: absolute;
              left: 0;
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
          display: -webkit-box;
          height: 8rem;
          border-bottom: 1px solid #EFF2F7;
          img {
            height: 6rem;
          }
          .details {
            -webkit-box-flex: 1;
            padding-left: 1rem;
            color: #8492A6;
            .name {
              font-size: 1.2rem;
              font-weight: 600;
              color: #1F2D3D;
            }
          }
        }
      }
    }
  }

</style>
