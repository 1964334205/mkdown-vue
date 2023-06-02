<template>
  <div style="height: 100%" class="hello" id="main">
    <div style="width:100%">
      <h1 style="width:100%">{{ noteTitle }}
        <el-button style="float: right;" type="primary" @click="submitForm('ruleForm')"
        >编辑</el-button>
      </h1>
    </div>
    <div tyle="width:100%">
          <mavon-editor style="min-height: 700px" ref="md" :subfield="false"
                  :defaultOpen="'preview'"
                  :editable="false"
                  :toolbarsFlag="false"  v-model="mavonEditor"></mavon-editor>
    </div>

  </div>
</template>

<script>
// Local Registration
// import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
var mavonEditor = require('mavon-editor')
export default {
  name: 'HelloWorldCopy',
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      text: '',
      mavonEditor: '',
      noteTitle: '',
      noteImgs: [],
      editOrAdd: {
        noteId: null,
        // 0为新增  1为更新
        editOrAdd: 0
      }
    }
  },
  mounted: function () {
    console.log('跳转页面  ' + this.$route.query.noteId)
    this.selectNote() // 需要触发的函数
  },
  methods: {
    async selectNote () {
      // 更新组件状态
      var url = 'http://127.0.0.1:8081/Note/selectNote?noteId=' + this.$route.query.noteId
      this.editOrAdd.noteId = this.$route.query.noteId
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        this.mavonEditor = jsonData.noteParticulars
        this.noteTitle = jsonData.noteTitle
        console.log(jsonData.noteImgs == null)
        // for (let _img = 0; _img < jsonData.noteImgs.length; _img++) {
        //   console.log(jsonData.noteImgs[_img])
        //   console.log(jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null)
        //   if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
        //     this.$refs.md.$imgUpdateByUrl(_img + 1, jsonData.noteImgs[_img].imgUrl)
        //   }
        // }
        // for (var _img in this.noteImgs) {
        //   console.log(jsonData.noteImgs[_img])
        //   console.log(jsonData.noteImgs[_img] !== 'null')
        //   console.log(jsonData.noteImgs[_img] != null)
        //   if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
        //     this.$refs.md.$imgUpdateByUrl(_img, jsonData.noteImgs[_img])
        //   }
        // }
      } catch (err) {
        alert(err)
      }
    },
    submitForm (formName) {
      this.editOrAdd.editOrAdd = 1
      console.log('有连接跳转')
      console.log(this.editOrAdd)
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到编辑页
      this.$router.push({path: '/NoteEdit'})
    },
    EsIndesxrEfsNoteSelect (noteId, noteTitle, noteParticulars) {
      console.log('父调用字：' + noteParticulars)
      this.mavonEditor = noteParticulars
      this.noteTitle = noteTitle
      this.editOrAdd.noteId = noteId
    }
    // submitForm (formName) {
    //   // 将用户信息存储到sessionStorage中
    //   this.editOrAdd.noteId = this.$route.query.noteId
    //   this.editOrAdd.editOrAdd = 1
    //   sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
    //   // 跳转页面到编辑页
    //   this.$router.push('/HelloWorldCopy')
    // },
    // addSubmitForm (formName) {
    //   // 跳转页面到编辑页
    //   console.log('无连接跳转')
    //   this.editOrAdd.noteId = this.$route.query.noteId
    //   this.editOrAdd.editOrAdd = 0
    //   sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
    //   this.$router.push('/HelloWorldCopy')
    // },
    // async deleteNote (formName) {
    //   var url = 'http://127.0.0.1:8081/Note/deleteNote?noteId=' + this.$route.query.noteId + '&esId=' + this.$route.query.esId
    //   console.log(url)
    //   try {
    //     const response = await fetch(url, {
    //       // mode: 'no-cors'
    //     })
    //     console.log(response)
    //     const jsonData = await response.json()
    //     console.log(jsonData)
    //   } catch (err) {
    //     alert(err)
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
