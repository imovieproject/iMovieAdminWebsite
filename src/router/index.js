import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/pages/MainPage'
import UserTable from '@/components/UserTable'
import UserForm from '@/components/UserForm'

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
        }
      ]
    }
  ]
})
