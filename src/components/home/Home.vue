<template>
  <div>
    <Head activeIndex="6" :showHome='showHome'></Head>
    <div class="bg">
      <div class="container" style="margin-bottom: 50px">
        <div style="padding: 10px 15px;background: rgba(251, 251, 251, 0.9);">
          <p style="text-align: left;font-weight: normal;font-style: normal;font-family: Microsoft YaHei;color: #333333;
          font-size: 24px;vertical-align: bottom;margin-bottom: 5px">个人信息
          </p>
          <div style="width: 96px;height: 3px;background: dodgerblue;"></div>
          <div style="width: 100%;margin: 10px auto;">
            <ul style="list-style-type: none;padding: 0;margin: 0;">
              <li style="width: 40%;padding: 10px auto;text-align: left">
                <div style="width: 30%;letter-spacing: 46px;display:inline-block;text-align: left">账号</div><span style="margin-left: -12%">：</span>
                <div style="margin-left: 5%;display:inline-block;">{{user.account}}</div>
              </li>
              <li style="width: 40%;padding: 10px 5px;text-align: left">
                <div style="width: 30%;letter-spacing: 40px;display:inline-block;text-align: left">昵称</div><span style="margin-left: -12%">：</span>
                <div style="margin-left: 5%;display:inline-block;">{{user.nickname}}</div>
              </li>

              <li style="width: 40%;padding: 10px auto;text-align: left">
                <div style="width: 30%;letter-spacing: 4px;display:inline-block;text-align: left">出生日期</div><span style="margin-left: -12%">：</span>
                <div style="margin-left: 5%;display:inline-block;">{{user.birthday}}</div>
              </li>
              <li style="width: 40%;padding: 10px 5px;text-align: left">
                <div style="width: 30%;letter-spacing: 40px;display:inline-block;text-align: left">性别</div><span style="margin-left: -12%">：</span>
                <div style="margin-left: 5%;display:inline-block;">{{user.sex ? '男' : '女'}}</div>
              </li>
              <li style="width: 100%;padding: 10px 20px;text-align: left;margin-left: 7.2%">
                <div class="clearfix">
                  <div style="letter-spacing: 5px;display:inline-block;width: 11%;">个性签名：</div>
                  <div style="line-height: 24px;display:inline-block;width: 74%;text-align: left;">{{user.signature}}</div>
                </div>
              </li>
              <li style="width: 100%;padding: 10px 20px;text-align: left;margin-left: 6.7%">
                <el-button round size="small" @click="dialogChangeInfoVisible=!dialogChangeInfoVisible">修改信息</el-button>
                <el-button round type="primary" size="small" @click="dialogChangePassVisible=!dialogChangePassVisible">修改密码</el-button>
              </li>
            </ul>
          </div>
        </div>
        <div style="padding: 10px 15px;background: rgba(251, 251, 251, 0.9);">
          <p style="text-align: left;font-weight: normal;font-style: normal;font-family: Microsoft YaHei;color: #333333;
          font-size: 24px;vertical-align: bottom;margin-bottom: 5px">测试记录
          </p>
          <div style="width: 96px;height: 3px;background: dodgerblue;"></div>
          <div style="width: 100%;margin: 10px auto;" class="clearfix">
            <div style="width: 90%;height: 200px;margin: 10px auto" v-for="record in records" class="clearfix">
              <div style="font-family: Garamond;font-size: 30px;color: #666666;text-align: left;padding: 10px 20px;">
                {{record.test_date}}
                <div style="border: 1px solid #EDEDED;"></div>
              </div>
              <div class="clearfix">
                <div style="width: 84%;float: right;text-align: left;font-family: 'Microsoft Yahei';color: #333333;">
                  <P style="margin: 5px auto 10px auto;color: #66b1ff;font-size: 18px;">{{record.test_name}}</P>
                  <p style="color: #999999;font-size: 16px">{{record.test_result}}</p>
                  <div class="clearfix" @click="deleteRecord(record.record_id)">
                    <span style="display:block;float: right;margin-right:30px;color: dodgerblue;font-size: 14px;line-height: 45px;cursor: pointer;">删除</span>
                  </div><br>
                </div>
              </div>

            </div>
          </div>
        </div>


        <el-dialog title="修改个人信息" :visible.sync="dialogChangeInfoVisible" width="37%">
          <el-form :model="oldUserInfo" style="margin-left: -40px;">
            <el-form-item label="账号" label-width="120px">
              <el-input v-model="oldUserInfo.account"
                        disabled
                        auto-complete="off"
                        placeholder="账号最多为12位">
              </el-input>
            </el-form-item>
            <el-form-item label="昵称" label-width="120px">
              <el-input v-model="oldUserInfo.nickname"
                        auto-complete="off"
                        placeholder="昵称最多为12位"
                        clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="性别" label-width="120px">
              <el-radio style="margin-left: -50%;" v-model="oldUserInfo.sex" label="0" selected>男</el-radio>
              <el-radio style="" v-model="oldUserInfo.sex" label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="出生年月" label-width="120px">
              <el-date-picker
                style="width: 98%;margin-left: -3.6%"
                v-model="oldUserInfo.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="个性签名" label-width="120px">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="oldUserInfo.signature">
              </el-input>
            </el-form-item>
          </el-form>


          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChangeInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeCheck">确定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="dialogChangePassVisible" width="37%">
          <el-form :model="password" style="margin-left: -40px;">
            <el-form-item label="密码" label-width="120px">
              <el-input type="password"
                        v-model="password.oldPassword"
                        @change="isRightPassword"
                        placeholder="请输入密码"
                        auto-complete="off" clearable ref="pass">
              </el-input>
            </el-form-item>
            <el-form-item label="新密码" label-width="120px">
              <el-input type="password"
                        v-model="password.newPassword"
                        @change="checkNewPassword"
                        placeholder="请输入密码"
                        auto-complete="off" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="120px">
              <el-input type="password"
                        v-model="password.rePassword"
                        @change="checkRePassword"
                        placeholder="请输入密码"
                        auto-complete="off" clearable>
              </el-input>
            </el-form-item>
          </el-form>


          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChangeInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkPassword">确定</el-button>
          </div>
        </el-dialog>
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
        user: '',
        oldUserInfo: {},
        records: [],
        dialogChangeInfoVisible: false,
        dialogChangePassVisible: false,
        password: {},
        isTrue: false,
        showHome: false
      }
    },
    mounted() {
      let vm = this;
      vm.getUserInfo();
      vm.getTestRecord();

      if(window.sessionStorage.getItem('usr')) {
        vm.showHome = true;
      }else {
        vm.showHome = false;

        vm.$router.push({
          name: 'index'
        })
      }
    },
    methods: {
      getUserInfo() {
        let vm = this;

        vm.$ajax.post('/apis/user/getUserInfo').then(function (res) {
          if(res.data.state) {
            vm.user = res.data.user;
            vm.oldUserInfo = vm.clone(vm.user);
          }else {
            //显示错误页面
          }
        });
      },
      getTestRecord() {
        let vm = this;

        vm.$ajax.post('/apis/record/getTestRecord').then(function (res) {
          if(res.data.state) {
            vm.records = res.data.records;
          }else {
            //显示错误页面
          }
        });
      },
      changeCheck() {
        let vm = this;

        if(vm.user.nickname.length <= 0 || vm.user.birthday.length <= 0) {
          vm.showErrMsg('昵称或出生日期不可为空');
          return;
        }

        if(vm.user.nickname.length > 12) {
          vm.showErrMsg('昵称不能超过12位');
          return;
        }

        if(vm.user.signature.length > 200) {
          vm.showErrMsg('签名字数过多');
          return;
        }

        vm.$ajax.post('/apis/user/changeUserInfo', vm.oldUserInfo).then(function (res) {
          if(res.data.state) {
            vm.showSuccessMsg('信息修改成功');
            vm.getUserInfo();
          }else {
            vm.showErrMsg('信息修改失败，请稍后重试');
          }
        });

        vm.dialogChangeInfoVisible = false;
      },
      checkNewPassword() {
        let vm = this;

        if(vm.password.newPassword.length < 6) {
          vm.showErrMsg('密码过短，请重新输入');
          return;
        }

        if(vm.password.newPassword.length > 15) {
          vm.showErrMsg('密码过长，请重新输入');
          return;
        }
      },
      checkRePassword() {
        let vm = this;

        vm.checkNewPassword();
        if(vm.password.rePassword != vm.password.newPassword) {
          vm.showErrMsg('两次密码不一致');
          return;
        }
      },
      checkPassword() {
        let vm = this;

        vm.isRightPassword();
        vm.checkRePassword();

        vm.$ajax.post('/apis/user/checkPassword', vm.password).then((res) => {
          if(res.data.state) {
            vm.showSuccessMsg('密码修改成功');

            window.sessionStorage.removeItem('usr');
            vm.$router.push({
              name: 'index'
            })
          }else {
            vm.showErrMsg('密码修改失败');
          }
        });
      },
      isRightPassword() {
        let vm = this;

        vm.$ajax.post('/apis/user/checkOldPassword', {password: vm.password.oldPassword}).then((res) => {
          if(!res.data.state) {
            vm.$refs.pass.focus();
            vm.showErrMsg('密码不正确，请重新输入');
          }else {
            vm.isTrue = true;
          }
        });
      },
      deleteRecord(id) {
        let vm = this;

        vm.$ajax.post('/apis/record/deleteRecord', {id: id}).then((res) => {
          if(res.data.state) {
            vm.getTestRecord();
          }
        });
      },
      showErrMsg(msg) {
        let vm = this;

        vm.$notify.error({
          title: '提示',
          message: msg,
          duration: 3000
        });
      },
      showSuccessMsg(msg) {
        let vm = this;

        vm.$notify({
          title: '成功',
          message: msg,
          type: 'success'
        });
      },
      clone(parent) {
        let vm = this;
        if(Array.isArray(parent)) {
          let ary = [];
          for(let i = 0; i < parent.length; i++) {
            if(typeof parent[i] == 'object' || typeof parent[i] == 'function') {
              ary.push(vm.vm.clone(parent[i]));
            }else {
              ary.push(parent[i]);
            }
          }

          return ary;

        }else if(typeof parent == 'object') {
          let o = {};

          for(let item in parent) {
            if(typeof parent[item] == 'object' || typeof parent[item] == 'function') {
              o[item] = vm.clone(parent[item]);
            }else {
              o[item] = parent[item];
            }
          }

          return o;
        }else if(typeof parent == 'function') {
          let fun = new Function();

          for(let item in parent) {
            if(typeof parent[item] == 'object') {
              fun[item] = vm.clone(parent[item]);
            }else {
              fun[item] = parent[item];
            }
          }

          return fun;
        }else {
          return parent;
        }
      }
    },
    components: {
      Head,
      Foot
    }
  }

</script>

<style scoped>
  .container{
    width: 85%;
    margin: 0 auto;
  }
  .bg{
    margin-top: 10px;
    width: 99%;
  }
  .clearfix:after {
    display: table;
    content: " ";
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }
  ul li {
    display: inline-block;
    margin: 0;
    padding: 0;
  }
</style>



