<template>
  <div class="login">
    <el-container>
      <el-main>
        <el-row>
          <div class="container-main-top">
            <img src="../../assets/微信图片_20190722141537.png" alt="图片">
          </div>
        </el-row>
        <el-row>
          <p>账号密码登录</p>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="400px" class="demo-ruleForm">
            <el-form-item  prop="username" >
              <el-col :span="12">
                <el-input v-model="ruleForm2.username"  placeholder="账号" ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item  prop="pass">
              <el-col :span="12">
                <el-input type="password" v-model.number="ruleForm2.pass"  placeholder="密码"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" style="width: 450px!important" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else  if (value !== 123456) {
          callback(new Error('密码错误'));
        } else {
          callback();
        }
      };
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if ( value !== "admin"){
          callback(new Error('用户名不存在'));
        }
        callback();
      };
      return {
        ruleForm2: {
          pass: '',
          username : ''
        },
        rules2: {
          username : [
            { validator: validateUsername,trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
         this.$refs[formName].validate((valid) => {
           if (valid) {
               /*将vuex中的changeUsernane的方法改变 ， 将state中的username 改为 当前登录的人*/
               this.$store.commit("changeUsername", this.ruleForm2.username);
               this.$router.push({path:'/index'/*,query : {username :this.ruleForm2.username }*/});
           } else {
             console.log('error submit!!');
             return false;
           }
         });
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    /*  width: 800px;
      height: 500px;*/
    height: 700px;
    background: url("../../assets/微信图片_20190722131107.png") no-repeat;
    background-size: cover;
  }
  p {
    margin-left: 400px;
  }
  .container-main-top {
    margin-left: 400px;
    margin-top: 50px;
  }

</style>
