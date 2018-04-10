<template>
  <div>
    <Head activeIndex="1" :showHome='showHome'></Head>
    <div>
      <p class="slideShine header-text">谢谢曾经一直陪伴着自己的，那个了不起的自己</p>
      <p class="masked header-text-bottom">—— 未来，你好</p>
      <img src="../../assets/img/pg4-copy.jpg" style="width: 100%;"/>
    </div>
    <div class="article">
      <p class="head">精品文章</p>
      <p class="describe">文字，可以让你舒缓心情，感受温暖，简单而又朴实的文字，告诉你，生活原来如此美好</p>
      <div class="clearfix box">
        <div class="inline-item first cursor" v-for="(item, index) in articles" @click="toOneArticle(item.article_id)">
          <img :src="item.picture_addr" class="article-img">
          <h3 style="">{{item.title}}</h3>
          <div class="w100">
            <p class="article-desc">{{item.description.substring(0, 75) + '...'}}</p>
          </div>
        </div>
      </div>
      <div class="mt20">
        <p class="more more-style cursor" @click="toMorePage('article')">查看更多&nbsp;>> </p>
      </div>
    </div>

    <div class="music">
      <p class="head">倾心之音</p>
      <p class="describe">一段段清新，明朗的旋律，各种独特的情调，不庸俗，不烦躁，在安静的小角落，聆听微风拂面的声音，清新的治愈系歌曲会给你累透了的心灵重新赋予生命</p>
      <section class="recent-works">
        <div style="margin: 10px auto">
          <div v-for="(item, index) in musics" style="width: 30%;display: inline-block">
            <div class="recent-work-wrap">
              <div>
                <img :src="item.img_addr">
                <div class="overlay"  @click="toOneMusic(item.music_id)">
                  <div class="recent-work-inner">
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                    <span class="symbol"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt20">
            <p class="more more-style cursor" @click="toMorePage('music')">更多音乐&nbsp;>> </p>
          </div>
        </div>
      </section>
    </div>


    <div class="test">
      <p class="head">心理测试</p>
      <p class="describe">在这里，可以找到自己的缩影，探测你内心的世界，打开你的新世界</p>
      <div class="clearfix box">
        <div class="inline-item-low cursor" v-for="item in testPages" @click="toOneTest(item.test_id)">
          <img :src="item.picture_addr" style="width: 80%; height: 250px; background: #FFF;margin-top: 25px;">
          <p class="test-item-name">{{item.test_name}}</p>
        </div>
      </div>
      <div class="mt10 ml10">
        <p class="more more-style cursor" @click="toMorePage('test')">更多测试&nbsp;>> </p>
      </div>
    </div>

    <div class="forum mt30">
      <section class="partner">
        <div>
          <h2 class="head pt40">心理论坛</h2>
          <p class="describe">心里有心事或者有秘密想要说，而又不无处诉说吗？有烦心事无法释怀或是想大声呐喊出自己心里的想法吗？或者想说说心里话吗？来这里就对了，在这里，你既是倾诉者，也是倾听者.</p>
          <div class="enter mt15">
            <p class="enter-forum cursor" @click="toMorePage('forum')">进入论坛</p>
          </div>
        </div>
      </section>
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
        activeIndex: '1',
        articles: [],
        musics: [],
        testPages: [],
        showHome: false
      };
    },
    mounted() {
      let vm = this;

      vm.getArticles();
      vm.getMusics();
      vm.getTestPage();

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;
      }
    },
    methods: {
      // 得到文章中的三篇
      getArticles() {
        let vm = this;

        vm.$ajax.post('/apis/article/getArticle', {num: 3}).then(function (res) {
          if(res.data.state) {
            vm.articles = res.data.articles;
          }else {
            //显示错误页面
          }
        });
      },
      getMusics() {
        let vm = this;

        vm.$ajax.post('/apis/music/getMusic', {num: 6}).then(function (res) {
          if(res.data.state) {
            vm.musics = res.data.musics;
          }else {
            //显示错误页面
          }
        });
      },
      getTestPage() {
        let vm = this;

        vm.$ajax.post('/apis/test/getTestPage', {num: 3}).then(function (res) {
          if (res.data.state) {
            vm.testPages = res.data.testPages;
          } else {
            //显示错误页面
          }
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
        window.open('http://localhost:8080/#/play/' + num, '_blank');
      },
      toOneTest(num) {
        this.$router.push({
          name: 'testPaper',
          params: {
            paperId: num
          }
        })
      },
      toMorePage(router) {
        this.$router.push({
          name: router,
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



