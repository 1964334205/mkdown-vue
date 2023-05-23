<template>
  <div style="height: 100%" class="hello" id="main">
    <h1>{{ noteTitle }}
      <el-button type="primary" @click="submitForm('ruleForm')"
      >编辑</el-button>
      <el-button type="primary" @click="addSubmitForm('ruleForm')"
      >新增</el-button>
    </h1>
    <mavon-editor style="min-height: 700px" ref="md" :subfield="false"
                  :defaultOpen="'preview'"
                  :editable="false"
                  :toolbarsFlag="false"  v-model="mavonEditor" @save="increment"></mavon-editor>
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
        noteId: '',
        // 0为新增  1为更新
        editOrAdd: 0
      }
    }
  },
  mounted: function () {
    this.increment() // 需要触发的函数
  },
  methods: {
    async increment (value, render) {
      // 更新组件状态
      var url = 'http://127.0.0.1:8081/Note/selectNote?noteId=' + this.$route.query.noteId
      console.log(url)
      // fetch(url, {
      //   method: 'get',
      //   mode: 'no-cors',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(function (resp) {
      //   console.log(resp)
      //   return resp.text()
      // }).then(function (text) {
      //   console.log(text)
      //   var obj = JSON.parse(text)
      //   console.log(obj)
      // })
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        this.mavonEditor = jsonData.noteParticulars
        this.noteTitle = jsonData.noteTitle
        console.log(jsonData.noteImgs)
        for (let _img = 0; _img < jsonData.noteImgs.length; _img++) {
          console.log(jsonData.noteImgs[_img])
          console.log(jsonData.noteImgs[_img].imgUrl)
          console.log(jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null)
          if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
            this.$refs.md.$imgUpdateByUrl(_img + 1, jsonData.noteImgs[_img].imgUrl)
          }
        }
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
      // 将用户信息存储到sessionStorage中
      this.editOrAdd.noteId = this.$route.query.noteId
      this.editOrAdd.editOrAdd = 1
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到编辑页
      this.$router.push('/HelloWorldCopy')
    },
    addSubmitForm (formName) {
      // 跳转页面到编辑页
      console.log('无连接跳转')
      this.editOrAdd.noteId = this.$route.query.noteId
      this.editOrAdd.editOrAdd = 0
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      this.$router.push('/HelloWorldCopy')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
