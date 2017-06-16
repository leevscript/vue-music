<template>
  <div id="app">
    <transition>
      <router-view v-show="!controlShow" class="view"></router-view>
    </transition>
    <div class="control" :class="{active: controlShow}">
      <player-bar @showPlayer="showPlayer"></player-bar>
    </div>
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
      }
    },
    computed: {},
    methods: {
      showPlayer(flag) {
        this.controlShow = flag
      }
    },
    mounted() {

    }
  }
</script>

<style>
  @import "reset.css";

  html,body {
    height: 100%;
  }

  #app {
    height: 100%;
  }

 .control {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1994;
    height: 5rem;
    transition: height .3s;
  }

  .control.active {
    height: 100%;
  }


</style>
