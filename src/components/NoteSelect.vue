<template>
  <div style="height: 100%" class="hello" id="main">
    <h1>{{ noteTitle }}</h1>
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
      noteImgs: []
    }
  },
  mounted: function () {
    this.increment() // 需要触发的函数
  },
  methods: {
    async increment (value, render) {
      // 更新组件状态
      var url = 'http://127.0.0.1:8081/Note/selectNote?id=4'
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
        for (var _img in this.noteImgs) {
          if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
            console.log(jsonData.noteImgs[_img])
            this.$refs.md.$imgUpdateByUrl(_img, jsonData.noteImgs[_img])
          }
        }
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
