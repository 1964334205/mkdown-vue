import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldCopy from '@/components/HelloWorldCopy'
import HelloWorldElement from '@/components/HelloWorldElement'
import NoteSelect from '@/components/NoteSelect'
import indexss from '@/components/indexss'
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
      path: '/HelloWorldCopy',
      name: 'HelloWorldCopy',
      component: HelloWorldCopy
    },
    {
      path: '/HelloWorldElement',
      name: 'HelloWorldElement',
      component: HelloWorldElement
    },
    {
      path: '/indexss',
      name: 'indexss',
      component: indexss,
      children: [
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
