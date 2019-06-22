<template>
    <div class="header">
        <el-row :gutter="10">
            <!--Logo area-->
            <el-col :xs="16" :sm="16" :md="20">
                <div class="logo">  
                    <span class="logo_prefix">品质生活广场</span><span class="logo_suffix">CMS</span>
                </div>
            </el-col>
            <el-col class="fr" :xs="8" :sm="8" :md="4" >
              <div class="user-header">
                  <el-dropdown class="dropdown" trigger="click" menu-align="start">
                      <span class="el-dropdown-link">
                        <span class="name din fl">{{name}}</span>
                        <img class="userImg" src="https://webimages.pzlive.vip/776logo.png" width="50px" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item >
                              <div class="setting-div"  @click="modifyPwd">
                                  <span class="setting-icon"><i class="material-icons">account_box</i></span> 
                                  <span class="setting-string">修改密码</span>
                              </div>
                          </el-dropdown-item>
                          <el-dropdown-item divided  >
                              <div class="setting-div" @click="quitlogin">
                                  <span class="setting-icon"><i class="material-icons">assignment_return</i></span> 
                                  <span class="setting-string">退出登录</span>
                              </div>
                          </el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
      props: ['name'],
        data() {
            return {
                }
        },
        mounted () {
        console.log()
      },
        methods:{
            quitlogin(){
              localStorage.setItem("sup_con_id",'')
              this.$router.push({ path: 'login' })
            },
            modifyPwd(){
              this.$router.push({ path: 'modifyPwd' })
            }
        }
    }
</script>
<style scoped>
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height:66px;
       
        font-size: 14px;
        line-height: 66px;
        background-color:#324157;
        box-shadow:2px 0 3px rgba(0,0,0,.5);
        z-index:1000;
        padding:0 32px 0 40px;
        overflow:hidden;
       
    }
    .header .logo{
        float: left;
        cursor:pointer;
        font-size: 22px;
    }
    .logo_prefix{
        color:#209e91;
    }
    .logo_suffix{
        color:#fff;
    }
    .header .search{
        float: left;
        color:#fff;
        font-size:14px;
    }
    .website span{
        display:inline-block;
        color:#209e91;
    }
    .website span:first-child{
        color:#fff;
    }
    .header-right{
        padding-top:25px;
        line-height:10px;
    }
    .header-right span{
        display:inline-block;
        margin-left:14px;
        font-size:18px;
        color:#fff;
        line-height:1px;
        height:18px;
        cursor:pointer;

    }
    .header-right span:hover{
        color:#209e91;

    }
    .user-header{
        line-height:10px;
        padding-top:7px;
        font-size:12px;
    }
    .user-header img{
        border-radius:50%;
        cursor:pointer;
    }
    .pop-image{
        display:block;
        float:left;
    }
    .pop-image img{
        border-radius:50%;
    }
    .pop-div{
        height:55px;
        clear:both;
    }
    .pop-content{
        display:block;
        font-size:12px;
        line-height:14px;
        padding-top:15px;
        margin-left:60px;
    }
    .pop-time{
        display:block;
        float:right;
        font-size:10px;
        color:#ccc;

    }
    .pop-title{
        font-size:12px;
        color:#209e91;
    }
    .task-div{
        clear:both;
        height:55px;
    }
    .task-span{
        display:block;
        float:left;
        font-size:12px
    }
    
    .task-content{  
        width:160px;
        line-height:16px;
        margin-left:10px;
        padding:5px;
    }
    .task-time{
        clear:both;
        float:right;
        color:#ccc;
        
    }
    .setting-div{
        height:30px;
        line-height:30px;
        clear:both;
    }
    .setting-div span{
        display:block;
        float:left;
        font-size:12px;
    }
    .setting-icon{
        padding-top:3px;
        padding-right:3px;
    }
    .name{
      color: #fff;
      max-width: calc(100% - 60px);
      height: 50px;
      line-height: 50px;
      margin-right: 10px;
      cursor: pointer;
      font-size: 18px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .dropdown{
      width: 100%;
    }
    .el-dropdown-link{
      display: block;
      width: 100%;
      overflow: hidden;
    }
    .user-header{
      width: 100%;
    }
    .userImg{
      background-color: #fff;
    }

</style>
