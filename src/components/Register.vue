<template>
  <div>
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
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPasswordVerify">
          <el-input
            type="userPassword"
            v-model="ruleForm.userPasswordVerify"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userPassword">
          <el-input
            type="userPassword"
            v-model="ruleForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
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
      } else if (value !== this.ruleForm.userPasswordVerify) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        userPasswordVerify: '',
        userPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        userPasswordVerify: [{ required: true, validator: validatePass, trigger: 'blur' }],
        userPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      let _this = this
      var url = 'http://127.0.0.1:8081/User/register'
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
        return false
      } catch (err) {
        alert(err)
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
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
}
.login-from {
  margin: auto auto;
}
</style>
