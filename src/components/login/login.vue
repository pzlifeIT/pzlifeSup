<template>
  <div class="login">
    <el-card class="box-card">
      <img class="logImg" src="https://webimages.pzlive.vip/776logo.png" alt="">
      <el-form  label-position="top" label-width="80px" :model="userinfo">
        <el-form-item label="手机号:">
          <el-input placeholder="请输入手机号" v-model="userinfo.user"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input placeholder="请输入密码" v-model="userinfo.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo:{
        user:'',
        pwd:''
      }
      
    }
  },
  mounted () {

  },
  methods: {      
    submitForm(){
      if(!this.userinfo.user)  {
        this.$message({message:'账号不能为空',type:'error' });
        return
        }
      if(!this.userinfo.pwd) {
        this.$message({message:'密码不能为空',type:'error' });
        return
      } 
      let that =this;
      that.$request({
        url:'user/login',
        login:true,
        data:{
          mobile:that.userinfo.user,
          passwd:that.userinfo.pwd
        },
        success:function(res){
            localStorage.setItem("sup_con_id",res.sup_con_id)
            // that.$router.push({ path: '/marketing' })
          if (that.$route.query.redirect) { //如果存在参数
            let redirect = that.$route.query.redirect
            that.$router.push(redirect)//则跳转至进入登录页前的路由
          } else {
            that.$router.push('/marketing')//否则跳转至首页
          }
        },
        error(code){
          let text = '';
          switch(parseInt(code)){
            case 3001:
              text = '账号密码不能为空';
              break;
            case 3002:
              text = '用户不存在';
              break;
            case 3003:
              text = '密码错误';
              break;
            case 3004:
              text = '登录失败';
              break;
            default:
              text = '意料之外的错误';
              break
          }
          that.$message({message:text,type:'error' });
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.box-card{
  width: 400px;
}
.btn{
  width:340px;
  margin: 0 10px;
}
.logImg {
    display: block;
    width: 100px;
    margin: 0 auto 10px;
}

</style>
