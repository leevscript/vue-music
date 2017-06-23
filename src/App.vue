<template>
  <div id="app">
    <transition>

      <router-view></router-view>

    </transition>
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

  body {
    font: 12px/1.5 FZLTXIHJW--GB1-0, "hiragino sans gb", "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif;
  }

  #app {
    padding-bottom: 5rem;
  }


</style>
