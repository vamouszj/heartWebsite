<template>
  <div>
    <Head activeIndex="2" :showHome='showHome'></Head>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>精品文章</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="container-div">
        <el-tabs v-model="activeTypeName" type="card"  @tab-click="changeArticleByType">
          <el-tab-pane :label="pane.label" :name="pane.name" v-for="(pane, index) in typePane" :key="index">
            <div v-for="article in articles" @click="toOneArticle(article.article_id)" class="clearfix cursor pane-div">
              <div class="left-part">
                <img :src="article.picture_addr" class="left-img">
              </div>

              <div class="right-part">
                <h3>{{article.title}}</h3>

                <div style="margin-top: 20px">
                  <i class="el-icon-time"></i><span class="first-icon">{{article.upload_date}}</span>
                  <i class="el-icon-view"></i><span class="second-icon">{{article.read_num}}</span>
                </div>
                <p style="" class="content-container">
                  {{article.description}}
                </p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div style="margin-top: 25px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizeArr"
            :page-size="pagination.currentPageSize"
            layout="total, sizes, prev, pager, next, jumper"
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
    data() {
      return {
        activeTypeName: '1',
        typeHasChanged: false,
        typePane: [
          {
            label: '情感',
            name: '1'
          },
          {
            label: '健康',
            name: '2'
          },
          {
            label: '职场',
            name: '3'
          },
          {
            label: '科普',
            name: '4'
          },
          {
            label: '成长',
            name: '5'
          },
        ],
        articles: [],
        pagination: {
          currentPage: 1,
          pageSizeArr: [10, 15, 20],
          currentPageSize: 10
        },
        flag: true,
        showHome: false
      };
    },
    mounted() {
      let vm = this;

      vm.getArticles('1', 1, 10);

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      getArticles(type, currentPage, currentPageSize) {
        let vm = this;
        let obj = {};

        Object.assign(obj, {type: type}, {currentPage: currentPage, currentPageSize: currentPageSize});

        vm.$ajax.post('/apis/article/getArticleByType', obj).then(function (res) {
          if(res.data.state) {
            vm.articles = res.data.articles;

            vm.pagination.total = res.data.total;
            vm.pagination.currentPage = currentPage;
          }else {
            //显示错误页面
          }
        });
      },
      changeArticleByType() {
        let vm = this;
        vm.flag = false;  //不需要利用分页接口去请求数据

        vm.getArticles(vm.activeTypeName, 1, 10);
      },
      handleSizeChange(size) {
        let vm = this;

        vm.pagination.currentPageSize = size;
        if(!vm.flag) {
          vm.flag = true;
          return;
        }

        vm.notChange = true;
        vm.getArticles(vm.activeTypeName, 1, size);
      },
      handleCurrentChange(page) {
        let vm = this;

        vm.pagination.currentPage = page;
        if(!vm.flag) {
          vm.flag = true;
          return;
        }

        if(vm.notChange) {
          vm.notChange = false;
          return;
        }
        vm.getArticles(vm.activeTypeName, page, vm.pagination.currentPageSize);
      },
      toOneArticle(num) {
        this.$router.push({
          name: 'readArticle',
          params: {
            articleId: num
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



