import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NoteEdit from '@/components/NoteEdit'
import HelloWorldElement from '@/components/HelloWorldElement'
import NoteSelect from '@/components/NoteSelect'
// import indexs from '@/components/indexs'
import EsIndexs from '@/components/EsIndexs'
import ContainerIndex from '@/components/ContainerIndex'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/NoteEdit',
      name: 'NoteEdit',
      component: NoteEdit
    },
    {
      path: '/HelloWorldElement',
      name: 'HelloWorldElement',
      component: HelloWorldElement
    },
    // {
    //   path: '/indexs',
    //   name: 'indexs',
    //   component: indexs,
    //   children: [
    //     {
    //       path: '/NoteSelect',
    //       name: 'NoteSelect',
    //       component: NoteSelect
    //     }
    //   ]
    // },
    {
      path: '/EsIndexs',
      name: 'EsIndexs',
      component: EsIndexs,
      children: [
        // {
        //   path: '/',
        //   redirect: '/NoteSelect'
        // },
        {
          path: '/NoteSelect',
          name: 'NoteSelect',
          component: NoteSelect
        }
      ]
    },
    {
      path: '/ContainerIndex',
      name: 'ContainerIndex',
      component: ContainerIndex
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ]
})
