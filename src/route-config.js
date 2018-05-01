import Vue from 'vue'
import Router from 'vue-router'
import About from './components/About.vue'
//import SignIn from './components/SignIn.vue'
import Types from './components/Types.vue'
import Dishes from './components/Dishes.vue'
import Orders from './components/Orders.vue'
import DataStatistics from './components/DataStatistics.vue'
import EmployeesManagement from './components/EmployeesManagement.vue'
import RestInfo from './components/RestInfo.vue'
import Create from './components/Create.vue'
import ElementUI from 'element-ui'
//import '../../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.use(Router)

export default {
	'types': {
		component: Types
	},

	'dishes': {
		component: Dishes,
		subRoutes: {
			'create': {
				component: Create
			}
		}
	},

	'orders': {
		component: Orders
	},

	'dataStatistics': {
		component: DataStatistics
	},

	'employeesManagement': {
		component: EmployeesManagement
	},

	'restInfo': {
		component: RestInfo
	},


}