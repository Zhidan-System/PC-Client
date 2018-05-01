import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routeConfig from './route-config.js'
import Types from './components/Types.vue'
import Dishes from './components/Dishes.vue'
import Orders from './components/Orders.vue'
import DataStatistics from './components/DataStatistics.vue'
import EmployeesManagement from './components/EmployeesManagement.vue'
import RestInfo from './components/RestInfo.vue'
import Create from './components/Create.vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import HomePage from './components/HomePage.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
{
	path: '/homepage',
	component: HomePage
},

{
	path: '*',
	redirect: '/homepage'
},

{ 
	path: '/types', 
	component: Types 
},

{ 
	path: '/dishes',
	component: Dishes,

	children: [
	{

    // 当 /user/:id/profile 匹配成功，
    // UserProfile 会被渲染在 User 的 <router-view> 中
    path: '/create',
    component: Create
}
]

},

{ 
	path: '/orders', 
	component: Orders 
},

{ 
	path: '/dataStatistics', 
	component: DataStatistics 
},

{ 
	path: '/employeesManagement', 
	component: EmployeesManagement 
},

{ 
	path: '/restInfo', 
	component: RestInfo 
}

]

const router = new VueRouter({
	routes
});

const app = new Vue({
	router,
	el: '#app',
	render: h => h(App)
})

