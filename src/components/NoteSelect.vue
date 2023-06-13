<template>
  <div style="height: 100%" class="hello" id="main">
    <div style="width:100%">
      <h1 style="width:100%">{{ title }}
        <el-button style="float: right;" v-if="this.editOrAdd.id" type="primary" @click="submitForm('ruleForm')"
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
      // 编辑器内容
      mavonEditor: '',
      // 笔记标题
      title: '',
      // noteImgs: [],
      // 笔记信息
      editOrAdd: {
        // 笔记id
        id: null,
        // 0为新增笔记  1为更新笔记
        editOrAdd: 0,
        // 区分index调用与Eslndexs调用 indexs页跳转：true   eslndexs页面跳转：false
        isIndex: false
      }
    }
  },
  mounted: function () {
    // this.selectNote() // 需要触发的函数
  },
  methods: {
    // async selectNote () {
    //   // 更新组件状态
    //   var url = '/api/Note/selectNote?id=' + this.$route.query.id
    //   this.editOrAdd.id = this.$route.query.id
    //   try {
    //     const response = await fetch(url, {
    //       // mode: 'no-cors'
    //     })
    //     const jsonData = await response.json()
    //     this.mavonEditor = jsonData.particulars
    //     this.title = jsonData.title
    //     // for (let _img = 0; _img < jsonData.noteImgs.length; _img++) {
    //     //   if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
    //     //     this.$refs.md.$imgUpdateByUrl(_img + 1, jsonData.noteImgs[_img].imgUrl)
    //     //   }
    //     // }
    //     // for (var _img in this.noteImgs) {
    //     //   if (jsonData.noteImgs[_img] !== 'null' && jsonData.noteImgs[_img] != null) {
    //     //     this.$refs.md.$imgUpdateByUrl(_img, jsonData.noteImgs[_img])
    //     //   }
    //     // }
    //   } catch (err) {
    //     alert(err)
    //   }
    // },
    submitForm (formName) {
      // 设置笔记状态为修改
      this.editOrAdd.editOrAdd = 1
      sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
      // 跳转页面到编辑页
      this.$router.push({path: '/NoteEdit'})
    }
    // EsIndesxrEfsNoteSelect (id, title, particulars, isIndex) {
    //   this.mavonEditor = particulars
    //   this.title = title
    //   this.editOrAdd.id = id
    //   this.editOrAdd.isIndex = isIndex
    // }
    // submitForm (formName) {
    //   // 将用户信息存储到sessionStorage中
    //   this.editOrAdd.id = this.$route.query.id
    //   this.editOrAdd.editOrAdd = 1
    //   sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
    //   // 跳转页面到编辑页
    //   this.$router.push('/HelloWorldCopy')
    // },
    // addSubmitForm (formName) {
    //   // 跳转页面到编辑页
    //   this.editOrAdd.id = this.$route.query.id
    //   this.editOrAdd.editOrAdd = 0
    //   sessionStorage.setItem('editOrAdd', JSON.stringify(this.editOrAdd))
    //   this.$router.push('/HelloWorldCopy')
    // },
    // async deleteNote (formName) {
    //   var url = 'http://127.0.0.1:8081/Note/deleteNote?id=' + this.$route.query.id + '&esId=' + this.$route.query.esId
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
