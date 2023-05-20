<template>
  <div style="height: 100%" class="hello" id="main">
    <h1>第一份笔记</h1>
    <button @click="uploadimg">upload</button>
    <mavon-editor style="min-height: 700px" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" @save="increment"></mavon-editor>
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
      img_file: {},
      imgUploadingUrl: 'http://127.0.0.1:8081/Img/Submit',
      node: {
        noteImgIds: '',
        noteParticulars: ''
      }
    }
  },
  methods: {
    async increment (value, render) {
      // 更新组件状态
      console.log(value.constructor.name)
      console.log(value)
      console.log(render)
      var url = 'http://127.0.0.1:8081/Note/Submit'
      this.node.noteParticulars = value
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.node)
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
      } catch (err) {
        alert(err)
      }
    },
    // 绑定@imgAdd event
    async imgAdd (pos, $file) {
      // 缓存图片信息
      console.log($file)
      var formdata = new FormData()
      formdata.append('files', $file)
      try {
        const response = await fetch(this.imgUploadingUrl, {
          // mode: 'no-cors'
          method: 'POST',
          body: formdata
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        this.node.noteImgIds = this.node.noteImgIds + jsonData.imgId + ','
        console.log(this.node.noteImgIds)
        this.$refs.md.$imgUpdateByUrl(pos, jsonData.imgUrl)
      } catch (err) {
        alert(err)
      }
    },
    imgDel (pos) {
      delete this.img_file[pos]
    },
    async uploadimg (e) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      console.log(this.img_file)
      for (var _img in this.img_file) {
        formdata.append('files', this.img_file[_img])
      }
      console.log(formdata.get('files'))
      try {
        const response = await fetch(this.imgUploadingUrl, {
          // mode: 'no-cors'
          method: 'POST',
          body: formdata
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
