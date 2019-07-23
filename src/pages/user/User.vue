<template>
  <div class="hello">
    <div>基础服务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>
      <span>&nbsp;用户管理</span>
    </div>
    <el-form :model="ruleForm2" status-icon  ref="ruleForm"  class="demo-ruleForm" >
      <el-form-item label="用户名称  :" prop="search" >
        <el-input v-model="ruleForm2.search"  style="width: 200px ; margin-right: 20px" placeholder="用户名称">
        </el-input>
        <el-button type="primary"  @click="submitForm('ruleForm2')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%"  @row-click="onRowClick">
          <el-table-column label="用户表" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.users}}</span>
            </template>
          </el-table-column>
          <el-table-column label="登录名" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.accounts}}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地区" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.role }}</span>
            </template>
          </el-table-column>
          <el-table-column label="openID" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.openId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index , scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary"  @click="dialogFormVisible = true">增加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog  title="添加"  :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户表" :label-width="formLabelWidth">
          <el-input v-model="form.users" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input v-model="form.accounts" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="openId" :label-width="formLabelWidth">
          <el-input v-model="form.openId" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" :label-width="formLabelWidth">
           <el-input v-model="tableData." autocomplete="off"></el-input>
         </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button  type="primary" @click="add(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'user',
    data() {
      return {
        ruleForm2: {
          search: '',
        },
        tableData: [{
          users : '1',
          accounts : '1',
          password: '1',
          state: '1',
          area: '1',
          role: '1',
          openId : '10',
        }],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        row : {},
        index : null,
        form : {
          users :'',
          accounts :'',
          password : '',
          state: '',
          area: '',
          role: '',
          openId : '',
        }
      };
    },
    methods: {
      /* submitForm(formName) {
         /!* this.$refs[formName].validate((valid) => {
            if (valid) {
              /!*将vuex中的changeUsernane的方法改变 ， 将state中的username 改为 当前登录的人*!/
              this.$store.commit("changeUsername", this.ruleForm2.username);
              this.$router.push({path:'/index'/!*,query : {username :this.ruleForm2.username }*!/});
            } else {
              console.log('error submit!!');
              return false;
            }
          });*!/
       },*/
      submitForm(formName){

      },
      add (form) {
        /* this.$prompt(['请输入用户表','sss'], '提示', {confirmButtonText: '确定',
           cancelButtonText: '取消'},
         ).then(({ value,value1 }) => {
           this.tableData.push({users:value,accounts :value1})
           /!* this.$message({
             type: 'success',
             message: '你的用户名是: ' + value
           });*!/
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '取消输入'
           });
         });
       //this.tableData.push({num:this.num,accounts :this.accounts})*/
        this.tableData.push({users : form.users ,accounts :form.accounts , password :form.password,
          state:form.state,area :form.area,role:form.role,openId:form.openId});
        this.dialogFormVisible = false;
      },
       onRowClick(row) {
         console.log(row);
         //传过来点击哪个就是哪个对象
         this.row = row;
         //索引
         this.index = this.tableData.indexOf(row);
         console.log(this.index);
      },
     /* set(form) {
        this.tableData.splice(this.index,1,this.tableData.push({users : form.users ,accounts :form.accounts , password :form.password}))
      },*/
      handleDelete(index, row) {
        this.tableData.splice(index,1);
        console.log(index, row);
      },
      handleEdit(index, form){

        this.tableData.splice(index,1, this.tableData.push({users : form.users ,accounts :form.accounts , password :form.password,
          state:form.state,area :form.area,role:form.role,openId:form.openId}) );
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-ruleForm{
    margin: 40px 0 0 0;
  }

</style>
