<template>
  <div id="marketing">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>筛选</span>
        <el-button style="float: right; padding: 3px 10px" type="primary" @click="getAllSupPromoteSignUp()">导出</el-button>
      </div>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="学员姓名">
          <el-input v-model="screen.study_name" placeholder="学员姓名"></el-input>
        </el-form-item>
        <el-form-item label="学员手机号">
          <el-input v-model="screen.study_mobile" placeholder="学员手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="screen.sex" placeholder="请选择">
          <el-option v-for="item in sexSel" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
      <el-table-column  type="index" label="序号"></el-table-column>
      <el-table-column  prop="study_name" label="学员姓名" ></el-table-column>
      <el-table-column  prop="study_mobile" label="学员手机号" ></el-table-column>
      <el-table-column  prop="sex" label="性别" ></el-table-column>
      <el-table-column  prop="age" label="年龄" ></el-table-column>
      <el-table-column  prop="signinfo" label="报名内容" ></el-table-column>
      <el-table-column  prop="create_time" label="报名时间" ></el-table-column>
    </el-table>
    <div class="flex-cen">
      <el-pagination :hide-on-single-page="true" background @current-change="pageChange" ref="pagination"  layout="prev, pager, next" :total="total"> </el-pagination>
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
          study_name:'',
          study_mobile:'',
          sex:'',
          start_time: '',
          end_time:''
        },
        sexSel:[{
          value:'',
          label:'全部'
        },{
          value:'1',
          label:'男'
        },{
          value:'2',
          label:'女'
        }],
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
      this.$refs.pagination.internalCurrentPage = 1;
      this.getSupPromoteSignUp()
    },
    pageChange(val){
        console.log(val)
        if(this.page === val) return
        this.page = val
        this.getSupPromoteSignUp()
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
          study_name:list[i].study_name,
          study_mobile:list[i].study_mobile,
          sex:list[i].sex,
          age:list[i].age,
          signinfo:list[i].signinfo,
          create_time:list[i].create_time
        })
      }
    },
    totableToExcel(){
      if(this.allEnrollmentList.length === 0){
        this.$message({message:'暂无导出内容',type:'warning' });
        return
      }
      let head = ['学员姓名','学员手机号','性别','年龄','报名内容','报名时间'];
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
            let retotal= parseInt(res.total);
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
