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
    <mavon-editor style="min-height: 700px" ref="md" @imgAdd="imgAddMkdown" @imgDel="imgDel" v-model="node.noteParticulars" @save="increment"
      navigation=true
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
  // props: {
  //   scrollStyle: {
  //     // 是否渲染滚动条样式(webkit)
  //     type: Boolean,
  //     default: true
  //   },
  //   boxShadow: {
  //     // 是否添加阴影
  //     type: Boolean,
  //     default: true
  //   },
  //   transition: {
  //     // 是否开启动画过渡
  //     type: Boolean,
  //     default: true
  //   },
  //   autofocus: {
  //     // 是否自动获取焦点
  //     type: Boolean,
  //     default: true
  //   },
  //   fontSize: {
  //     // 字体大小
  //     type: String,
  //     default: '14px'
  //   },
  //   toolbarsBackground: {
  //     // 工具栏背景色
  //     type: String,
  //     default: '#ffffff'
  //   },
  //   editorBackground: {
  //     // TODO: 编辑栏背景色
  //     type: String,
  //     default: '#ffffff'
  //   },
  //   previewBackground: {
  //     // 预览栏背景色
  //     type: String,
  //     default: '#fbfbfb'
  //   },
  //   boxShadowStyle: {
  //     // 阴影样式
  //     type: String,
  //     default: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
  //   },
  //   help: {
  //     type: String,
  //     default: null
  //   },
  //   value: {
  //     // 初始 value
  //     type: String,
  //     default: ''
  //   },
  //   language: {
  //     // 初始语言
  //     type: String,
  //     default: 'zh-CN'
  //   },
  //   subfield: {
  //     type: Boolean,
  //     default: true
  //   },
  //   navigation: {
  //     type: Boolean,
  //     default: false
  //   },
  //   defaultOpen: {
  //     type: String,
  //     default: null
  //   },
  //   editable: {
  //     // 是否开启编辑
  //     type: Boolean,
  //     default: true
  //   },
  //   toolbarsFlag: {
  //     // 是否开启工具栏
  //     type: Boolean,
  //     default: true
  //   },
  //   html: {
  //     // Enable HTML tags in source
  //     type: Boolean,
  //     default: true
  //   },
  //   xssOptions: {
  //     // XSS 选项
  //     type: [Object, Boolean],
  //     default () {
  //       return {}
  //     }
  //   },
  //   codeStyle: {
  //     // <code></code> 样式
  //     type: String,
  //     default () {
  //       return 'github'
  //     }
  //   },
  //   placeholder: {
  //     // 编辑器默认内容
  //     type: String,
  //     default: null
  //   },
  //   ishljs: {
  //     type: Boolean,
  //     default: true
  //   },
  //   externalLink: {
  //     type: [Object, Boolean],
  //     default: true
  //   },
  //   imageFilter: {
  //     type: Function,
  //     default: null
  //   },
  //   imageClick: {
  //     type: Function,
  //     default: null
  //   },
  //   tabSize: {
  //     type: Number,
  //     default: 0
  //   },
  //   shortCut: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      text: '',
      img_file: {},
      imgUploadingUrl: 'http://127.0.0.1:8081/Img/Submit',
      node: {
        noteImgIds: '',
        noteParticulars: '',
        noteId: 0,
        noteTitle: ''
      },
      mavonEditor: '',
      navigation: false
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
      this.redaNoteToMavoneditor(0)
    }
  },
  methods: {
    async redaNoteToMavoneditor (noteId) {
      if (noteId === 0) {

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
        if (jsonData) {
          this.$message({
            message: '保存成功',
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
