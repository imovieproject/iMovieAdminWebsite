import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/pages/MainPage'
import UserTable from '@/components/UserTable'
import UserForm from '@/components/UserForm'
import MovieTable from '@/components/MovieTable'
import MovieForm from '@/components/MovieForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/index/users',
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
        }
      ]
    }
  ]
})
