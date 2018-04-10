const Mock = require('mockjs')
const urls = {
  '/apis/article/getArticle': {
    'state': 1,
    'msg': '',
    'articles|3': [
      {
        'article_id|+100': 3456,
        'title': '@ctitle(10)',
        'upload_date': '@date("yyyy-MM-dd")',
        'type|1': [1, 2, 3],
        'author': '@ctitle(10)',
        'description': '@ctitle(100)',
        'content': '@ctitle(300)',
        'read_num|+100': 3445,
        'picture_addr|1': ['/static/img/index/pg1.jpg', '/static/img/index/pg2.jpg', '/static/img/index/pg3.jpg']
      }
    ],
  },
  '/apis/music/getMusic': {
    'state': 1,
    'msg': '',
    'musics|6': [
      {
        'music_id|+100': 3456,
        'name': '@ctitle(20)',
        'musician': '@ctitle(20)',
        'upload_date': '@date("yyyy-MM-dd")',
        'description': '@ctitle(100)',
        'type|1': [1, 2, 3],
        'play_num|+100': 3445,
        'img_addr|1': ['/static/img/music/mus1.jpg', '/static/img/music/mus2.jpg', '/static/img/music/mus3.jpg',
          '/static/img/music/mus4.jpg', '/static/img/music/mus5.jpg', '/static/img/music/mus6.jpg']
      }]
  },
  '/apis/test/getTestPage': {
    'state': 1,
    'msg': '',
    'testPages|3': [
      {
        'test_id|+100': 3456,
        'test_name': '@ctitle(20)',
        'type|1': [1, 2, 3],
        'test_num|+100': 3445,
        'picture_addr|1': ['/static/img/index/pg1.jpg', '/static/img/index/pg2.jpg', '/static/img/index/pg3.jpg']
      }
    ]
  },
  '/apis/user/checkUserAccount': {
    'state|1': [true, false],
    'msg': '成功'
  },
  '/apis/user/regist': {
    'state|1': [0, 1],
    'msg': '成功'
  },
  '/apis/user/login': {
    'state|1': [true, false],
    'msg': '成功'
  },
  '/apis/article/getArticleByType': {
    'state': 1,
    'msg': '',
    'articles|5': [
      {
        'article_id|+100': 8884,
        'title': '@ctitle(10)',
        'upload_date': '@date("yyyy-MM-dd")',
        'type|1': [1, 2, 3],
        'author': '@ctitle(10)',
        'description': '@ctitle(100)',
        'content': '@ctitle(300)',
        'read_num|+100': 5432,
        'picture_addr|1': ['/static/img/index/pg1.jpg', '/static/img/index/pg2.jpg', '/static/img/index/pg3.jpg']
      },
    ],
    total: 200,
    currentPage: 1
  },
  '/apis/article/getArticleById': {
    'state': 1,
    'msg': '',
    'article': {
        'article_id|+100': 8884,
        'title': '@ctitle(10)',
        'upload_date': '@date("yyyy-MM-dd")',
        'type|1': [1, 2, 3],
        'author': '@ctitle(10)',
        'content': '@ctitle(300)',
        'read_num|+100': 5432,
        'picture_addr|1': ['/static/img/index/pg1.jpg', '/static/img/index/pg2.jpg', '/static/img/index/pg3.jpg']
      }
  },
  '/apis/music/getMusicById': {
    'state': 1,
    'msg': '',
    'music': {
      'music_id|+1': 32164,
      'name': '@ctitle(15)',
      'musician': '@ctitle(20)',
      'upload_date': '@date("yyyy-MM-dd")',
      'description': '@ctitle(100)',
      'type|1': [1, 2, 3, 4, 5 ],
      'play_num': 8900,
      'img_addr|1': ['/static/img/music/imgPg1.jpg', '/static/img/music/imgPg2.jpg', '/static/img/music/imgPg3.jpg', '/static/img/music/imgPg4.jpg', '/static/img/music/imgPg5.jpg'],
      'save_addr|1': ['/static/song/周杰伦 - 稻香.mp3', '/static/song/张韶涵 - 淋雨一直走.mp3']
    }
  },
  '/apis/music/getMusicByType': {
    'state': 1,
    'msg': '',
    'musics|10': [
      {
        'music_id|+1': 32164,
        'name': '@ctitle(15)',
        'musician': '@ctitle(20)',
        'upload_date': '@date("yyyy-MM-dd")',
        'description': '@ctitle(100)',
        'type|1': [1, 2, 3, 4, 5 ],
        'play_num': 8900,
        'img_addr|1': ['/static/img/music/imgPg1.jpg', '/static/img/music/imgPg2.jpg', '/static/img/music/imgPg3.jpg', '/static/img/music/imgPg4.jpg', '/static/img/music/imgPg5.jpg'],
        'save_addr|1': ['/static/song/周杰伦 - 稻香.mp3', '/static/song/张韶涵 - 淋雨一直走.mp3']
      },
    ],
    total: 100,
    currentPage: 1
  },
  '/apis/test/getTestPaperByType': {
    'state': 1,
    'msg': '',
    'papers|10': [
      {
        'test_id|+1': 34567,
        'type': [1, 2, 3, 4],
        'test_name': '@ctitle(10)',
        'test_num|+100':  1000,
        'picture_addr|1': ['/static/img/music/imgPg1.jpg', '/static/img/music/imgPg2.jpg', '/static/img/music/imgPg3.jpg', '/static/img/music/imgPg4.jpg', '/static/img/music/imgPg5.jpg'],
      }
    ],
    'total': 200,
    'currentPage|+1': 1
  },
  '/apis/test/getTestPaperNameById': {
    'state': 1,
    'msg': '',
    'paper': {
        'test_name': '@ctitle(20)',
        'test_num|+100':  1000,
    }
  },
  '/apis/test/getQuestionByPaperId': {
    'state': 1,
    'msg': '',
    'questions|10': [
      {
        'title_id|+1': 3456,
        'test_id|+1': 34567,
        'title_name': '@ctitle(80)',
        'chooses|3-4': ['@ctitle(20)']
      }
    ]
  },
  '/apis/test/getResultByPaperId': {
    'state': 1,
    'msg': '',
    'answer': {
      'answer_id|+1': 3456,
      'test_id|+1': 34567,
      'result': '@ctitle(80)'
    }
  },
  '/apis/artile/getCommentByArticleId': {
    'state': 1,
    'msg': '',
    'comments|8': [
      {
        'id|+100': 3456,
        'name': '@ctitle(10)',
        'article_id|+100': 3334,
        'comment_date': '@date("yyyy-MM-dd")',
        'content': '@ctitle(100)',
        'childComments|4': [{
          'id|+8': 3456,
          'comment_id|+100': 3998,
          'userName1': '@ctitle(10)',   /*评论者（必须为名字）*/
          'userName2': '@ctitle(10)',    /*被评论者*/
          'user_one|+3': 33456,
          'user_two|+5': 42341,
          'aml_content': '@ctitle(30)',
          'aml_comment_date': '@date("yyyy-MM-dd")'
        }]
      }
    ]
  },
  '/apis/artile/commitArctiltComment': {
    'state': 1,
    'msg': ''
  },
  '/apis/artile/commitUserComment': {
    'state': 1,
    'msg': ''
  },
  '/apis/forum/getForums': {
    'state': 1,
    'msg': '',
    'forums|10': [
      {
        'forum_id|+100': 3456,
        'name': '@ctitle(10)',
        'publish_date': '@date("yyyy-MM-dd")',
        'type|1': [1, 2, 3, 4, 5],
        'title': '@ctitle(10)',
        'content': '@ctitle(300)'
      }
    ],
    total: 100,
    currentPage: 1
  },
  '/apis/forum/getForumByForumId': {
    'state': 1,
    'msg': '',
    'forum': {
      'forum_id|+100': 3456,
      'name': '@ctitle(10)',
      'publish_date': '@date("yyyy-MM-dd")',
      'type|1': [1, 2, 3, 4, 5],
      'title': '@ctitle(10)',
      'content': '@ctitle(300)'
    }
  },
  '/apis/forum/getCommentByForumId': {
    'state': 1,
    'msg': '',
    'comments|5': [
      {
        'id|+100': 3456,  /*一级评论Id*/
        'name': '@ctitle(10)',  /*用户名*/
        'forum_id|+100': 3334,
        'comment_date': '@date("yyyy-MM-dd")',
        'content': '@ctitle(100)',
        'childComments|4': [{
          'id|+8': 3456,
          'comment_id|+100': 3998,
          'userName1': '@ctitle(10)',   /*评论者（必须为名字）*/
          'userName2': '@ctitle(10)',    /*被评论者*/
          'user_one|+4': 33456,
          'user_two|+7': 45678,
          'fml_content': '@ctitle(30)',
          'fml_comment_date': '@date("yyyy-MM-dd")'
        }]
      }
    ]
  },
  '/apis/forum/commitForumComment': {
    'state': 1,
    'msg': ''
  },
  '/apis/forum/commitUserComment': {
    'state': 1,
    'msg': ''
  },
  '/apis/user/getUserInfo': {
    'state': 1,
    'msg': '',
    'user': {
      'user_id|+1': 13123,
      'account': '@ctitle(10)',
      'nickname': '@ctitle(10)',
      'sex|1': ['0', '1'],
      'birthday': '@date("yyyy-MM-dd")',
      'signature': '@ctitle(100)'
    }
  },
  '/apis/record/getTestRecord': {
    'state': 1,
    'msg': '',
    'records|5': [
      {
        'record_id|+1': 13123,
        'test_name': '@ctitle(20)',
        'test_result': '@ctitle(200)',
        'test_date': '@date("yyyy-MM-dd")'
      }
    ]
  },
  '/apis/user/changeUserInfo': {
    'state': 1,
    'msg': ''
  },
  '/apis/user/checkOldPassword': {
    'state': 1,
    'msg': ''
  },
  '/apis/user/checkPassword': {
    'state': 1,
    'msg': ''
  },
  '/apis/record/deleteRecord': {
    'state': 1,
    'msg': ''
  }

};



Mock.mock(/apis/, (req, res) => {
  let url = req.url;
  let keys = Object.keys(urls);

  // 如果给定的URL是存在的
  if(keys.includes(url)) {
    return Mock.mock(urls[url]);
  }

  // 如果给定的URL是不存在的
  // 按道理应该需要去到404页面
});
