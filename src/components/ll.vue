<template>
  <div class="login">
    <el-container>
      <el-main>
        <el-row>
          <div class="">
            <img src="../assets/微信图片_20190722131057.png" alt="图片">
          </div>
        </el-row>
        <el-row>
          <p>账号密码登录</p>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="username" >
              <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="账号" ></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
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
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
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
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 800px;
    height: 400px;
    margin: 100px auto;
    background: red url("../assets/微信图片_20190722131107.png") no-repeat;
    background-size: cover;
  }
  el-button {

  }
  p {
    margin-left: 100px;
  }
  el-row img {
    background-color: blue;
    margin-left: 400px;
  }

</style>
