<template>
  <div class="clearfix bg-header">
    <div class="left">
      <img style="width: 130px; margin: 5px 40px 0px 100px" src="../../assets/img/logo.jpg"/>
    </div>
    <div style="background: #fff">
      <div style="float:left; margin-top: 52px">
        <el-menu :default-active="activeIndex" background-color="#F7F9F8" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">精品文章</el-menu-item>
          <el-menu-item index="3">倾心之音</el-menu-item>
          <el-menu-item index="4">心理测试</el-menu-item>
          <el-menu-item index="5">心理论坛</el-menu-item>
          <el-menu-item index="6" v-if="showHome || showSelect">个人中心</el-menu-item>
        </el-menu>
        <div class="line"></div>
      </div>
      <div style="width: 100px; font-size: 14px; float: right; margin-top: 76px; margin-right: 100px; color: #909399;">
        <ul class="login-ul" v-if="!(showSelect || showHome)">
          <li><el-button type="text" @click="dialogLoginVisible = true">登录 &nbsp; | &nbsp; </el-button>
          <li><el-button type="text" @click="dialogRegistVisible = true">注册</el-button></li>
        </ul>
        <div v-else>
          <el-button type="text"  @click="logOff">退出</el-button>
        </div>
      </div>

      <el-dialog title="登录" :visible.sync="dialogLoginVisible" width="37%">
        <el-form :model="user" style="margin-left: -60px;">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="loginUser.account"
                      auto-complete="off"
                      placeholder="请输入账号" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input type="password"
                      v-model="loginUser.password"
                      placeholder="请输入密码"
                      auto-complete="off" clearable>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLoginVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkUserLogin">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="注册" :visible.sync="dialogRegistVisible" width="37%">
        <el-form :model="user" style="margin-left: -40px;">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="user.account"
                      auto-complete="off"
                      @blur="checkAccount"
                      placeholder="账号最多为12位"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="user.password"
                      auto-complete="off"
                      type="password"
                      @blur="checkPassword"
                      placeholder="密码最多为15位"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input v-model="rePassword"
                      auto-complete="off"
                      @blur="checkRePassword"
                      placeholder="请确认密码"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio style="margin-left: -20%;" v-model="user.sex" label="0" selected>男</el-radio>
            <el-radio style="" v-model="user.sex" label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="出生年月" :label-width="formLabelWidth">
            <el-date-picker
              style="width: 99%;margin-left: -3.8%"
              v-model="user.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              default-value="now"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="个性签名" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="user.signature">
            </el-input>
          </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogRegistVisible = false">取 消</el-button>
          <el-button type="primary" @click="registUser">注册</el-button>
        </div>
      </el-dialog>
    </div>
  </div>


</template>

<script>
  export default {
    props: {
      activeIndex: {
        type: String,
        required: true
      },
      account: {
        type: String,
        required: false
      },
      showHome: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        dialogLoginVisible: false,
        dialogRegistVisible: false,
        rePassword: '',
        user: {
          account: '',
          password: '',
          sex: '0',
          birthday: (new Date().getFullYear() - 8) + '-'
            + (new Date().getMonth() + 1) + '-'
            + new Date().getDate(),
          signature: 'Hi'
        },
        loginUser: {
          account: '',
          password: ''
        },
        formLabelWidth: '120px',
        showSelect: false
      };
    },
    methods: {
      logOff() {
        let vm = this;
        window.sessionStorage.removeItem('usr');

        vm.showSelect = false;
      },
      checkAccount() {
        let vm = this;

        if(vm.user.account.length <= 0) {
          vm.showErrMsg('账号的长度不能为空');
          return;
        }
        if(vm.user.account.length > 12) {
          vm.showErrMsg('账号的长度最多为12位');
          return;
        }

        vm.$ajax.post('/apis/user/checkUserAccount', {account: vm.user.account}).then(function (res) {
          if(!res.data.state) {
            vm.showErrMsg('该账号已被他人注册，请重新输入');
          }
        });
      },
      checkPassword() {
        let vm = this;

        if(vm.user.account.length <= 0) {
          vm.showErrMsg('密码不能为空');
          return;
        }
        if(vm.user.account.length > 12) {
          vm.showErrMsg('密码的长度最多为15位');
          return;
        }
      },
      checkRePassword() {
        let vm = this;

        if(vm.rePassword != vm.user.password) {
          vm.showErrMsg('两次输入的密码不一致');
        }
      },
      showErrMsg(msg) {
        let vm = this;

        vm.$notify.error({
          title: '提示',
          message: msg
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
      registUser() {
        let vm = this;

        if(vm.user.account.length <= 0 || vm.user.password.length <= 0
          || vm.rePassword.length <= 0) {
          vm.showErrMsg('请完善注册的信息');
        }

        vm.$ajax.post('/apis/user/regist', vm.user).then(function (res) {
          if(res.data.state) {
            vm.showSuccessMsg('恭喜注册成功');
          }else {
            vm.showErrMsg('注册失败，请稍后重试');
          }
        });

        vm.dialogRegistVisible = false;
      },
      checkUserLogin() {
        let vm = this;

        if(vm.loginUser.account.length <= 0) {
          vm.showErrMsg('请输入账号后再尝试');
          return;
        }

        if(vm.loginUser.password.length <= 0) {
          vm.showErrMsg('请输入密码后再尝试');
          return;
        }

        vm.$ajax.post('/apis/user/login', vm.loginUser).then(function (res) {
          if(res.data.state) {
            window.sessionStorage.setItem('usr', vm.loginUser.account);
            vm.showSelect = true;
          }else {
            vm.showErrMsg('账号或密码错误，请重试');
          }
        });
        vm.dialogLoginVisible = false;
      },
      handleSelect(key, keyPath) {
        let ary = ['', '/', '/article', '/music', '/test', '/forum', '/home'];

        this.$router.push(ary[key]);
      }

    }
  }

</script>

<style scoped>
  .list-inline li{
    display: inline-block;
  }
  .icon-logo {
    width: 100px;
    margin: 5px 5px 10px 20px;
  }
  .login-ul li {
    display: inline-block;
    list-style-type: none;
  }
  .bg-header {
    background: url("../../assets/img/header-bg.jpg");
  }
</style>



