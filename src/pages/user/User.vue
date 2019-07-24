<template>
    <div class="hello">
        <div>基础服务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>
            <span>&nbsp;用户管理</span>
        </div>
        <el-form :model="ruleForm2" status-icon  ref="ruleForm"  class="demo-ruleForm" >
            <el-form-item label="用户名称  :" prop="search" >
                <el-input v-model="ruleForm2.search"  style="width: 200px ; margin-right: 20px" placeholder="用户名称">
                </el-input>
                <el-button type="primary"  @click="submitForm(ruleForm2)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-table :data="tableData" style="width: 100%" >
                    <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
                    <el-table-column prop="loginName" label="账号">
                    </el-table-column>
                    <el-table-column prop="role.name" label="角色">
                    </el-table-column>
                    <el-table-column prop="dept.name" label="地区">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index , scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize" layout=" slot, prev, pager, next" :total="list.length">
                <el-button   class="first-pager" @click="toFirstPage">首页</el-button>
            </el-pagination>
            <el-pagination
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize" layout=" slot, jumper" :total="list.length">
                <el-button   class="first-pager" @click="toLastPage">尾页</el-button>
            </el-pagination>
        </div>
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
                tableData: [
                    {
                        loginName:'',
                        dept: {},
                        role: {}
                    }
                ],
                formLabelWidth: '120px',
                dialogFormVisible: false,
                row: {},
                index: null,
                list: [],
                glist:[],
                update:false,
                currentPage:1, //初始页
                pagesize:5,    //    每页的数据
                userList: [],
                form: {
                    accounts: '',
                    password: '',
                    state: '',
                    area: '',
                    role: '',
                    openId: '',
                }
            };
        },
        methods: {
            //添加
            handleAdd(){
                this.form={};
                this.dialogFormVisible = true;
            },
            //查
            submitForm(ruleForm2) {
                console.log(ruleForm2);
                if (ruleForm2.search !==" ") {
                    let newArr = [];
                    for (let i = 0; i < this.gdlist.length; i++) {
                        if (this.gdlist[i].accounts.search(this.ruleForm2.search) !== -1) {
                            newArr.push(this.gdlist[i])
                        }
                    }
                    this.list = newArr;
                } else {
                    this.list = this.glist;
                }
            },
            //弹框时出现的 编辑或者添加页面
            add(form) {
                if (this.update){
                    //编辑 弹框页面
                    this.tableData[this.index] = form;
                    console.log(this.index);
                    //把编辑变换为添加
                    this.update= false;
                }else {
                    //添加
                    this.tableData.push(form);
                    this.list = this.tableData;
                }
                this.dialogFormVisible = false;
            },
            //删除
            handleDelete(index) {
                this.tableData.splice(index, 1);
            },
            //编辑显示
            handleEdit(index, row) {
                //获得当前行的索引
                console.log(index);
                this.index = index;
                //将编辑显示出弹框
                this.dialogFormVisible = true;
                this.form  = row;
                this.update = true;
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log("每页下拉显示数据"+this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(val){
                this.currentPage = val;
                console.log("点击第几页"+this.currentPage)  //点击第几页
            },
            //分页跳转的首页
            toFirstPage() {
                this.currentPage = 1;
            },
            //分页跳转的尾页
            toLastPage() {
                //找到最后一页 向下取整
                this.currentPage = Math.floor(this.list.length/this.pagesize+1);
                console.log(this.currentPage)
            },
            indexMethod(index) {
                return index+1;
            },
        },
        watch: {
            tableData(newV) {
                this.list = newV;
                this.gdlist = newV;
                /*console.log(newV);*/
            }
        },
        mounted() {
            this.$axios.get('http://10.16.10.250:7001/sys/user/list')
                .then(response => {
                        (this.tableData = response.data.data)
                        console.log(response.data.data);
                    }
                )
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .demo-ruleForm{
        margin: 40px 0 0 0;
    }
    .block {
        margin-left: 30%;
    }
    .el-pagination{
        float: left;
    }



</style>
