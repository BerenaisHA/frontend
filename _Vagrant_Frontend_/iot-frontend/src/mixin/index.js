import Vue from 'vue';
import qs from 'qs';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);

export default Vue.mixin({
	data() {
		return {
			load: null
		}
	},
	methods: {
		showSuccessMessage(message) {
			Swal.fire({
				icon: 'success',
				title: '',
				html: message
			});
		},
		showWarningMessage(message) {
			Swal.fire({
				icon: 'warning',
				title: '',
				html: message
			});
		},
		showErrorMessage(message) {
			Swal.fire({
				icon: 'error',
				title: '',
				html: message
			});
		},
		sendRequest: async function (url, data = {}, method = "GET", files = false) {
			const response = {
				message: null,
				data: [],
				success: true
			};

			const requestConfig = {
				method,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			};

			if (window.localStorage.token) {
				requestConfig.headers['Authorization'] = `Bearer ${window.localStorage.token}`;
			}

			if (Object.keys(data).length || data instanceof FormData) {
				if (files) {
					requestConfig.body = data;
				} else {
					requestConfig.headers['Content-Type'] = 'application/json';
					if (method == 'GET') {
						url += `?${qs.stringify(data)}`;
					} else {
						requestConfig.body = JSON.stringify(data);
					}
				}
			}

			try {
				const request = await fetch(url, requestConfig);
				let jsonResponse = {};
				if (request.status != 204) {
					jsonResponse = await request.json();
				}

				if (!request.ok) {
					response.success = false;
					if (request.status == 500) {
						response.type = 'error';
						response.message = 'Error en la aplicación.';
					}

					if ([401, 400].includes(request.status)) {
						response.type = 'warning';
						response.message = jsonResponse.message;
					}

					if (request.status == 404) {
						response.type = 'warning';
						response.message = jsonResponse.message || 'Ruta inválida';
					}

					if (request.status == 422) {
						response.type = 'warning';
						var messageUl = document.createElement("ul");
						Object.keys(jsonResponse.errors).forEach(fields => {
							var messageLi = document.createElement("li");
							var messageText = document.createTextNode(jsonResponse.errors[fields][0]);
							messageLi.appendChild(messageText);
							messageUl.appendChild(messageLi);
						});
						response.message = messageUl.outerHTML;
					}

					throw response;
				} else {

					if (jsonResponse.data) response.data = jsonResponse.data;
					if (jsonResponse.message) response.message = jsonResponse.message;

					return response;
				}
			} catch (err) {
				response.success = false;
				const { type, message } = err;

				if (type) {
					Swal.fire({
						icon: type,
						title: '',
						html: message
					});
				} else {
					console.error(err);
					Swal.fire({
						icon: 'error',
						title: '',
						html: 'Error en la aplicación'
					});
				}
				return response;
			}
		},
		openLoader() {
			this.load = this.$loading.show({
				color: "white"
			});
		},
		closeLoader() {
			this.load.hide();
		},
		getUser() {
			return JSON.parse(window.localStorage.user);
		}
	}
});