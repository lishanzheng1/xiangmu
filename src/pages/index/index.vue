<template>
    <div class="index">
        <el-container>
            <el-header height="70px">
                <el-row style="background-color: blue">
                    <div class="header-login">
                    </div>
                    <!-- <span>欢迎您：{{this.$route.query.username}}</span>-->
                    <span class="header-info">欢迎您：{{username}}</span>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-aside>
                <el-main>
                    <!--路由跳转-->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'login',
        computed: {
            username() {
                return this.$store.state.username;
            }
        },
        data() {
            return {
                data: [
                    {
                        label: '基础服务',
                        path: '/index',
                        children: [
                            {label: "用户管理", path: '/index/user'},
                            {label: "菜单管理", path: '/index/menu'},
                            {label: "角色权限管理", path: '/index/juese'},
                            {label: "字典管理", path: '/index/dictionaries'},
                            {label: "地区管理", path: '/index/area'}
                        ]
                    },
                    {
                        label: '数据统计',
                        path: '/index',
                        children: [
                            {
                                label: "采集数据",
                                path: '/index/collect'
                            }
                        ]
                    },
                    {
                        label: '公众号菜单管理',
                        path: '/index/public'
                    },
                    {
                        label: '采集人员管理',
                        path: '/index/people'
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data.path);
                this.$router.push({path: data.path})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        /*box-sizing: border-box;*/
        padding: 0;
        margin: 0;
    }
    .header-login {
        float: left;
        height: 70px;
        width: 200px;
        background: #4794E2 url("../../assets/微信图片_20190722152153.png") no-repeat center;
        background-size: contain;
    }

    .header-info {
        position: absolute;
        right: 20%;
        top: 30%;
        color: white;
    }

</style>
