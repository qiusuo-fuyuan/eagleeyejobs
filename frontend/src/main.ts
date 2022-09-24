import Vue from 'vue'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
