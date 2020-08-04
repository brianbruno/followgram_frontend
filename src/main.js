import Vue from 'vue'
import router from './router'

import BootstrapVue from "bootstrap-vue"
import VueAnalytics from "vue-analytics";

import VueElementLoading from 'vue-element-loading'

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

Vue.config.productionTip = false;

Vue.component('VueElementLoading', VueElementLoading)

Vue.use(BootstrapVue);
Vue.use(VueAnalytics, {
    id: 'UA-157898643-1',
    router
});

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
