import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import TopList from '../components/TopList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'toplist',
      path: '/toplist/:id',
      component: TopList
    }
  ]
})
