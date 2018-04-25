<template>
  <div>
    <Head activeIndex="4" :showHome='showHome'></Head>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>精品文章</el-breadcrumb-item>
      </el-breadcrumb>

      <div v-show="!hasResult">
        <div style="margin-top: 20px; padding: 28px 6% 29px 6%;background: #F7F9F8;" class="clearfix">
          <h3 style="color: #336699;">{{paper.test_name}}</h3>
          <div style="margin:10px auto">
            <i class="el-icon-view"></i><span style="color: #999999;margin-left: 8px;margin-right: 15px">{{paper.test_num}}</span>
          </div>
          <p style="margin-top: 20px;float: left;color: #999999">目前第<b style="color: #63C9C2;margin:auto 10px">{{number}}</b>题，
            共<b style="color: #63C9C2;margin:auto 10px">{{questions.length}}</b>题</p>
        </div>

        <div class="question-item clearfix">
          <p>{{number + '. '}}{{questionObj.title_name}}</p>
          <div class="mt20 mb20" style="padding-left: 15px" v-for="(item, index) in questionObj.chooses">
            <el-radio v-model="choose" :label="labelAry[index]" @change="checkToNext">{{item}}</el-radio>
          </div>
        </div>

        <div v-show="showButton" style="margin-bottom: 50px">
          <p>
            <el-button @click="toPrev">上一题</el-button>
          </p>
        </div>
        <div v-show="showSubmit" style="margin-bottom: 50px">
          <p>
            <el-button type="primary" @click="submitResult">提交</el-button>
          </p>
        </div>
      </div>

      <div v-show="hasResult" style="margin: 25px auto">
        <div style="width: 98%;background: #FFF;border: 1px solid #EDEDED; border-radius: 10px;margin-top: 8px;" class="clearfix">
          <h4 style="color: #336699;width: 90%;padding: 20px 15px;text-align: left;border-bottom: 1px solid #EDEDED;margin:30px auto;">{{paper.test_name}}</h4>
          <div>
            <p style="color: #336699;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;">我的结果是：</p>
            <p style="color: #999999;width: 90%;padding: 10px 15px 30px 15px;text-align: left;margin:5px auto;">{{answer.result}}</p>
            <p style="color: #F3C100;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;">推荐您使用下面的方式缓解您目前的情况</p>

            <div style="color: #999999;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;">
              <div class="more cursor" style="color: #409EFF;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;" @click="toMorePage('article')">阅读文章：</div>
              <ul class="list-item">
                <li v-for="item in articles" class="cursor" @click="toOneArticle(item.article_id)">
                  <img :src="item.picture_addr" style="width: 150px;height: 140px">
                  <div style="color: #000;font-size: 13px">{{item.title}}</div>
                </li>
              </ul>
            </div>

            <div style="color: #999999;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;">
              <div class="more cursor" style="color: #409EFF;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;" @click="toMorePage('music')">听音乐：</div>
              <ul class="list-item">
                <li v-for="item in musics" class="cursor" @click="toOneMusic(item.music_id)">
                  <img :src="item.img_addr" style="width: 150px;height: 140px">
                  <div style="color: #000;font-size: 13px">{{item.name}}</div>
                </li>
              </ul>
            </div>

            <div style="color: #999999;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;">
              <div class="more cursor" style="color: #409EFF;width: 90%;padding: 10px 15px;text-align: left;margin:5px auto;" @click="toMorePage('forum')">查看帖子：</div>
              <ul class="list-item-forum" >
                <li v-for="item in forums" class="cursor" @click="toOneForum(item.forum_id)">
                  <div>{{item.title}}</div>
                </li>
              </ul>
            </div>
          </div>

          <div style="margin: 30px auto 40px auto;">
            <el-button type="success" @click="toTest">测试更多</el-button>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>


<script>
  import Head from '../common/Head'
  import Foot from '../common/Foot'

  export default {
    name: 'testPaper',
    data() {
      return {
        labelAry: [10, 9, 7, 5],
        number: 1,
        showButton: false,
        showSubmit: false,
        choose: '',
        score: 0,
        paperId: this.$route.params.paperId,
        questions: [],
        paper: {},
        questionObj: {},
        answer: {},
        hasResult: false,
        resultAry: [],
        showHome: false,
        articles: [],
        musics: [],
        forums: []
      };
    },
    mounted() {
      let vm = this;
      vm.getArticlesByType();

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;

      }
    },
    methods: {
      getArticlesByType() {
        let vm = this;

        vm.$ajax.post('/apis/test/getTestPaperNameById', {paperId: vm.paperId}).then(function (res) {
          if(res.data.state) {
            vm.paper = res.data.paper;
          }else {
            //显示错误页面
          }
        });

        vm.$ajax.post('/apis/test/getQuestionByPaperId', {paperId: vm.paperId}).then(function (res) {
          if(res.data.state) {
            vm.questions = res.data.questions;
            vm.questionObj = vm.questions[0];
          }else {
            //显示错误页面
          }
        });
      },
      checkToNext(val) {
        let vm = this;

        vm.score += +val;
        vm.resultAry[vm.number-1] = val;
        vm.showButton = true;

        //得到下一道题,当题目不够的时候，不能去给questionObj赋值
        if(vm.questions.length <= vm.number) {
          vm.showButton = false;
          vm.showSubmit = true;
        }else {
          setTimeout(function() {
            vm.questionObj = vm.questions[vm.number];
            vm.choose = vm.resultAry[vm.number] ? vm.resultAry[vm.number] : '';
            vm.number++;
          }, 300);
        }
      },
      submitResult() {
        let vm = this;

        vm.$ajax.post('/apis/test/getResultByPaperId', {paperId: vm.paperId, score: vm.score}).then(function (res) {
          if(res.data.state) {
            vm.answer = res.data.answer;
            vm.articles = res.data.articles;
            vm.musics = res.data.musics;
            vm.forums = res.data.forums;
            vm.hasResult = true;
          }else {
            //显示错误页面
          }
        });
      },
      toTest() {
        this.$router.push({
          name: 'test'
        });
      },
      toPrev() {
        let vm = this;

        if(vm.number <= 1) {
          return;
        }

        if(vm.number <= 2) {
          vm.showButton = false;
        }
        vm.number--;
        vm.choose = vm.resultAry[vm.number-1];
        vm.questionObj = vm.questions[vm.number];
        vm.score -= vm.choose;
      },
      toMorePage(router) {
        this.$router.push({
          name: router,
        });
      },
      toOneArticle(num) {
        this.$router.push({
          name: 'readArticle',
          params: {
            articleId: num
          }
        })
      },
      toOneMusic(num) {
        window.open('http://localhost:8888/#/play/' + num, '_blank');
      },
      toOneForum(num) {
        this.$router.push({
          name: 'readForum',
          params: {
            forumId: num
          }
        })
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
  .container {
    width: 85%;
    margin: 20px auto;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .list-item, .list-item-forum {
    width: 100%;
    list-style-type: none;
    display: inline-block;
    margin-left: 50px;
  }
  .list-item li {
    float: left;
    width: 19%;
    margin: 5px 20px;
  }
  .list-item-forum li {
    font-size: 20px;
    font-weight: 500;
    color: #a2a9cc;
    margin: 10px 80px;

  }
</style>



