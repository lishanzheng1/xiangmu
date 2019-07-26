<template>
    <div class="hello">
        <el-form :model="ruleForm2" status-icon ref="ruleForm" class="demo-ruleForm">
            <el-form-item>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index' }">基础服务</el-breadcrumb-item>
                    <el-breadcrumb-item >任务管理</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="message in messages">{{message.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-form-item>
            <el-form-item>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
                    <el-table-column prop="name" label="字典[项]名称">
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-search" aria-setsize=""
                                       @click="handleEdit(scope.$index , scope.row)"></el-button>
                            <el-button type="info" icon="el-icon-edit"
                                       @click="handleSet(scope.$index , scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete"
                                       @click="handleDelete(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAdd">增加</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="创建字典[项]" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="字典名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add()">确 定</el-button>
            </div>
        </el-dialog>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize" layout=" slot, prev, pager, next" :total="list.length">
                <el-button class="first-pager" @click="toFirstPage">首页</el-button>
            </el-pagination>
            <el-pagination
                    @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize" layout=" slot, jumper" :total="list.length">
                <el-button class="first-pager" @click="toLastPage">尾页</el-button>
            </el-pagination>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'dictionaries',
        data() {
            return {
                ruleForm2: {
                    search: '',
                },
                tableData: [
                    {
                        name: '',
                        status:''
                    }
                ],
               messages:[
                   {name:""}
               ],
                formLabelWidth: '120px',
                dialogFormVisible: false,
                row: {},
                list: [],
                glist: [],
                update: false,
                currentPage: 1, //初始页
                pagesize: 10,    //    每页的数据
                userList: [],
                form: {
                    name: '',

                }
            };
        },
        methods: {







            //添加
            handleAdd() {
                this.form = {};
                this.dialogFormVisible = true;
            },
            handleSet(index,row){
                this.setId=row._id;
                console.log(row._id);
                /*  this.$axios.get('http://127.0.0.1:7001/sys/dept/list?_id='+ this.setId,
                          {
                            headers:
                                    {sessionId: this.$store.state.sessionId}
                          })
                          .then(response => {
                                    this.form.name= response.data.data[0].name;
                                    console.log( response.data.data[0].name);
                                    // console.log(this.tableData.name);
                                  }
                          )
                          .catch(function (error) { // 请求失败处理
                            console.log(error);
                          });*/
                this.$axios.get('http://127.0.0.1:7001/sys/dict/one?_id='+ this.setId,
                    {
                        headers:
                            {sessionId: this.$store.state.sessionId}
                    })
                    .then(
                        response => {
                            (this.tableData.messages = response.data.data);
                            console.log(response.data.data)
                        }

                        /*function (data) {

                        console.log(data)
                    }*/)
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });

                //this.form = {};
                this.dialogFormVisible = true;
                this.update = true;
            },
            //查
            submitForm(ruleForm2) {
                console.log(ruleForm2);
                if (ruleForm2.search !== " ") {
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
            add() {
                console.log(this.$store.state.sessionId);
                if (!this.update){
                    this.$axios.post('http://127.0.0.1:7001/sys/dict/add',
                        {name: this.form.name ,fid:this.setId},
                        {
                            headers:
                                {sessionId: this.$store.state.sessionId}
                        })
                        .then(
                            function (data) {
                                console.log(data);
                            }
                            /*response => {
                                this.tableData.name= response.data.data.name;
                                console.log(response.data.data.name);
                                console.log(this.tableData.name);
                            }*/
                        )
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                } else {
                    console.log(this.setId);
                    this.$axios.post('http://127.0.0.1:7001/sys/dict/update',
                        {
                            id:this.setId,
                            name: this.form.name},
                        {
                            headers:
                                {sessionId: this.$store.state.sessionId}
                        })
                        .then(function (data) {
                            console.log(data);
                        })
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }

                /*    if (this.update) {
                        //编辑 弹框页面
                        this.tableData[this.index] = form;
                        console.log(this.index);
                        //把编辑变换为添加
                        this.update = false;
                    } else {
                        //添加
                        this.tableData.push(form);
                        this.list = this.tableData;
                    }*/
                this.dialogFormVisible = false;
            },
            //删除
            handleDelete(index,row) {
                this.$axios.get('http://127.0.0.1:7001/sys/dict/delete?_id='+ row._id)
                    .then(
                        function (data) {
                            console.log(data);
                        }
                        /*response => {
                            (this.tableData.status = response.data.data);
                            console.log(response.data.data)
                        }*/
                    )
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
                //his.tableData.splice(index, 1);
            },
            handleEdit(index, row) {
                //获得当前行的索引
                console.log("当前索引" + index);
                console.log("当前行的id值" + row._id);

                //将id值赋给fid 获取下级数据
                this.$axios.get('http://127.0.0.1:7001/sys/dict/list?fid=' + row._id)
                    .then(response => {
                            (this.tableData = response.data.data);
                        }
                    )
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
                /*  this.index = index;
                  //将编辑显示出弹框
                  this.dialogFormVisible = true;
                  this.form  = row;
                  this.update = true;*/
            },
            indexMethod(index) {
                return index + 1;
            },

            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log("每页下拉显示数据" + this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;
                console.log("点击第几页" + this.currentPage)  //点击第几页
            },
            //分页跳转的首页
            toFirstPage() {
                this.currentPage = 1;
            },
            //分页跳转的尾页
            toLastPage() {
                //找到最后一页 向下取整
                this.currentPage = Math.floor(this.list.length / this.pagesize + 1);
                console.log(this.currentPage)
            }
        },
        watch: {
            tableData(newV) {
                this.list = newV;
                this.gdlist = newV;
                /*console.log(newV);*/
            }
        },

        mounted() {
            this.$axios.get('http://127.0.0.1:7001/sys/dict/list?fid=0')
                .then(response => {
                        (this.tableData = response.data.data);
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
    .block {
        margin-left: 30%;
    }

    .el-pagination {
        float: left;
    }

</style>
