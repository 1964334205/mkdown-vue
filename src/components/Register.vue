<template>
  <div id='building'>
    <div>
      <el-card class="box-card" style="float: right; margin-top:10%; margin-right:10%;">
        <h2>注册</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              placeholder="请输入用户名"
              v-model="ruleForm.userName"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwordVerify">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.passwordVerify"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
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
          <el-button type="primary" @click="submitFormValidate('ruleForm')"
            >提交</el-button
          >
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
          <el-button style="float: right;" size="mini" @click="goBack">返回</el-button>
        </div>
      </el-card>
    </div>
  </div>
  <!-- <div>
    <el-card class="box-card">
      <h2>注册</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwordVerify">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.passwordVerify"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
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
        <el-button type="primary" @click="submitFormValidate('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div> -->
</template>
<script>

import md5 from 'js-md5'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.passwordVerify) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var limitUesrName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空！'))
      } else {
        if (value.length > 6) {
          callback(new Error('用户名不能超过6个字符'))
        } else {
          callback()
        }
      }
    }
    return {
      // 注册信息
      ruleForm: {
        // 账户名
        userName: '',
        // 账户密码
        passwordVerify: '',
        // 账户确认密码
        password: ''
      },
      // 加盐秘钥
      salt: 'sdefergg581dfg@%&.G/DF.G',
      rules: {
        userName: [
          { required: true, validator: limitUesrName, trigger: 'blur' }
        ],
        passwordVerify: [{ required: true, validator: validatePass, trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交注册账号信息表单验证
    submitFormValidate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交注册账号
          this.submitForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交注册账号
    async submitForm (formName) {
      let _this = this
      // 提交注册URL
      var url = '/api/User/register'
      // 设置传参格式
      const loginForm = {
        'userName': this.ruleForm.userName,
        // 对密码进行加盐(加密)处理
        'password': md5(this.salt + this.ruleForm.password),
        // 对密码进行加盐(加密)处理
        'passwordVerify': md5(this.salt + this.ruleForm.passwordVerify)
      }
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginForm)
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        if (jsonData.code === 200) {
          // 显示后端响应的成功信息
          this.$message({
            message: jsonData.data,
            type: 'success'
          })
          console.log(jsonData)
          // 传递用户名称参数
          sessionStorage.setItem('userName', JSON.stringify(jsonData.data))
          // 跳转页面到首页
          this.$router.push('/indexs')
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
        return false
      } catch (err) {
        alert(err)
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 返回登录页
    goBack () {
      this.$router.go(-1)
    }
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
