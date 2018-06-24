import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Restaurant/Index'
import SignIn from '../components/Restaurant/Index/SignIn'
import SignUp from '../components/Restaurant/Index/SignUp'
import HomePage from '../components/Restaurant/HomePage'
import Types from '../components/Restaurant/Dishes/Types'
import Dishes from '../components/Restaurant/Dishes/Dishes'
import NewDish from '../components/Restaurant/Dishes/NewDish'
import Orders from '../components/Restaurant/Orders/Orders'
import Statistics from '../components/Restaurant/Orders/Statistics'
import Desks from '../components/Restaurant/Profile/Desks'
import Profile from '../components/Restaurant/Profile/Profile'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Auth from '../services/auth'
// import HelloWorld from '../components/HelloWorld'

Vue.use(Router)
Vue.use(ElementUI)

var router = new Router({
  routes: [
      {
        path: '/',
        redirect: '/restaurant'
      },
      {
        path: '/restaurant',
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
        redirect: '/home/orders',
        component: HomePage,
        meta: {
            requiresAuth: true
        },
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
                path: 'desks',
                component: Desks
            },
            {
                path: 'profile',
                component: Profile
            },
            {
                path: 'newDish',
                component: NewDish
            }
        ]
      }
  ]
})

router.beforeEach((to, from, next) => {
    //一个路由匹配到的所有路由记录会暴露为 $route 对象
    //（还有在导航守卫中的路由对象）的 $route.matched 数组。
    //因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
        Auth.isSignined(function (res) {
            // 已登录
            next()
        }, function (err) {
            // 未登录
            next({
                path: '/restaurant/signin',
                query: { redirect: to.fullPath }
            })
        })
    } else {
      next() // 确保一定要调用 next()
    }
  })
export default router