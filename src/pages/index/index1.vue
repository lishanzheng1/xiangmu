<template>
    <div class="header">
        <div class="top">
            <img src="../image/70319f7290452f66e9cc7d236f5133d.png"/>
            <p>欢迎你:{{this.$route.params.name}}</p>
            <!--<p v-on="getRouterData()"></p>-->
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <!--<router-link :to="{name:'User'}">电话</router-link>-->
        <div class="twoleft"><router-view></router-view></div>
    </div>


</template>
<script>
    export default {
        name: 'index1',
        data() {
            return {
                data: [{
                    id:1,
                    label: '基础服务',
                    children: [{
                        id:2,
                        label: '用户管理',


                    }, {
                        id:3,
                        label: '菜单管理',
                    },
                        {
                            id:4,
                            label: '角色权限管理',
                        }
                        , {
                            id:5,
                            label: '字典管理',
                        }
                        , {
                            id:6,
                            label: '地区管理',
                        }
                    ]
                }, {
                    id:7,
                    label: '数据统计',
                    children: [{
                        id:8,
                        label: '采集数据',

                    }]
                }, {
                    id:9,
                    label: '公众号菜单管理',

                },
                    {
                        id:10,
                        label: '采集人员管理',
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                name: '123',
            };
        },
        methods: {
            //通过ID跳转路由
            handleNodeClick(data) {
                console.log(data.id);
                if(data.id===2){
                    this.$router.push({
                        name: `User`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===3){
                    this.$router.push({
                        name: `Menu`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===4){
                    this.$router.push({
                        name: `Auth`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===5){
                    this.$router.push({
                        name: `Dictionaries`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===6){
                    this.$router.push({
                        name: `Region`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===8){
                    this.$router.push({
                        name: `Gather`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===9){
                    this.$router.push({
                        name: `Accounts`,
                        params: {
                            id:data.id
                        }
                    });}
                if(data.id===10){
                    this.$router.push({
                        name: `Gatheruser`,
                        params: {
                            id:data.id
                        }
                    });}
//                console.log(data);
//                console.log(this.name);
            },
            getRouterData() {
                this.name = this.$route.params.name;
//                console.log('name', this.$route.params.name)

            }
        }
    };
</script>
<style>
    .top {
        height: 60px;
        width: 100%;
        background-color: blue;
    }

    img {
        width: 100px;
        height: 30px;
        float: left;
    }
    .twoleft{
        position: absolute;
        top: 60px;
        left: 140px;

    }
    .top p{
        color: antiquewhite;
        text-align: center;
        line-height: 60px;
    }
</style>
