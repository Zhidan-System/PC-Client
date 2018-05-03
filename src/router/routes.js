import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Restaurant/Index'
import SignIn from '../components/Restaurant/Index/SignIn'
import SignUp from '../components/Restaurant/Index/SignUp'
import HomePage from '../components/Restaurant/HomePage'
import Types from '../components/Restaurant/Dishes/Types'
import Dishes from '../components/Restaurant/Dishes/Dishes'
import Orders from '../components/Restaurant/Orders/Orders'
import Statistics from '../components/Restaurant/Orders/Statistics'
import Employees from '../components/Restaurant/Profile/Employees'
import Profile from '../components/Restaurant/Profile/Profile'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import HelloWorld from '../components/HelloWorld'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
      {
        path: '/',
        redirect: '/account'
      },
      {
        path: '/account',
        component: Index,
        children: [
            {
                path: 'signin', 
                component: SignIn
            },
            {
                path: 'signup',
                component: SignUp
            }
        ]
      },
      {
        path: '/home',
        component: HomePage,
        children: [
            {
                path: 'types',
                component: Types
            },
            {
                path: 'dishes',
                component: Dishes
            },
            {
                path: 'orders',
                component: Orders
            },
            {
                path: 'statistics',
                component: Statistics
            },
            {
                path: 'employees',
                component: Employees
            },
            {
                path: 'profile',
                component: Profile
            }
        ]
      }
  ]
})