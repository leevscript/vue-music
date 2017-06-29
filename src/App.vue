<template>
  <div id="app">
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
    <player-bar></player-bar>
  </div>
</template>

<script>
  import PlayerBar from './components/PlayerBar.vue'

  export default {
    name: 'app',
    components: {
      PlayerBar
    }
  }
</script>

<style>
  @import "reset.css";
  #app {
    padding-bottom: 60px;
  }
  /*隐藏文字*/
  .ellipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
