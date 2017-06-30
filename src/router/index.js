import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import SongList from '../components/SongList.vue'
import MV from '../components/MV.vue'
import Player from '../components/playerPanel.vue'
import Test from '../components/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'songlist',
      path: '/songlist/:type/:id',
      component: SongList
    },
    {
      name: 'mv',
      path: '/mv/:id',
      component: MV
    },
    {
      name: 'player',
      path: '/player',
      component: Player
    },
    {
      name: 'test',
      path: '/test',
      component: Test
    }
  ]
})
