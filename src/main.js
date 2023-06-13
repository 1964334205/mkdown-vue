// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'

// 定义一个Fetch拦截器
const interceptor = (request) => {
  // 在请求头中添加一个自定义的Authorization字段
  request.headers.set('Authorization', 'Bearer your_token_here')

  // 返回修改后的请求对象
  return request
}

// 使用Fetch拦截器来发送请求
fetch('/api', {
  method: 'POST',
  body: JSON.stringify({ name: 'John' }),
  headers: {
    'Content-Type': 'application/json'
  },
  // 将拦截器函数作为参数传递给interceptor属性
  interceptor
}).then(response => {
  console.log(response)
}).catch(error => {
  alert(error)
})

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(Router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
