<template>
  <div>
    <Head activeIndex="5" :showHome='showHome'></Head>
    <div class="container" id="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>心理论坛</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="clearfix container-div">
        <h3>{{forum.title}}</h3>
        <div style="margin:20px auto">
          <i class="el-icon-edit"></i><span class="first-icon">{{forum.name}}</span>
          <i class=" el-icon-time"></i><span class="first-icon">{{forum.publish_date}}</span>
        </div>
        <div class="mb100">
          {{forum.content}}
        </div>

        <div clas="clearfix">
          <div class="comment-left">评论：</div>
          <div class="comment-right">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="message">
            </el-input>
            <div class="right-button">
              <el-button type="success" size="small" @click="submitArticleComment">提交</el-button>
            </div>
          </div>
        </div>

        <div class="clearfix comment-container">
          <div class="comment-item-outer" v-for="item in comments">
            <!--第一级评论-->
            <p class="first-level">
              <span class="first-level-name">{{item.name}}</span><br>
              <span class="first-level-content">{{item.content}}</span>
            </p>
            <div class="clearfix pl10 pr15">
              <div class="first-date">发表于{{item.comment_date}} </div>
              <div class="cursor more-level" @click="showInput(item.id)">回复({{item.childComments.length}}) </div>
            </div>

            <!--多级评论-->
            <div class="more-level-container" :ref="item.id">
              <div  v-for="child in item.childComments">
                <p class="more-level-comment">
                  <span class="more-level-name">{{child.userName1}}</span>
                  <span style="color: #000;">回复</span>
                  <span style="color: #BBB4C5;">{{child.userName2}}</span><br>
                  <span class="child-content">{{child.fml_content}}</span>
                </p>
                <div class="clearfix" style="padding: 10px 25px 10px 25px">
                  <div style="float: left;color: #999999;">发表于{{child.fml_comment_date}} </div>
                  <div class="cursor right" style="color: #21A88B;" @click="showInput(item.id + '' + child.id)">回复</div>
                </div>

                <div  style="display: none" :ref="item.id + '' + child.id">
                  <div style="padding: 10px 20px">
                    <el-input v-model="message" :placeholder="'回复 ' + child.userName1"></el-input>
                  </div>
                  <div class="submit-child-comment">
                    <el-button type="success" size="small" @click="submitCommit(child.user_one, child.comment_id)">提交</el-button>
                  </div>
                </div>
              </div>
              <div>
                <div style="padding: 10px 20px">
                  <el-input v-model="message" placeholder="请输入你的观点"></el-input>
                </div>
                <div class="submit-button">
                  <el-button type="success" size="small">提交</el-button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div style="margin-bottom: 80px"></div>
    </div>
    <foot></foot>

  </div>
</template>


<script>
  import Head from '../common/Head'
  import Foot from '../common/Foot'

  export default {
    data() {
      return {
        forumId: this.$route.params.forumId,
        forum: {},
        comments: [],
        message: '',
        showHome: false
      };
    },
    mounted() {
      let vm = this;

      vm.getForumById();
      vm.getCommentByArticleId();

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      getForumById() {
        let vm = this;

        vm.$ajax.post('/apis/forum/getForumByForumId', {forumId: vm.forumId}).then(function (res) {
          if(res.data.state) {
            vm.forum = res.data.forum;
          }else {
            //显示错误页面
          }
        });
      },
      getCommentByArticleId() {
        let vm = this;

        vm.$ajax.post('/apis/forum/getCommentByForumId', {forumId: vm.forumId}).then(function (res) {
          if(res.data.state) {
            vm.comments = res.data.comments;
          }else {
            //显示错误页面
          }
        });
      },
      showInput(id) {
        let vm = this;
        id = +id;

        let display = vm.$refs[id][0].style.display;

        if(display == 'none') {
          vm.$refs[id][0].style.display = 'block';
        }else {
          vm.$refs[id][0].style.display = 'none';
        }
      },
      submitCommit(userId2, commentId) {  //在commentId的下面当前登录用户给userName2的用户进行评论
        let vm = this;
        let usr = window.sessionStorage.getItem('usr');
        if(!usr) {
          vm.showErrMsg('请先登录');
          vm.message = '';
          return;
        }

        if(!vm.message) {
          vm.showErrMsg('评论内容不可为空');
          vm.message = '';
          return;
        }

        vm.$ajax.post('/apis/forum/commitUserComment', {message: vm.message, commentId: commentId, userId2: userId2}).then((res) => {
          vm.message = '';

          if(res.data.state) {
            vm.getCommentByArticleId();
          }
        });
      },
      submitArticleComment() {
        let vm = this;
        let usr = window.sessionStorage.getItem('usr');
        if(!usr) {
          vm.showErrMsg('请先登录');
          vm.message = '';
          return;
        }

        if(!vm.message) {
          vm.showErrMsg('评论内容不可为空');
          vm.message = '';
          return;
        }

        vm.$ajax.post('/apis/forum/commitForumComment', {
          forum_id: vm.forumId,
          message: vm.message
        }).then((res) => {
          vm.message = '';

          if(res.data.state) {
            vm.getCommentByArticleId();
          }
        });
      },
      showErrMsg(msg) {
        let vm = this;

        vm.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        });
      },
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



