<template>
  <div>
    <div v-for="(item,index) in topList" class="card" :key="index">
      <router-link :to="{name:'songlist',params: { id: item.id, type:'toplist' }}" class="card-item">
        <img :src="item.picUrl">
        <div class="info">
          <p class="title" v-text="item.topTitle"></p>
          <div class="song-list">
            <p v-for="(song,index) in item.songList" class="song-item">
              <span v-text="index + 1" class="song-index"></span>
              <span v-text="song.songname"></span> -
              <span v-text="song.singername" class="singername"></span>
            </p>
          </div>
        </div>
        <div class="more">
          <x-icon type="ios-arrow-right" size="16"></x-icon>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>


  export default {
    components: {

    },
    data() {
      return {
        topList: []
      }
    },
    created() {
      this.$store.dispatch('getRankList').then((response) => {
        this.topList = response.data.data.topList
      })
    }
  }
</script>

<style lang="less" scoped>
  .card {
    margin: 10px;
  }

  .card-item {
    background-color: #fff;
    display: flex;
    img {
      width: 7.5rem;
      height: 7.5rem;
    }
    .info {
      flex: auto;
      float: left;
      margin-left: 1rem;
      .title {
        font-size: 1.25rem;
        line-height: 2.5rem;
        font-weight: 700;
      }
      .song-list {
        font-size: 1rem;
        .song-item {
          height: 1.5rem;
          line-height: 1.5rem;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          word-break: break-all;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          .song-index {
            color: gray;
            margin-right: 2px;
          }
          .singername {
            color: gray;
            overflow: hidden;
          }
        }
      }
    }
    .more {
      margin-right: 5px;
      width: 1rem;
      height: 7.5rem;
      line-height: 7.5rem;
      color: gray;
    }
  }
</style>
