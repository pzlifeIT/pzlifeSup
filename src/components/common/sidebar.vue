<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <!-- <el-menu-item index="index">
                    <span class="sb-icon"><i class="material-icons">home</i></span>
                     <span class="sb-cn">首页</span>
            </el-menu-item> -->

            <el-submenu index="2">
                <template slot="title">
                    <span class="sb-icon"><i class="el-icon-setting"></i></span>
                    <span class="sb-cn">预约检测</span>
                </template>
                <el-menu-item index="marketing">检测列表</el-menu-item>
            </el-submenu>

          <el-submenu index="/account" route="/account">
            <template slot="title">
              <span class="sb-icon"><i class="el-icon-setting"></i></span>
              <span class="sb-cn">子账户管理</span>
            </template>
            <el-menu-item index="account" >账户列表</el-menu-item>
          </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','/account');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
        background: #324157;
       
    }
    .sidebar > ul {
        height:100%;
    }

   .el-menu-item, .el-submenu__title{
       font-size:14px;
     
   }
   .material-icons{
         vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size:18px;
   }
</style>
