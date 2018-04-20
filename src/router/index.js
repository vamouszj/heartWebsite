import Vue from 'vue'
import Router from 'vue-router'
import Head from '@/components/common/Head'
import Index from '@/components/index/Index'
import Article from '@/components/article/Article'
import ReadArticle from '@/components/article/ReadArticle'
import Music from '@/components/music/Music'
import PlayMusic from '@/components/music/PlayMusic'
import Test from '@/components/test/Test'
import Paper from '@/components/test/TestPaper'
import Forum from '@/components/forum/Forum'
import readForum from '@/components/forum/ReadForum'
import Home from '@/components/home/Home'
import AddForum from '@/components/forum/AddForum'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/article/:articleId',
      name: 'readArticle',
      component: ReadArticle
    },
    {
      path: '/music',
      name: 'music',
      component: Music
    },
    {
      path: '/play/:musicId',
      name: 'play',
      component: PlayMusic
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/paper/:paperId',
      name: 'testPaper',
      component: Paper
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/readForum/:forumId',
      name: 'readForum',
      component: readForum
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/addForum',
      name: 'addforum',
      component: AddForum
    }
  ]
})
