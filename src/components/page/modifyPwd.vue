<template>
  <div>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
          <span>修改密码</span>
        </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="passwd">
          <el-input type="password" v-model="ruleForm.passwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_passwd1">
          <el-input type="password" v-model="ruleForm.new_passwd1" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="new_passwd2">
          <el-input type="password" v-model="ruleForm.new_passwd2" ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
      data() {
      var checkpasswd	 = (rule, value, callback) => {
        console.log(value)
        if (!value) {
          return callback(new Error('原密码不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.new_passwd2 !== '') {
            this.$refs.ruleForm.validateField('new_passwd2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.new_passwd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          new_passwd1: '',
          new_passwd2: '',
          passwd: ''
        },
        rules: {
          new_passwd1: [
            { validator: validatePass, trigger: 'blur' }
          ],
          new_passwd2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          passwd: [
            { validator: checkpasswd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.resetpassword()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetpassword(){
        let that =this;
        that.$request({
        url:'user/resetpassword',
        data:that.ruleForm,
        success:function(res){
            that.$message({message:'修改成功,请重新登录',type:'success' });
            that.$router.push({ path: '/login' })
        },
        error(code){
          let text = '';
          switch(parseInt(code)){
            case 3001:
              text = '密码错误';
              break;
            case 3002:
              text = '密码必须为6-16个任意字符';
              break;
            case 3003:
              text = '老密码不能为空';
              break;
            case 3004:
              text = '密码确认有误';
              break;
            case 3005:
              text = '修改密码失败';
              break;
            default:
              text = '意料之外的错误';
              break
          }
          that.$message({message:text,type:'error' });
        }
      })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.box-card{
  width: 800px;
  margin: 0 auto;
}
</style>
