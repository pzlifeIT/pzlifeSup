<template>
  <div class="tcontent">
    <div class="table-header clearfix">
      <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>供应商功能管理</el-breadcrumb-item>
        <el-breadcrumb-item>供应商账号</el-breadcrumb-item>
        <el-breadcrumb-item>子供应商账号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="supplierList" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column  prop="sup_name" label="账号名称" ></el-table-column>
      <el-table-column  prop="mobile" label="号码" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-switch
            v-model="row._status"
            active-text="启用"
            inactive-text="停用" @change="change(row.id,row._status)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination @pageChange="pageChange" :total="total"></v-pagination>

  </div>
</template>

<script>
  import vPagination from '../component/pagination'
  // import {downloadIamge} from '../../../assets/js/common'
  export default {
    data(){
      return {
        cardStatus:false,
        ruleForm:{},
        rules:['sup_name','mobile'],
        ruleType:{
          'sup_name':{
            type:'input',
            label:'供应商账号名称',
            placeholder:'请输入供应商账号名称'
          },
          'mobile':{
            type:'input',
            label:'账号',
            placeholder:'请输入账号'
          },
        },
        value:false,
        screen:{
          page:1,
          page_num:10
        },
        supplierList:[],
        total:0,
        dialogVisible:false,
        account_id:0,
        child_num:'',
        child_name:''
      }
    },
    components:{
      vPagination,
      // vCard
    },
    mounted(){
      this.check(localStorage.getItem('sup_id'))
    },
    methods: {
      change(id,val){
        console.log(id,val)
        let status = 0
        if (val){
          status = 1
        } else {
          status = 2
        }
        let that = this
        that.$request({
          url:'user/updateSupplierSonAdmin',
          data:{
            id:id,
            status:status
          },
          success(res) {
            that.$message.success('操作成功')
          }
        })
    },
      check(id){
        let that = this
        that.screen.page = 1
        that.screen.page_num = 20
        that.screen.sup_id = id
        that.$request({
          url:'user/supplierSonAdminList',
          data:that.screen,
          success(res) {
            that.supplierList = that.dis(res.data)
            that.total = res.total || 0

          }
        })
      },
      dis(data){
        for (let i=0;i<data.length;i++){
          if (data[i].status == 1){
            data[i]._status = true
          } else {
            data[i]._status = false
          }
        }
        return data
      },
      add(id){
        this.account_id = id
        this.dialogVisible = true
      },
      hideCard(){
        this.cardStatus = false
      },
      pageChange(obj){
        this.screen.page = obj.page
        this.check()
      },
    }
  }
</script>

<style scoped>
  .qrcode{
    width: 250px;
  }
</style>
