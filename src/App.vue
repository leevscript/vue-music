<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
    <div class="control" :class="{active: controlShow}">
      <PlayControl @showPlayer="showPlayer"></PlayControl>
    </div>
  </div>
</template>

<script>
  import PlayControl from './components/PlayControl.vue'

  export default {
    name: 'app',
    components: {
      PlayControl
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

  #app {
    overflow: hidden;
    padding-bottom: 5rem;
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
