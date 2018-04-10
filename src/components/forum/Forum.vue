<template>
  <div>
    <Head activeIndex="5" :showHome='showHome'></Head>

    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>心理论坛</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="container-div">
        <div v-for="forum in forums" @click="toOneForum(forum.forum_id)" class="cursor forum-item clearfix">
          <div class="forum-outer">
            <h3><span class="mr10">{{'[ ' + typePane[forum.type - 1] + ' ]'}}</span> {{forum.title}}</h3>

            <div style="margin: 10px auto;">
              <i class="el-icon-edit mr10"></i><span class="mr30">{{forum.name}}</span>
              <i class="el-icon-date mr10"></i><span>{{forum.publish_date}}</span>
            </div>
            <p class="forum-item-p">
              {{forum.content.substring(0, 100) + '...'}}
            </p>
          </div>
        </div>

        <div class="mt25">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="pagination.total">
          </el-pagination>
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
    name: 'forum',
    data() {
      return {
        typePane: ['文字', '学习', '工作', '生活', '娱乐'],
        articles: [],
        pagination: {
          currentPage: 1,
        },
        flag: true,
        forums: [],
        showHome: false
      };
    },
    mounted() {
      let vm = this;

      vm.getArticles(1);
      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      getArticles(currentPage) {
        let vm = this;

        vm.$ajax.post('/apis/forum/getForums', {currentPage: currentPage}).then(function (res) {
          if(res.data.state) {
            vm.forums = res.data.forums;

            vm.pagination.total = res.data.total;
            vm.pagination.currentPage = currentPage;
          }else {
            //显示错误页面
          }
        });
      },
      handleCurrentChange(page) {
        let vm = this;

        vm.pagination.currentPage = page;
        vm.getArticles(page);
      },
      toOneForum(num) {
        this.$router.push({
          name: 'readForum',
          params: {
            forumId: num
          }
        })
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



