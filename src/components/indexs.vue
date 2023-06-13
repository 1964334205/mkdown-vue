<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="15%" style="background-color: rgb(238, 241, 246)">
        <el-button type="primary" @click="addSubmitForm('ruleForm')"
        >新增</el-button>
        <el-menu width="15%" :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-s-order"></i>
              <span>笔记</span>
            </template>
            <el-menu-item-group id="note">
              <el-menu-item v-for="note in notes" :key="note.id" @click="selectNote(note.id)">
                  {{ note.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-input style="width:250px" v-model="noteTitleAndNoteParticulars" placeholder="请输入查询内容"></el-input>
          <el-button type="primary" @click="selectNoteEs('ruleForm')"
          >查询
          </el-button>
          <!-- <el-button type="primary" style="margin-left: 50%" @click="logOut('ruleForm')"
          >退出</el-button>
          <el-button type="primary" @click="logOffValidate('ruleForm')"
          >注销账户</el-button> -->
          <!-- 欢迎：{{userName}} -->
          <el-dropdown style="float: right;" @command="handleCommand">
            <span class="el-dropdown-link">
              {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu >
                <!-- <el-dropdown-item>用户名：{{userName}}</el-dropdown-item> -->
                <el-dropdown-item command="logOut" >登出</el-dropdown-item>
                <el-dropdown-item command="logOffValidate" >注销账户</el-dropdown-item>
              </el-dropdown-menu>
            </template>
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户名：{{userName}}</el-dropdown-item>
              <el-dropdown-item command="logOut" >登出</el-dropdown-item>
              <el-dropdown-item command="logOffValidate" >注销账户</el-dropdown-item>
            </el-dropdown-menu> -->
          </el-dropdown>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')"
          >编辑</el-button> -->
        </el-header>
        <el-main >
          <h3 v-if="this.notes.length === 0">请新增或选择笔记</h3>
          <NoteSelect v-else ref="NoteSelect"></NoteSelect>
          <!-- <router-view :key="$route.fullPath"></router-view> -->
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
<script>
import NoteSelect from './NoteSelect.vue'
export default {
  components: {
    NoteSelect
  },
  data () {
    return {
      // 笔记列表
      notes: [],
      // 用户名称
      userName: '',
      // 笔记信息
      editOrAdd: {
        // 笔记id
        id: null,
        // 0为新增笔记  1为更新笔记
        editOrAdd: 0,
        // 区分index调用与Eslndexs调用 indexs页跳转：true   eslndexs页面跳转：false
        isIndex: false
      },
      // 搜索笔记输入框内容
      noteTitleAndNoteParticulars: ''
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('userName')) {
      // 设置用户名称
      this.userName = JSON.parse(sessionStorage.getItem('userName'))
    }
    // 页面内容初始化函数
    this.selectUserNote() // 需要触发的函数
  },
  methods: {
    async selectUserNote () {
      // 查询用户全部笔记
      var url = '/api/Note/selectUserNote'
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
          credentials: 'include'
        })
        // 获取回传信息,将内容转换为json格式
        const notes = await response.json()
        // 循环对笔记进行操作
        for (let index = 0; index < notes.length; index++) {
          // 获取一个笔记内容
          var note = notes[index]
          if (note != null) {
            // 写入笔记内容
            this.notes.push({title: note.title, id: note.id, particulars: note.particulars})
          } else {
            console.log('notes index ' + index + ' is null')
          }
        }
      } catch (err) {
        alert(err)
      }
    },
    // 设置NoteSelect组件展示笔记内容
    selectNote (id) {
      // 判断展示那个笔记内容
      for (let index = 0; index < this.notes.length; index++) {
        if (this.notes[index].id === id) {
          // 调用子组件函数，展示笔记内容
          this.$refs.NoteSelect.EsIndesxrEfsNoteSelect(this.notes[index].id, this.notes[index].title, this.notes[index].particulars, true)
        }
      }
      // 设置笔记id
      this.editOrAdd.id = id
    },
    // submitForm (formName) {
    //   this.editOrAdd.editOrAdd = 1
    //   sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
    //   // 跳转页面到编辑页
    //   this.$router.push({path: '/NoteEdit'})
    // },
    // 新增笔记
    addSubmitForm (formName) {
      // 设置为新增笔记
      this.editOrAdd.editOrAdd = 0
      this.editOrAdd.isIndex = true
      // 传递笔记信息
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转到笔记编辑页
      this.$router.push({path: '/NoteEdit'})
    },
    // async deleteNote (formName) {
    //   // 删除笔记
    //   var url = '/api/Note/deleteNote?id=' + this.editOrAdd.id
    //   // console.log(url)
    //   try {
    //     const response = await fetch(url, {
    //       // mode: 'no-cors'
    //       credentials: 'include'
    //     })
    //     // 获取回传信息,将内容转换为json格式
    //     const jsonData = await response.json()
    //     if (jsonData) {
    //       this.notes = []
    //       this.selectUserNote()
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //     }
    //   } catch (err) {
    //     alert(err)
    //   }
    // },
    // 跳转到查询页
    selectNoteEs (formName) {
      // 传递查询参数
      sessionStorage.setItem('noteTitleAndNoteParticulars', this.noteTitleAndNoteParticulars)
      // 跳转页面到查询页
      this.$router.push({path: '/EsIndexs'})
    },
    // 退出当前账户
    async logOut (formName) {
      // 清空用户名
      this.userName = ''
      // 退出URL
      var url = '/api/User/logOut'
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
          credentials: 'include'
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        if (jsonData.code === 200) {
          this.$message({
            message: jsonData.message,
            type: 'success'
          })
          // 跳转页面到登录页
          this.$router.push({path: '/Login'})
        } else {
          this.$message({
            message: jsonData.message,
            type: 'warning'
          })
        }
      } catch (err) {
        alert(err)
      }
    },
    // 注销账户
    logOffValidate () {
      // 确认用户是否注销
      this.$confirm('是否确认注销账户(注销账户会删除所有笔记)?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 跳转注销函数
        this.logOff()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 注销函数
    async logOff (formName) {
      // 清空用户名称
      this.userName = ''
      // 注销账户URL
      var url = '/api/User/logOff'
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
          credentials: 'include'
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        if (jsonData.code === 200) {
          this.$message({
            message: jsonData.data,
            type: 'success'
          })
          // 跳转页面到登录页
          this.$router.push({path: '/Login'})
        } else {
          this.$message({
            message: jsonData.message,
            type: 'warning'
          })
        }
      } catch (err) {
        alert(err)
      }
    },
    // 下拉列表选择器
    handleCommand (command) {
      // 退出账户
      if (command === 'logOut') {
        this.logOut('ruleForm')
      // 注销账户
      } else if (command === 'logOffValidate') {
        this.logOffValidate('ruleForm')
      }
    }
  }
}
</script>
