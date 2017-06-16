import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.use(VueResource)
Vue.use(VueLazyload, {
    error: require('./assets/loading.svg'),
    loading: require('./assets/loading.svg'),
    attempt: 1
  }
)

Vue.config.productionTip = false
/* eslint-disable no-new */

/*router.beforeEach((to, from, next) => {
 setTimeout(() => {
 next()
 }, 250)
 })*/

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
