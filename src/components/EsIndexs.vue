<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
        <el-input v-model="noteTitleAndNoteParticulars" placeholder="请输入查询内容"></el-input>
          <el-button type="primary" @click="selectNoteEs('ruleForm')"
        >查询</el-button>
        <el-button type="primary" @click="returnindex('ruleForm')"
        >返回</el-button>
        <el-menu>
          <!-- <el-submenu v-for="note in notes" :key="note.id" :index="note.id">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>{{ note.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                {{note.particulars}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <div class="note" v-for="note in notes" :key="note.id" >
            <div style="margin-top: 20px;">
              <a @click="submitForm(note.id)">
                <span style="font: medium bold; font-size:2vw; color:dodgerblue;" v-html="note.titleHighlight"></span>
              </a>
            </div>
            <div style="margin-top:10px">
              <span style="font-size:1vw; color:black;" v-html="note.particularsHighlight">
              </span>
            </div>
            <div style="height:30px"/>
          </div>
        </el-menu>
      </el-aside>
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
  div.note > div > a > span > em{
    color:red;
  }
  div.note > div > span > em{
    color:red;
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
      // 笔记状态
      editOrAdd: {
        // 笔记id
        id: null,
        // 0为新增笔记  1为更新笔记
        editOrAdd: 0
      },
      // 搜索笔记输入框内容
      noteTitleAndNoteParticulars: ''
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('noteTitleAndNoteParticulars')) {
      // 获取indexs页面输入框内容
      this.noteTitleAndNoteParticulars = sessionStorage.getItem('noteTitleAndNoteParticulars')
    }
    // 页面初始化函数
    this.selectNoteEs() // 需要触发的函数
  },
  methods: {
    // // 查询笔记
    // async selectUserNote () {
    //   // 查询笔记URL
    //   var url = '/api/Note/selectUserNote'
    //   try {
    //     const response = await fetch(url, {
    //       // mode: 'no-cors'
    //     })
    //     // 获取回传信息,将内容转换为json格式
    //     const notes = await response.json()
    //     // 循环获取笔记
    //     for (let index = 0; index < notes.length; index++) {
    //       // 获取一个笔记
    //       var note = notes[index]
    //       if (note != null) {
    //         this.notes = []
    //         if (!note.titleHighlight) {
    //           note.titleHighlight = note.title
    //         }
    //         if (!note.particularsHighlight) {
    //           note.particularsHighlight = note.particulars
    //         }
    //         this.notes.push({id: note.id, titleHighlight: note.titleHighlight, particularsHighlight: note.particularsHighlight})
    //       } else {
    //         console.log('notes index ' + index + ' is null')
    //       }
    //     }
    //   } catch (err) {
    //     alert(err)
    //   }
    // },
    // selectNote (id) {
    //   for (let index = 0; index < this.notes.length; index++) {
    //     if (this.notes[index].id === id) {
    //       this.$refs.NoteSelect.EsIndesxrEfsNoteSelect(this.notes[index].id, this.notes[index].title, this.notes[index].particulars)
    //     }
    //   }
    //   this.editOrAdd.id = id
    // },
    // 跳转到笔记编辑页
    submitForm (id) {
      // 设置笔记状态为修改
      this.editOrAdd.editOrAdd = 1
      // 设置笔记id
      this.editOrAdd.id = id
      // 置空搜索框
      this.noteTitleAndNoteParticulars = ''
      // 传递笔记状态信息
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到编辑页
      this.$router.push({path: '/NoteEdit'})
    },
    // addSubmitForm (formName) {
    //   // 跳转页面到新增页
    //   this.editOrAdd.editOrAdd = 0
    //   sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
    //   this.$router.push({path: '/NoteEdit'})
    // },
    // async deleteNote (formName) {
    //   // 删除笔记
    // // var let const
    //   var url = '/api/Note/deleteNote?id=' + this.editOrAdd.id
    //   try {
    //     const response = await fetch(url, {
    //       // mode: 'no-cors'
    //     })
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
    // 初始化页面
    async selectNoteEs (formName) {
      // es查询笔记
      var url = '/api/Note/selectNoteEs?noteTitleAndNoteParticulars=' + this.noteTitleAndNoteParticulars
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        // 获取回传信息,将内容转换为json格式
        const notes = await response.json()
        // 置空原来的笔记列表
        this.notes = []
        // 循环获取笔记内容
        for (let index = 0; index < notes.length; index++) {
          // 获取一个笔记内容
          var note = notes[index]
          if (note != null) {
            if (!note.titleHighlight) {
              // 获取笔记标题
              note.titleHighlight = note.title
            }
            if (!note.particularsHighlight) {
              // 获取笔记内容
              note.particularsHighlight = note.particulars
            }
            // 写入笔记列表
            this.notes.push({titleHighlight: note.titleHighlight, id: note.id, particularsHighlight: note.particularsHighlight})
          } else {
            console.log('notes index ' + index + ' is null')
          }
        }
      } catch (err) {
        alert(err)
      }
    },
    // 返回到indexs页面
    returnindex (formName) {
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到首页
      this.$router.push({path: '/indexs'})
    }
  }
}
</script>
