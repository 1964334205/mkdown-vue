<template>
  <div style="height: 100%;" class="hello" id="main">
    <div style="width:100%">
      <h1 style="width:100%">{{ node.noteTitle }}
        <el-button style="float: right;" type="primary" @click="deleteNote('ruleForm')"
        >删除笔记</el-button>
        <el-button style="float: right;" type="primary" @click="returnindex('ruleForm')"
        >返回</el-button>
      </h1>
    </div>
    <el-input v-model="node.noteTitle" placeholder="请输入标题"></el-input>
    <!-- <button @click="uploadimg">upload</button> -->
    <mavon-editor style="min-height: 700px" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" v-model="node.noteParticulars" @save="increment"
      navigation = navigation
    ></mavon-editor>
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
        noteParticulars: '',
        noteId: null,
        noteTitle: ''
      },
      mavonEditor: '',
      navigation: true
    }
  },
  mounted: function () {
    var editOrAdd = JSON.parse(sessionStorage.getItem('editOrAdd'))
    if (editOrAdd.editOrAdd === 1) {
      // 将用户信息存储到sessionStorage中
      this.node.noteId = editOrAdd.noteId
      console.log('跳转：' + this.node.noteId)
      this.redaNoteToMavoneditor(this.node.noteId) // 需要触发的函数
    } else {
      // this.node.noteId = JSON.parse(sessionStorage.getItem('noteId'))
      console.log('新增：' + this.node.noteId)
      this.redaNoteToMavoneditor(null)
    }
  },
  methods: {
    async redaNoteToMavoneditor (noteId) {
      if (noteId === null) {
        console.log('redaNoteToMavoneditor = ' + this.node.noteId)
      } else {
        // 更新组件状态
        var url = 'http://127.0.0.1:8081/Note/selectNote?noteId=' + noteId
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
          this.node.noteParticulars = jsonData.noteParticulars
          this.node.noteImgIds = jsonData.noteImgIds
          this.node.noteTitle = jsonData.noteTitle
          this.node.noteId = jsonData.noteId
          console.log(jsonData.noteImgs)
          // for (let _img = 0; _img < jsonData.noteImgs.length; _img++) {
          //   console.log(jsonData.noteImgs[_img])
          //   console.log(jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null)
          //   if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
          //     // this.$refs.md.$imgNum(_img + 1)
          //     // this.$refs.md.$imgUpdateByUrl(_img + 1, jsonData.noteImgs[_img].imgUrl)
          //     console.log('jsonData.imgplace: ' + this.imgplace)
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
      }
    },
    async increment (value, render) {
      // 更新组件状态
      // console.log(value.constructor.name)
      // console.log(value)
      // console.log(render)
      console.log('note信息')
      console.log(this.node)
      console.log(JSON.stringify(this.node))
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
        if (jsonData !== null) {
          this.node.noteId = jsonData
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '保存失败',
            type: 'success'
          })
        }
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 3000)
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        this.node.noteImgIds = this.node.noteImgIds + jsonData.imgId + ','
        // this.$refs.md.$imgUpdateByUrl(2, jsonData.imgUrl)
        this.$refs.md.$img2Url(pos, jsonData.imgUrl)
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
    },
    async deleteNote (formName) {
      // 删除笔记
    // var let const
      var url = 'http://127.0.0.1:8081/Note/deleteNote?noteId=' + this.node.noteId
      console.log(url)
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        console.log(response)
        const jsonData = await response.json()
        console.log(jsonData)
        if (jsonData) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$router.push({path: '/EsIndexs'})
        }
      } catch (err) {
        alert(err)
      }
    },
    returnindex (formName) {
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到编辑页
      this.$router.push({path: '/EsIndexs'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
