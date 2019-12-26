import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import '@/styles/index.scss'
// import Vuex from 'vuex'

// Vue.use(Vuex)
Vue.use(VuejsDialog)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h: any) => h(App)
}).$mount('#app')
