<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-order"></i>笔记</template>
            <el-menu-item-group id="note">
              <el-menu-item v-for="note in notes" :key="note.id" @click="selectNote(note.noteId)">
                <router-link :to="{path:'/NoteSelect',query:{noteId: note.noteId}}">{{ note.title }}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view :key="$route.fullPath"></router-view>
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
        userId: null
      }
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
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
            this.notes.push({id: index, title: note.noteTitle, noteId: note.noteId})
          } else {
            console.log('notes index ' + index + ' is null')
          }
        }
      } catch (err) {
        alert(err)
      }
    },
    selectNote (e) {
      console.log(e)
      // this.$router.push('/NoteSelect')
      // switch (key) {
      //   case '1':
      //     this.$router.push('/Page1')
      //     this.breadcrumbItems = ['导航一']
      //     break
      //   case '2':
      //     this.$router.push('/Page2')
      //     this.breadcrumbItems = ['导航二']
      //     break
      //   case '3':
      //     this.$router.push('/Page3')
      //     this.breadcrumbItems = ['导航三']
      //     break
      // }
    }
  }
}
</script>
