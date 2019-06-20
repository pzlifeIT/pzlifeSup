<template>
  <div id="marketing">
    <el-button class="add" type="primary" @click="toggleCard(true)">新建推广活动</el-button>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column  prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">二维码</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    
    <div class="suspension" v-if="boxcard">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
          <span>推广活动</span>
        </div>
      <el-form label-width="80px" >
        <el-form-item label="活动标题" >
          <el-input v-model="a" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="分享标题" >
          <el-input v-model="a"  placeholder="请输入微信分享标题"></el-input>
        </el-form-item>
        <el-form-item label="分享次数" >
          <el-input v-model.number="a"  placeholder="请输入微信分享次数"></el-input>
        </el-form-item>
        <el-form-item label="活动展示大图" >
          <v-upload :num='1' :image='image' @upresult='upresult'></v-upload>
        </el-form-item>
        <el-form-item label="微信转发分享图片" >
          <v-upload :num='2' :image='image' @upresult='upresult'></v-upload>
        </el-form-item>
        <el-form-item label="分享成功页面图片" >
          <v-upload :num='3' :image='image' @upresult='upresult'></v-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="toggleCard(false)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
    <div class="suspension" v-show="qrcodeCard">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
          <span>二维码</span>
        </div>
      <el-form >
        <el-form-item >
          <canvas v-show="canCode" id="qrcode" width="200" height="200"></canvas>
        </el-form-item>
        <el-form-item class="flex-cen">
          <el-button class="codebtn" type="primary" @click="downImg()">下载</el-button>
          <el-button class="codebtn"  @click="hideQrcode(false)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
  </div>
</template>

<script>
import vUpload from '../common/upload';
import QRcode from 'qrcode'
import {downloadIamge} from '../../assets/js/common'
export default {
  data() {
      return {
        a:'',
        boxcard:false,
        qrcodeCard:false,
        canCode:false,
        image:'',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
  },
  mounted(){
  },
   methods: {
      upresult(data){
        console.log(data)
      },
      toggleCard(bl){
        this.boxcard = bl
      },
      handleClick(scope){
        this.qrcodeCard = true
        this.getQrcode(scope.date)
      },
      hideQrcode(){
          this.qrcodeCard = false
          this.canCode = false
      },
      getQrcode(con){
        let that =this
        QRcode.toCanvas(document.getElementById('qrcode'), con, function (error) {
          if (error) throw new Error(error)
          that.canCode = true
        })
      },
      downImg(){
        downloadIamge(document.getElementById('qrcode').toDataURL("image/png"),'推广活动')
      }
    },
    components:{
      vUpload
    }
}
</script>

<style lang="less" scoped>
#marketing{
    .add{
      margin-bottom: 20px;
      cursor: pointer;
    }
    #qrcode{
      width: 200px!important;
      height: 200px!important;
      margin: 0 130px;
    }
    .codebtn{
      width: 100px;
    }
    .flex-cen{
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
</style>
