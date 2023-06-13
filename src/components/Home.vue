<template>
  <div>
    <h2>欢迎{{ userInfo.userName }}！您的 uid 为{{ userInfo.id }}</h2>
    <router-link to="/login">
      <el-button> 登出 </el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {
        userName: '',
        id: null
      }
    }
  },
  methods: {
    logout () {
      // 移除本地用户登录信息
      sessionStorage.removeItem('userInfo')
      // 跳转页面到登录页
      this.$router.push('/login')
    }
  },
  mounted () {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  }
}
</script>
  <style scoped>
</style>
