<template>
  <div id="marketing">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>筛选</span>
        <el-button style="float: right; padding: 3px 10px" type="primary" @click="getAllSupPromoteSignUp()">导出</el-button>
      </div>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="screen.nick_name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="screen.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="报名开始时间">
          <el-date-picker v-model="screen.start_time" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" default-time="00:00:00"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名结束时间">
          <el-date-picker v-model="screen.end_time" type="datetime" placeholder="选择日期时间" @change="timechange" value-format="yyyy-MM-dd HH:mm:ss" default-time="2000-11-10 10:10:00"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="enrollmentList" border style="width: 100%">
      <el-table-column  type="index" label="序号" width="180"></el-table-column>
      <el-table-column  prop="nick_name" label="姓名" ></el-table-column>
      <el-table-column  prop="mobile" label="手机号" ></el-table-column>
      <el-table-column  prop="create_time" label="报名时间" ></el-table-column>
    </el-table>
    <div class="flex-cen">
      <el-pagination :hide-on-single-page="true" background @current-change="pageChange" layout="prev, pager, next" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
import {tableToExcel} from '../../assets/js/common'
export default {
  data() {
      return {
        enrollmentList:[],
        allEnrollmentList:[],
        screen:{
          promote_id:'',
          nick_name:'',
          mobile:'',
          start_time: '',
          end_time:''
        },
        page:1,
        total:0
      }
  },
  mounted(){
    this.screen.promote_id = this.$route.query.pid;
    this.getSupPromoteSignUp()
  },
  methods: {
    timechange(time){
      console.log(time)
    },
    onQuery(){
      this.page=1
      this.getSupPromoteSignUp()
    },
    pageChange(val){
        console.log(val)
        if(this.screen.page === val) return
        this.screen.page = val
        this.getpromoteList()
    },
    getAllSupPromoteSignUp(page = 1){
      let that =this;
      that.screen.page = page
      that.screen.page_num = 1000
      that.$request({
        url:'promote/getSupPromoteSignUp',
        data:that.screen,
        success:function(res){
          if(res.suppromotesignup.length === 1000){
            that.pushList(res.suppromotesignup)
            that.getAllSupPromoteSignUp(page + 1)
          }
          if(res.suppromotesignup.length > 0){
            that.pushList(res.suppromotesignup)
          }
          if(res.suppromotesignup.length < 1000){
            that.totableToExcel()
          }
        },
        error(code){
          let text = '';
          switch(parseInt(code)){
            case 3002:
              text = '该活动不存在';
              break;
            case 3003:
              text = '时间格式错误';
              break;
            default:
              text = '意料之外的错误';
              break
          }
          that.$message({message:text,type:'error' });
        }
      })
    },
    pushList(list){
      for(let i=0,len=list.length;i<len;i++){
        this.allEnrollmentList.push({
          nick_name:list[i].nick_name,
          mobile:list[i].mobile,
          create_time:list[i].create_time
        })
      }
    },
    totableToExcel(){
      if(this.allEnrollmentList.length === 0){
        this.$message({message:'暂无导出内容',type:'warning' });
        return
      }
      let head = ['姓名','手机号','报名时间'];
      tableToExcel(head,this.allEnrollmentList)
    },
    getSupPromoteSignUp(){
      let that =this;
      that.screen.page = that.page
      that.screen.page_num = 10
      that.$request({
        url:'promote/getSupPromoteSignUp',
        data:that.screen,
        success:function(res){
            that.enrollmentList = res.suppromotesignup || [];
            let retotal= Math.ceil(parseInt(res.total) / 10);
            if (that.total === retotal) return;
            that.total = retotal;
        },
        error(code){
          let text = '';
          switch(parseInt(code)){
            case 3002:
              text = '该活动不存在';
              break;
            case 3003:
              text = '时间格式错误';
              break;
            default:
              text = '意料之外的错误';
              break
          }
          that.$message({message:text,type:'error' });
        }
      })
    },
  },
  components:{
    
  }
}
</script>

<style lang="less" scoped>
.box-card{
  margin-bottom: 10px;
}
</style>
