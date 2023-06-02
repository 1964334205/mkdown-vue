<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-button type="primary" @click="returnindex('ruleForm')"
        >返回</el-button>
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="noteTitle"><i class="el-icon-s-order"></i>笔记</template>
            <el-menu-item-group id="note">
              <el-menu-item v-for="note in notes" :key="note.id">
                <router-link :to="{path:'/NoteSelect',query:{noteId: note.noteId}}" redirect  @click.native="selectNote(note.noteId)">{{ note.noteTitle }}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-input style="width:250px" v-model="noteTitleAndNoteParticulars" placeholder="请输入查询内容"></el-input>
          <el-button type="primary" @click="selectNoteEs('ruleForm')"
        >查询</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')"
          >编辑</el-button> -->
        </el-header>
        <el-main >
          <NoteSelect ref="NoteSelect"></NoteSelect>
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
        userName: ''
      },
      editOrAdd: {
        noteId: null,
        // 0为新增  1为更新
        editOrAdd: 0,
        noteImgIds: ''
      },
      noteTitleAndNoteParticulars: ''
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('noteTitleAndNoteParticulars')) {
      // 将用户信息存储到sessionStorage中
      this.noteTitleAndNoteParticulars = sessionStorage.getItem('noteTitleAndNoteParticulars')
    }
    this.selectNoteEs() // 需要触发的函数
  },
  methods: {
    async selectUserNote () {
      // 更新组件状态
      var url = 'http://127.0.0.1:8081/Note/selectUserNote'
      console.log(url)
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        console.log(response)
        const notes = await response.json()
        console.log(this.editOrAdd.noteId)
        for (let index = 0; index < notes.length; index++) {
          var note = notes[index]
          console.log(note)
          if (note != null) {
            // this.notes = this.notes();
            this.notes.push({id: index, noteTitle: note.noteTitle, noteId: note.noteId, noteImgIds: note.noteImgIds, noteParticulars: note.noteParticulars})
          } else {
            console.log('notes index ' + index + ' is null')
          }
        }
      } catch (err) {
        alert(err)
      }
    },
    selectNote (noteId) {
      console.log('需选择' + noteId)
      for (let index = 0; index < this.notes.length; index++) {
        console.log('搜索' + this.notes[index].noteId)
        if (this.notes[index].noteId === noteId) {
          console.log(this.notes[index])
          this.$refs.NoteSelect.EsIndesxrEfsNoteSelect(this.notes[index].noteId, this.notes[index].noteTitle, this.notes[index].noteParticulars)
        }
      }
      this.editOrAdd.noteId = noteId
      console.log('添加跳转内容')
      console.log(noteId)
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
      this.editOrAdd.editOrAdd = 0
      console.log('this.editOrAdd.noteId = ' + this.editOrAdd.noteId)
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      this.$router.push({path: '/NoteEdit'})
    },
    async deleteNote (formName) {
      // 删除笔记
    // var let const
      var url = 'http://127.0.0.1:8081/Note/deleteNote?noteId=' + this.editOrAdd.noteId
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
          this.selectUserNote()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (err) {
        alert(err)
      }
    },
    async selectNoteEs (formName) {
      this.notes = []
      // es查询笔记
      var url = 'http://127.0.0.1:8081/Note/selectNoteEs?noteTitleAndNoteParticulars=' + this.noteTitleAndNoteParticulars
      console.log(url)
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        const notes = await response.json()
        for (let index = 0; index < notes.length; index++) {
          var note = notes[index]
          if (note != null) {
            // this.notes = this.notes();
            this.notes.push({id: index, noteTitle: note.noteTitle, noteId: note.noteId, noteImgIds: note.noteImgIds, noteParticulars: note.noteParticulars})
          } else {
            console.log('notes index ' + index + ' is null')
          }
        }
      } catch (err) {
        alert(err)
      }
    },
    returnindex (formName) {
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到首页
      this.$router.push({path: '/indexs'})
    }
  }
}
</script>
