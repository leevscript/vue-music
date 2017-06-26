<template>
  <div id="app">
    <router-view></router-view>
    <player-bar></player-bar>
  </div>
</template>

<script>
  import PlayerBar from './components/PlayerBar.vue'

  export default {
    name: 'app',
    components: {
      PlayerBar
    },
    data() {
      return {
        controlShow: false,
        minHeight: 0
      }
    },
    computed: {},
    methods: {},
    created() {
      this.minHeight = window.screen.availHeight + 'px'
    }
  }
</script>

<style>
  @import "reset.css";

  html, body, #app {
    height: 100%;
  }

  body {
    overflow: hidden;
    padding-bottom: 60px;
    font: 12px/1.5 FZLTXIHJW--GB1-0, "hiragino sans gb", "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif;
  }

  #app {
    overflow: auto;
  }

</style>
