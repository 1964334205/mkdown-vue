<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-order"></i>笔记</template>
            <el-menu-item-group id="note">
              <el-menu-item v-for="note in notes" :key="note.id">
                <router-link :to="{path:'/NoteSelect',query:{noteId: note.noteId,esId:note.edId}}"  @click.native="selectNote(note.noteId,note.esId,note.noteImgIds)">{{ note.title }}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="primary" @click="submitForm('ruleForm')"
          >编辑</el-button>
          <el-button type="primary" @click="addSubmitForm('ruleForm')"
          >新增</el-button>
          <el-button type="primary" @click="deleteNote('ruleForm')"
          >删除笔记</el-button>
        </el-header>
        <el-main >
          <router-view :key="$route.fullPath"></router-view>
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
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item),
      notes: [],
      NoteSelectUrl: '',
      userInfo: {
        userName: '',
        userId: ''
      },
      editOrAdd: {
        noteId: '',
        // 0为新增  1为更新
        editOrAdd: 0,
        esId: '',
        userId: '',
        noteImgIds: ''
      }
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
    this.editOrAdd.userId = this.userInfo.userId
    this.selectUserNote(this.userInfo.userId) // 需要触发的函数
  },
  methods: {
    async selectUserNote (userId) {
      // 更新组件状态
      var url = 'http://127.0.0.1:8081/Note/selectUserNote?userId=' + userId
      console.log(url)
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        console.log(response)
        // [{id:1, content: aab}, null]
        const notes = await response.json()
        // console.log(this.notes)

        // this.notes = notes
        console.log(notes.length)
        console.log(this.notes)

        console.log(notes)
        for (let index = 0; index < notes.length; index++) {
          var note = notes[index]
          console.log(note)
          if (note != null) {
            // this.notes = this.notes();
            this.notes.push({id: index, title: note.noteTitle, noteId: note.noteId, esId: note.esId, noteImgIds: note.noteImgIds})
          } else {
            console.log('notes index ' + index + ' is null')
          }
        }
      } catch (err) {
        alert(err)
      }
    },
    selectNote (noteId, esId, noteImgIds) {
      this.editOrAdd.esId = esId
      this.editOrAdd.noteId = noteId
      this.editOrAdd.noteImgIds = noteImgIds
      console.log('添加跳转内容')
      console.log(noteImgIds)
    },
    submitForm (formName) {
      this.editOrAdd.editOrAdd = 1
      console.log('有连接跳转')
      console.log(this.editOrAdd)
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到编辑页
      this.$router.push({path: '/NoteEdit'})
    },
    addSubmitForm (formName) {
      // 跳转页面到新增页
      console.log('无连接跳转')
      console.log(this.editOrAdd.userId)
      this.editOrAdd.editOrAdd = 0
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      this.$router.push({path: '/NoteEdit'})
    },
    async deleteNote (formName) {
      // 删除笔记
      var url = 'http://127.0.0.1:8081/Note/deleteNote?noteId=' + this.editOrAdd.noteId + '&esId=' + this.editOrAdd.esId + '&noteImgIds=' + this.editOrAdd.noteImgIds
      console.log(url)
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        if (jsonData) {
          this.notes = []
          this.selectUserNote(this.editOrAdd.userId)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>
