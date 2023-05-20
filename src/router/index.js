import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldCopy from '@/components/HelloWorldCopy'
import HelloWorldElement from '@/components/HelloWorldElement'
import NoteSelect from '@/components/NoteSelect'
import indexss from '@/components/indexss'

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
      path: '/NoteSelect',
      name: 'NoteSelect',
      component: NoteSelect
    },
    {
      path: '/indexss',
      name: 'indexss',
      component: indexss
    }
  ]
})
