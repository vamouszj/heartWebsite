<template>
  <div>
    <div ref="bgImage" class="bgImage"></div>
    <div class="logo"></div>
    <div class="content">
      <h2 class="music-name">{{music.name}}</h2>
      <div>
        <span class="singer">{{music.musician}}</span>
        <p class="description-param">{{music.description}}</p>
      </div>
      <div class="playWrap">
        <audio :src="music.save_addr" ref="audio" autobuffer autoloop @durationchange="changeDuration"></audio>
        <a href="#" id="prebtn" class="pre" @click="prevMusic"></a>
        <a href="#" ref="playBtn" class="pause" @click="playMusic"></a>
        <a href="#" id="nextbtn" class="next" @click="nextMusic"></a>
        <!-- 进度条 -->
        <div ref="process" class="process">
          <span ref="ped" class="pr_played" style="width: 0%;"></span>
          <span href="#" ref="ptn" class="pr_btn" draggable="true" style="left: 0%;"  @mousedown="controlMouseDown"></span>
        </div>
        <span id="timeShow" class="time">{{time}}</span>
      </div>
      <div class="btns">
        <!--<a href="#" class="comment">评论</a>-->
        <a href="#" class="collect">已听({{music.play_num}})</a>
        <a href="#" class="share">分享</a>
        <a :href="music.save_addr" :download="music.save_addr" id="down" class="download">下载</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "play",
        data() {
          return {
            musicId: this.$route.params.musicId,  //根据URL的params得到ID值，根据ID值得到music的信息
            music: {},
            timeNow: 0,
            timeDuration: 0,
            time: ''
          }
        },
        mounted() {
          let vm = this;
          vm.addEventListeners();

          vm.getMusic({musicId: vm.musicId});
        },
        beforeDestroyed() {
          this.removeEventListeners()
        },
      methods: {
          changeDuration() {
            this.timeDuration = this.$refs.duration;
          },
          addEventListeners() {
            const self = this;
            self.$refs.audio.addEventListener('canplay', self._durationTime);
            self.$refs.audio.addEventListener('timeupdate', self._currentTime);
          },
          removeEventListeners () {
            const self = this;
            self.$refs.audio.removeEventListener('timeupdate', self._currentTime)
            self.$refs.audio.removeEventListener('canplay', self._durationTime)
          },
          _currentTime() {
            const self = this;
            self.timeNow = parseInt(self.$refs.audio.currentTime)
          },
          _durationTime() {
            const self = this;
            self.timeDuration = parseInt(self.$refs.audio.duration)
          },
          getMusic(params) {
            let vm = this;
            vm.music = {};

            vm.music.save_addr = '';
            vm.$ajax.post('/apis/music/getMusicById', params).then(function (res) {
              if(res.data.state) {
                vm.music = res.data.music;

                vm.$nextTick(function() {
                  vm.timeNow = 0;
                  vm.timeDuration = 0;
                  vm.playMusic();
                  vm.$refs.bgImage.style.background = 'url(' + vm.music.img_addr + ')';
                });
              }else {
                //显示错误页面
              }
            });
          },
          playMusic() {
            let vm = this;
            let audio = vm.$refs.audio;
            let playBtn = vm.$refs.playBtn;

            if(playBtn.className == 'play') {
              playBtn.className = 'pause';
              audio.pause();
            }else {
              playBtn.className = 'play';
              audio.play();
            }

            vm.timePass();
          },
          prevMusic() {
            let vm = this;
            let audio = vm.$refs.audio;

            vm.playMusic();
            //根据当前的歌曲ID得到前一首歌曲信息
            vm.getMusic({musicId: vm.musicId, prev: true});
          },
          nextMusic() {
            let vm = this;
            let audio = vm.$refs.audio;

            //根据当前的歌曲ID得到前一首歌曲信息
            vm.playMusic();
            vm.getMusic({musicId: vm.musicId, next: true});
          },
          controlMouseDown(event) {
            event = event || window.event;
            let vm = this;

            let target = event.target;
            let x = event.clientX;   //刚开始点击播放按钮时播放按钮距离左端的距离
            let l = target.offsetLeft;
            let process = vm.$refs.process;
            let maxLength = process.offsetWidth - target.offsetWidth; //播放的点可移动的最大距离范围

            document.onmousemove = function(ev) {
              let Dx = (ev || window.event).clientX;
              let newPro = Math.min(maxLength, Math.max(0, 1 + (Dx - x)));
              let processLength = process.offsetWidth;
              let currentScale = newPro / processLength;
              let playBtn = vm.$refs.playBtn;
              let audio = vm.$refs.audio;

              audio.currentTime = currentScale * vm.timeDuration;

              if(playBtn.className == 'pause') {
                playBtn.className = 'play';
              }

              //audio.play();
              vm.timePass();
            }

            document.onmouseup = function() {
              document.onmousemove = null;
              document.onmouseup = null;
            }
          },
          timePass() {
            let vm = this;
            let processYet = parseInt((vm.timeNow / vm.timeDuration) * 100);
            let timer = null;
            let audio = vm.$refs.audio;
            let playBtn = vm.$refs.playBtn;
            let currentTime = vm.timeDispose(vm.timeNow);
            let timeAll = vm.timeDispose(vm.timeDuration);

            vm.$nextTick(function() {
              vm.$refs.ped.style.width = processYet + '%';
              vm.$refs.ptn.style.left = processYet + '%';
            });

            vm.time = currentTime + " | " + timeAll;
            timer = setTimeout(vm.timePass, 1000);

            if(audio.timeNow == vm.timeDuration) {
              playBtn.className = 'pause';
              clearTimeout(timer);
            }

          },
          timeDispose(number) {
            if(isNaN(number)) {
              return "00:00";
            }else {
              var minute = parseInt(number / 60);
              var second = parseInt(number % 60);

              minute = minute >= 10 ? minute : "0" + minute;
              second = second >= 10 ? second :"0" + second;

              return minute + ":" + second;
            }
          }
        }
    }
</script>

<style scoped>
  @import "style.css";
  *{
    margin: 0;
    padding: 0;
  }
</style>
