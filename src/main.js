import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/routes'
Vue.use(ElementUI)
Vue.use(VueRouter)


const app = new Vue({
	router,
	el: '#app',
	render: h => h(App)
})

