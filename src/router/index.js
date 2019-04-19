import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage'
import UserTable from '@/components/UserTable'
import UserForm from '@/components/UserForm'
import MovieTable from '@/components/MovieTable'
import MovieForm from '@/components/MovieForm'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import APIStat from '@/components/APIStat'
import store from '@/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/testLogin',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/testRegister',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/index',
      name: 'MainPage',
      component: MainPage,
      beforeEnter: (to, from, next) => {
        console.log(store.getters.isLogin)
        if (store.getters.isLogin) {
          next()
        } else {
          confirm('你尚未登录，请先登录')
          next('/')
        }
      },
      children: [
        {
          path: '/',
          name: 'Users',
          component: UserTable
        },
        {
          path: '/index/addUser',
          name: 'AddUser',
          component: UserForm
        },
        {
          path: '/index/movies',
          name: 'Movies',
          component: MovieTable
        },
        {
          path: '/index/addmovie',
          name: 'AddMovie',
          component: MovieForm
        },
        {
          path: '/index/apistat',
          name: 'APIStat',
          component: APIStat
        }
      ]
    }
  ]
})
