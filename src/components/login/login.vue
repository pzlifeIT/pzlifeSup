<template>
  <div class="login">
    <el-card class="box-card">
      <img class="logImg" src="https://webimages.pzlive.vip/776logo.png" alt="">
      <el-form  label-position="top" label-width="80px" :model="userinfo">
        <el-form-item label="账号:">
          <el-input placeholder="请输入账号" v-model="userinfo.user"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <!-- <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input> -->
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
import {request} from '../../assets/js/ajax'
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
      // that.$request({

      // })
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
