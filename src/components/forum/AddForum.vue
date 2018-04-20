<template>
  <div>
    <Head activeIndex="5" :showHome='showHome'></Head>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/forum' }">心理论坛</el-breadcrumb-item>
        <el-breadcrumb-item>论坛</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="container mb100">
        <el-form :model="forum" ref="forum" label-width="120px" class="demo-admin">
          <el-form-item prop="title" label="标题">
            <el-input v-model="forum.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item  label="类型" class="clearfix">
            <el-select v-model="forum.forum_label_id" placeholder="请选择" style="float: left">
              <el-option
                v-for="(item, key) in typeList"
                :key="item.key"
                :label="item.forum_label_name"
                :value="item.forum_label_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="publish_date" label="上传日期">
            <el-input v-model="forum.publish_date" placeholder="" :disabled="disabled"></el-input>
          </el-form-item>

          <el-form-item label="内容" class="clearfix">
            <div id="editorElem" style="text-align:left" class="clearfix" ref="content"></div>
            <!--<quill-editor v-else ref="myTextEditor" v-model="forum.content" :config="editorOption"></quill-editor>-->
          </el-form-item>
        </el-form>

        <div class="clearfix">
          <el-button type="primary" @click="sendForum" style="float: right">确定</el-button>
        </div>
      </div>

    </div>
    <foot></foot>
  </div>
</template>


<script>
  import Head from '../common/Head'
  import Foot from '../common/Foot'
  import E from 'wangeditor'

  export default {
    data() {
      return {
        typeList: [],
        forum: {},
        showHome: false,
        editorContent: '',
        disabled: true,
        editor: ''
      };
    },
    mounted() {
      let vm = this;
      vm.editor = new E('#editorElem');
      let day = new Date();

      vm.editor.customConfig.onchange = (html) => {
        vm.editorContent = html
      };
      vm.editor.create();
      vm.getForumType();

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }

      vm.forum.publish_date = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
    },
    methods: {
      getForumType() {
        let vm = this;

        vm.$ajax.post('/apis/forum/getLabels').then((res) => {
          if(res.data.state) {
            vm.typeList = res.data.list;
          }
        });
      },
      sendForum() {
        let vm = this;

        let text = document.getElementById('editorElem').innerText.replace(/^\s+|\s+$/g, '');

        if(!vm.forum.title || !vm.forum.forum_label_id || vm.forum.publish_date.length <= 0 || text.length <= 0) {
          vm.$message.error('请填写完整，不可为空');
          return;
        }

        if(text.length < 20) {
          vm.$message.error('帖子内容过少');
          return;
        }

        vm.forum.content = document.getElementById('editorElem').innerHTML;

        vm.$ajax.post('/apis/forum/addForum', {forum: vm.forum}).then((res) => {
          if(res.data.state) {
            setTimeout(() => {
              vm.$router.push({
                name: 'forum'
              })
            }, 500)
          }
        });
      }
    },
    components: {
      Head,
      Foot
    }
  }

</script>

<style scoped>
  @import "style.css";
</style>



