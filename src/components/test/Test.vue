<template>
  <div>
    <Head activeIndex="4" :showHome='showHome'></Head>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>心理测试</el-breadcrumb-item>
      </el-breadcrumb>

      <div style="margin-top: 20px; border: 1px solid #EDEDED;padding: 28px 6% 29px 6%;">
        <el-tabs v-model="activeTypeName" type="card"  @tab-click="changePaperByType">
          <el-tab-pane :label="pane.label" :name="pane.name" v-for="(pane, index) in typePane" :key="index">
            <div>
              <div v-for="paper in papers.leftPart" @click="toOneTest(paper.test_id)"
                   class="clearfix cursor left test-item">
                <div class="left border-right">
                  <img :src="paper.picture_addr" class="left-img">
                </div>

                <div class="item-content left">
                  <h5 class="item-test-name">{{paper.test_name}}</h5>
                  <i class="el-icon-view">{{paper.test_num}}</i>
                </div>
              </div>

              <div v-for="paper in papers.rightPart" @click="toOneTest(paper.test_id)"
                   class="clearfix test-item cursor left">
                <div style="float: left;border-right: 1px solid #EDEDED">
                  <img :src="paper.picture_addr" style="width: 140px;height: 110px;">
                </div>

                <div style="width: 40%;float: left;margin: 15px 40px;">
                  <h5 style="margin: 10px auto 20px auto">{{paper.test_name}}</h5>
                  <i class="el-icon-view">{{paper.test_num}}</i>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div style="margin-top: 25px">
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
    data() {
      return {
        activeTypeName: '1',
        typeHasChanged: false,
        typePane: [
          {
            label: '爱情测试',
            name: '1'
          },
          {
            label: '性格测试',
            name: '2'
          },
          {
            label: '能力测试',
            name: '3'
          },
          {
            label: '专业测试',
            name: '4'
          }
        ],
        papers: {
          leftPart: [],
          reightPart: []
        },
        pagination: {
          currentPage: 1,
          total: 0
        },
        flag: true,
        showHome: false
      };
    },
    mounted() {
      let vm = this;

      vm.getTests('1', 1);

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      //关于测试的话，每页为十条数据
      getTests(type, currentPage) {
        let vm = this;
        let obj = {};

        Object.assign(obj, {type: type}, {currentPage: currentPage});

        vm.$ajax.post('/apis/test/getTestPaperByType', obj).then(function (res) {
          if(res.data.state) {
            let len = res.data.papers.length;
            vm.papers.leftPart = res.data.papers.slice(0, len / 2);
            vm.papers.rightPart = res.data.papers.slice(len / 2, len);

            vm.pagination.total = res.data.total;
            vm.pagination.currentPage = currentPage;
          }else {
            //显示错误页面
          }
        });
      },
      changePaperByType() {
        let vm = this;
        vm.flag = false;  //不需要利用分页接口去请求数据

        vm.getTests(vm.activeTypeName, 1);
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
        vm.getTests(vm.activeTypeName, page);
      },
      toOneTest(num) {
        this.$router.push({
          name: 'testPaper',
          params: {
            paperId: num
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



