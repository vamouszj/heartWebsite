<template>
  <div>
    <Head activeIndex="2" :showHome='showHome'></Head>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>精品文章</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="clearfix container-div" >
          <h3>{{article.title}}</h3>
        <div style="margin:20px auto">
          <i class="el-icon-time"></i><span class="first-icon">{{article.upload_date}}</span>
          <i class="el-icon-view"></i><span class="first-icon">{{article.read_num}}</span>
          <span class="cursor second-icon copyBtn" :data-clipboard-text="url"><i class="el-icon-share"></i></span>
        </div>
        <div style="margin-bottom: 100px" v-html="article.content">
        </div>

        <div clas="clearfix">
          <div style="float: left; width: 7%;">评论：</div>
          <div style="float: left; width: 92%;">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="message">
            </el-input>
            <div style="margin: 10px auto; text-align: right">
              <el-button type="success" size="small" @click="submitArticleComment">提交</el-button>
            </div>
          </div>
        </div>


        <div class="clearfix comment-container">
          <div style="margin: 8px auto;" v-for="item in comments">
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
                  <span class="child-content">{{child.aml_content}}</span>
                </p>
                <div class="clearfix" style="padding: 10px 25px 10px 25px">
                  <div style="float: left;color: #999999;">发表于{{child.aml_comment_date}} </div>
                  <div class="cursor right" style="color: #21A88B;" @click="showInput(item.id + '' + child.id)">回复</div>
                </div>

                <div  class="display-none" :ref="item.id + '' + child.id">
                  <div style="padding: 10px 20px">
                    <input class="text" :ref="item.id + '*' + child.id" :placeholder="'回复 ' + child.userName1"></input>
                  </div>
                  <div class="submit-child-comment">
                    <el-button type="success" size="small" @click="submitCommit(child.user_one, item.id, item.id + '*' + child.id)">
                      提交
                    </el-button>
                  </div>
                </div>
              </div>
              <div>
                <div style="padding: 10px 20px">
                  <input class="text" placeholder="请输入你的观点" :ref="'*' + item.id"></input>
                </div>
                <div class="submit-button">
                  <el-button type="success" size="small" @click="submitCommit(item.user_id, item.id, '*' + item.id)">提交</el-button>
                </div>
              </div>
            </div>


            <div class="bottom-border"></div>
          </div>
        </div>
      </div>

      <div class="mb80"></div>
    </div>

    <foot></foot>
  </div>
</template>


<script>
  import Head from '../common/Head'
  import Foot from '../common/Foot'
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        articleId: this.$route.params.articleId,
        article: '',
        comments: [],
        message: '',
        showHome: false,
        url: ''
      };
    },
    mounted() {
      let vm = this;
      vm.getArticlesById();
      vm.getCommentByArticleId();
      let clipboard = new Clipboard('.copyBtn');
      vm.url ='http://localhost:8888/#/article/' + vm.articleId;

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      getArticlesById() {
        let vm = this;

        vm.$ajax.post('/apis/article/getArticleById', {articleId: vm.articleId}).then(function (res) {
          if(res.data.state) {
            vm.article = res.data.article;
          }else {
            //显示错误页面
          }
        });
      },
      getCommentByArticleId() {
        let vm = this;

        vm.$ajax.post('/apis/article/getCommentByArticleId', {articleId: vm.articleId}).then(function (res) {
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
      submitCommit(userId2, commentId, msgRef) {  //在commentId的下面当前登录用户给userName2的用户进行评论
        let vm = this;

        let usr = window.sessionStorage.getItem('usr');
        if(!usr) {
          vm.showErrMsg('请先登录');
          vm.$refs[msgRef][0].value = '';
          return;
        }

        vm.$nextTick(() => {
          if(!vm.$refs[msgRef][0].value) {
            vm.showErrMsg('评论内容不可为空');
            vm.$refs[msgRef][0].value = '';
            return;
          }


          vm.$ajax.post('/apis/article/commitUserComment', {
            message: vm.$refs[msgRef][0].value,
            commentId: commentId,
            userId2: userId2
          }).then((res) => {
            vm.$refs[msgRef][0].value = '';

            if(res.data.state) {
              vm.getCommentByArticleId();
            }
          });
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

        vm.$ajax.post('/apis/article/commitArticleComment', {
          articleId: vm.articleId,
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



