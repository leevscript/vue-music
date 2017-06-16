import Vue from 'vue'
import Router from 'vue-router'

import Search from '../components/Search'
import Home from '../components/Home.vue'
import Hot from '../components/Hot.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/hot',
      component: Hot
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
