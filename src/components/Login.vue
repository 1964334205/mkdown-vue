<template>
  <div id='building'>
    <div id="loginForm">
      <el-card class="box-card" style="float: right; margin-top:10%; margin-right:10%;">
        <h2>登录</h2>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="70px"
          class="login-from"
        >
          <el-form-item label="用户名" prop="userName" color="black">
            <el-input placeholder="请输入用户名" v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btnGroup">
          <el-button type="primary" size="medium" @click="submitForm('ruleForm')"
          >登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          <router-link style="float: right; margin-top:2%; margin-right:10%;"  to="/register">
            <a style="font-size:12px;">注册</a>
          </router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data () {
    return {
      // 登录信息
      ruleForm: {
        // 账户名
        userName: '',
        // 账户密码
        password: ''
      },
      // 加盐
      salt: 'sdefergg581dfg@%&.G/DF.G',
      rules: {
        userName: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录操作
    async submitForm (formName) {
      let _this = this
      // 登录URL
      var url = '/api/User/login'
      // 设置传参格式
      const loginForm = {
        'userName': this.ruleForm.userName,
        // 对密码进行加盐(加密)处理
        'password': md5(this.salt + this.ruleForm.password)
      }
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginForm)
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        if (jsonData.code === 200) {
          // 传递用户名称参数
          sessionStorage.setItem('userName', JSON.stringify(jsonData.data))
          // 跳转页面到首页
          this.$router.push('/indexs')
          // 显示后端响应的成功信息
          this.$message({
            message: jsonData.message,
            type: 'success'
          })
        } else {
          // 当响应的编码不为 0 时，说明登录失败
          // 显示后端响应的失败信息
          this.$message({
            message: jsonData.message,
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
    //           password: _this.ruleForm.password
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
    }
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // }
  }
}
</script>
<style scoped>
.box-card {
  margin: auto auto;
  width: 400px;
  background-color: transparent;
  border-style: none
}

.login-from {
  margin: auto auto;
}

#building{
  background:url("../../imges/plane-1314333_1920.png");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

</style>
