<template>
  <div>
    <el-card class="box-card">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="70px"
        class="login-from"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input
            type="userPassword"
            v-model="ruleForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <router-link to="/register">
          <el-button style="margin-left: 10px">注册</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        userName: '',
        userPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '密码不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      let _this = this
      var url = 'http://127.0.0.1:8081/User/login'
      console.log(this.ruleForm)
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.ruleForm)
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        if (jsonData.code === '0') {
          // 将用户信息存储到sessionStorage中
          sessionStorage.setItem('userInfo', JSON.stringify(jsonData.data))
          // 跳转页面到首页
          this.$router.push('/EsIndexs')
          // 显示后端响应的成功信息
          this.$message({
            message: jsonData.msg,
            type: 'success'
          })
        } else {
          // 当响应的编码不为 0 时，说明登录失败
          // 显示后端响应的失败信息
          this.$message({
            message: jsonData.msg,
            type: 'warning'
          })
        }
        // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
        _this.loading = false
      } catch (err) {
        alert(err)
      }
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       let _this = this
    //       // 使用 axios 将登录信息发送到后端
    //       this.axios({
    //         // 请求地址
    //         url: '/api/user/login',
    //         // 请求方法
    //         method: 'post',
    //         // 请求头
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         // 请求参数
    //         params: {
    //           userName: _this.ruleForm.userName,
    //           userPassword: _this.ruleForm.userPassword
    //         }
    //       }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
    //         // 当响应的编码为 0 时，说明登录成功
    //         if (res.data.code === '0') {
    //           // 将用户信息存储到sessionStorage中
    //           sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
    //           // 跳转页面到首页
    //           this.$router.push('/home')
    //           // 显示后端响应的成功信息
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'success'
    //           })
    //         } else {
    //           // 当响应的编码不为 0 时，说明登录失败
    //           // 显示后端响应的失败信息
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'warning'
    //           })
    //         }
    //         // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
    //         _this.loading = false
    //         console.log(res)
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.box-card {
  margin: auto auto;
  width: 400px;
}

.login-from {
  margin: auto auto;
}
</style>
