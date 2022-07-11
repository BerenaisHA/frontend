import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import mixin from './mixin'

Vue.config.productionTip = false

new Vue({
	vuetify,
	store,
	router,
	mixin,
	render: h => h(App)
}).$mount('#app')
