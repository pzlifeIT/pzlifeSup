<template>
  <div class="login">
    <el-card class="box-card">
      <img class="logImg" src="https://webimages.pzlive.vip/logo.png?imageMogr2/thumbnail/200x" alt="">
      <el-form  label-position="top" label-width="80px" :model="userinfo">
        <el-form-item label="账号:">
          <el-input placeholder="请输入账号" v-model="userinfo.user"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <!-- <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input> -->
          <el-input placeholder="请输入密码" v-model="userinfo.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="btn" @click="resetForm('ruleForm')">重置</el-button>
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

    },
    resetForm(){

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
  width:150px;
}
.logImg {
    display: block;
    width: 100px;
    margin: 10px auto;
}

</style>
