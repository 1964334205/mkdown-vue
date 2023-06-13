<template>
  <div style="height: 100%;" class="hello" id="main">
    <div style="width:100%">
      <input id="title"  v-model="node.title" placeholder="请输入标题"/>
      <el-button class="editButton" type="primary" @click="deleteNote('ruleForm')" v-if="editOrAdd === 1"
      >删除笔记</el-button>
      <el-button class="editButton" type="primary" @click="returnindex('ruleForm')"
      >返回</el-button>
    </div>
    <mavon-editor style="min-height: 700px" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" v-model="node.particulars" @change="hintSaveF" @save="increment"
      navigation = navigation
    ></mavon-editor>
  </div>
</template>
<style>
  #title{
    width:70%;
    color:#000000;
    margin-top:10px;
    margin-bottom:15px;
    border: none;
    outline: none;
    background: transparent;
    font-size:3em;
    height: 50px;
  }

  #title[type="text"]:focus {
    outline: none;
  }

  button.editButton{
    float: right;
    margin-top:25px;
    margin-bottom:15px;
  }

</style>
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
      imgUploadingUrl: '/api/Img/Submit',
      node: {
        imgIds: '',
        particulars: '',
        id: null,
        title: ''
      },
      mavonEditor: '',
      navigation: true,
      // 区分index调用与Eslndexs调用 indexs页跳转：true   eslndexs页面跳转：false
      isIndex: false,
      // 是否已进行编辑  未编辑:false  已编辑：true
      hintSave: false,
      // 排除第一次对编辑区赋值造成的，编辑器回调事件影响 赋值：true   未赋值：false
      hintSaves: false,
      // 0为新增笔记  1为修改笔记
      editOrAdd: 2
    }
  },
  mounted: function () {
    // 获取父页面传递的参数
    var editOrAdd = JSON.parse(sessionStorage.getItem('editOrAdd'))
    if (editOrAdd.editOrAdd === 1) {
      // 设置笔记为修改状态
      this.editOrAdd = 1
      // 设置笔记id
      this.node.id = editOrAdd.id
      // 区分调用方式
      this.isIndex = editOrAdd.isIndex
      this.redaNoteToMavoneditor(this.node.id) // 需要触发的函数
    } else {
      // 设置笔记为新增状态
      this.editOrAdd = 0
      // 区分调用方式
      this.isIndex = editOrAdd.isIndex
      this.redaNoteToMavoneditor(null)
    }
  },
  methods: {
    async redaNoteToMavoneditor (id) {
      if (id === null) {
        this.hintSaves = false
      } else {
        // 查询笔记内容
        var url = '/api/Note/selectNote?id=' + id
        try {
          const response = await fetch(url, {
            // mode: 'no-cors'
          })
          // 获取回传信息,将内容转换为json格式
          const jsonData = await response.json()
          // 对变量进行赋值
          this.node.particulars = jsonData.particulars
          this.node.imgIds = jsonData.imgIds
          this.node.title = jsonData.title
          this.node.id = jsonData.id
        } catch (err) {
          alert(err)
        }
      }
      // 排除第一次赋值造成的保存状态影响
      this.hintSaves = true
    },
    async increment (value, render) {
      // 保存笔记的URL
      var url = '/api/Note/Submit'
      // 保存笔记内容
      this.node.particulars = value
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.node)
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        if (jsonData !== null) {
          // 获取回传笔记id
          this.node.id = jsonData
          // 修改笔记状态为已保存
          this.hintSave = false
          // 修改笔记状态为修改
          this.editOrAdd = 1
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '保存失败',
            type: 'warning'
          })
        }
      } catch (err) {
        alert(err)
      }
    },
    // 绑定@imgAdd event
    async imgAdd (pos, $file) {
      // 读取图片
      var formdata = new FormData()
      formdata.append('files', $file)
      // 锁死页面
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const response = await fetch(this.imgUploadingUrl, {
          // mode: 'no-cors'
          method: 'POST',
          body: formdata
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        // 添加图片id
        this.node.imgIds = this.node.imgIds + jsonData.id + ','
        // this.$refs.md.$imgUpdateByUrl(2, jsonData.imgUrl)
        // 使编辑器显示上传图片URL
        this.$refs.md.$img2Url(pos, jsonData.url)
      } catch (err) {
        alert(err)
      } finally {
        // 结束页面锁死操作
        loading.close()
      }
    },
    // 编辑器内容保存后的回调函数
    hintSaveF (value, render) {
      // 判断是否为第一次查询完笔记进行复制时造成的编辑器回调
      if (this.hintSaves) {
        this.hintSaves = false
      } else {
        // 设置保存状态
        this.hintSave = true
      }
    },
    // 删除图片
    imgDel (pos) {
      delete this.img_file[pos]
    },
    // 删除笔记
    async deleteNote (formName) {
      // 删除笔记
    // var let const
      var url = '/api/Note/deleteNote?id=' + this.node.id
      // 锁死页面
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const response = await fetch(url, {
          // mode: 'no-cors'
        })
        // 获取回传信息,将内容转换为json格式
        const jsonData = await response.json()
        if (jsonData) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 判断那个页面调用，并返回
          if (this.isIndex) {
            this.$router.push({path: '/indexs'})
          } else {
            this.$router.push({path: '/EsIndexs'})
          }
        }
      } catch (err) {
        alert(err)
      } finally {
        // 关闭锁死操作
        loading.close()
      }
    },
    returnindex (formName) {
      // 判断笔记是否已发生编辑
      if (this.hintSave) {
        // 发生编辑后提示用户保存笔记
        this.$confirm('请按CTRL+S保存,否则点击"取消"退出编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(() => {
          // 判断那个页面调用，并返回
          if (this.isIndex) {
            this.$router.push({path: '/indexs'})
          } else {
            this.$router.push({path: '/EsIndexs'})
          }
        })
      } else {
        // 判断那个页面调用，并返回
        if (this.isIndex) {
          this.$router.push({path: '/indexs'})
        } else {
          this.$router.push({path: '/EsIndexs'})
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
