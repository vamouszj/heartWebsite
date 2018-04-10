<template>
  <div>
    <Head activeIndex="3" :showHome='showHome'></Head>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>倾心之音</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="container-div">
        <el-tabs v-model="activeTypeName" type="card"  @tab-click="changeMusicByType">
          <el-tab-pane :label="pane.label" :name="pane.name" v-for="(pane, index) in typePane" :key="index">
            <div>
              <div v-for="music in music.leftPart" @click="toOneMusic(music.music_id)"
                   class="cursor music-item clearfix">
                <div class="left-img-border">
                  <img :src="music.img_addr" class="left-img">
                </div>

                <div class="music-item-name">
                  <h5>{{music.name}}</h5>
                </div>
                <div class="music-item-musican">
                  <h5>{{music.musician}}</h5>
                </div>
              </div>

              <div v-for="music in music.rightPart" @click="toOneMusic(music.music_id)"
                    class="clearfix cursor music-item left">
                <div class="left-img-border">
                  <img :src="music.img_addr" class="left-img">
                </div>

                <div class="music-item-name">
                  <h5>{{music.name}}</h5>
                </div>
                <div class="music-item-musican">
                  <h5>{{music.musician}}</h5>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

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
    data() {
      return {
        activeTypeName: '1',
        typeHasChanged: false,
        typePane: [
          {
            label: '轻音乐',
            name: '1'
          },
          {
            label: '古典',
            name: '2'
          },
          {
            label: '古风',
            name: '3'
          }
        ],
        music: {
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

      vm.getMusics('1', 1);

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      //关于音乐的话，每页为十条数据
      getMusics(type, currentPage) {
        let vm = this;
        let obj = {};

        Object.assign(obj, {type: type}, {currentPage: currentPage});

        vm.$ajax.post('/apis/music/getMusicByType', obj).then(function (res) {
          if(res.data.musics) {
            let len = res.data.musics.length;
            vm.music.leftPart = res.data.musics.slice(0, len / 2);
            vm.music.rightPart = res.data.musics.slice(len / 2, len);

            vm.pagination.total = res.data.total;
            vm.pagination.currentPage = currentPage;
          }else {
            //显示错误页面
          }
        });
      },
      changeMusicByType() {
        let vm = this;
        vm.flag = false;  //不需要利用分页接口去请求数据

        vm.getMusics(vm.activeTypeName, 1);
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
        vm.getMusics(vm.activeTypeName, page);
      },
      toOneMusic(num) {
        window.open('http://localhost:8080/#/play/' + num, '_blank');
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



