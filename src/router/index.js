import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import SongList from '../components/SongList.vue'
import MV from '../components/MV.vue'
import Test from '../components/test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'toplist',
      path: '/toplist/:id',
      component: SongList
    },
    {
      name: 'cdlist',
      path: '/cd/:id',
      component: SongList
    },
    {
      name: 'mv',
      path: '/mv/:id',
      component: MV
    },
    {
      name: 'test',
      path: '/test',
      component: Test
    }
  ]
})
