import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login';
import Master from '@/components/Layouts/Master'
import Devices from '@/components/Devices/Index';
import Users from '@/components/Users/Index';
import Chart from '@/components/Devices/Chart';

Vue.use(VueRouter)

const routes = [
	{
		path: '/login', component: Login, beforeEnter: (to, from, next) => {
			if (window.localStorage.token) {
				next('/');
			}
			next();
		},
	},
	{
		path: '/', component: Master,
		beforeEnter: (to, from, next) => {
			if (!window.localStorage.token) {
				next('/login');
			}
			next();
		},
		children: [
			{ path: '/usuarios', component: Users },
			{ path: '/dispositivos', component: Devices }
		]
	},
	{
		path: '/dispositivos/:key', component: Chart
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
