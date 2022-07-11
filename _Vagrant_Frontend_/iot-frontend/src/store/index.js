import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		//apiURL: `http://${window.location.hostname}:${process.env.VUE_APP_API_PORT}/api/`
		// Aquí va la IP del Backend
		apiURL: `http://192.168.0.193:${process.env.VUE_APP_API_PORT}/api/`
	}
});