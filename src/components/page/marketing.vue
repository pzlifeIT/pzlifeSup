<template>
  <div id="marketing">
    <el-button class="add" type="primary" @click="toggleCard(true)">新建推广活动</el-button>

    <el-table :data="promoteList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column  prop="title" label="活动标题" width="180"></el-table-column>
      <el-table-column  prop="share_title" label="分享标题" width="180"></el-table-column>
      <el-table-column  prop="share_count" label="分享次数" width="180"></el-table-column>
      <el-table-column  prop="big_image" label="活动展示大图" width="180">
        <template slot-scope="scope">
  　　　　<img :src="scope.row.big_image" width="40"  class="head_pic"/>
  　　  </template>
      </el-table-column>
      <el-table-column prop="share_image" label="微信转发分享图片"> 
        <template slot-scope="scope">
  　　　　<img :src="scope.row.share_image" width="40"  class="head_pic"/>
  　　  </template>
      </el-table-column>
      <el-table-column prop="bg_image" label="分享成功页面图片">
        <template slot-scope="scope">
  　　　　<img :src="scope.row.bg_image" width="40"  class="head_pic"/>
  　　  </template> </el-table-column>
      <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="small">二维码</el-button>
        <el-button type="text" @click="getpromoteInfo(scope.row)" size="small">编辑</el-button>
        <el-button type="text" @click="enrollment(scope.row.id)" size="small">报名列表</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="flex-cen">
      <el-pagination :hide-on-single-page="true" background @current-change="pageChange" layout="prev, pager, next" :total="total"> </el-pagination>
    </div>
    <div class="suspension" v-if="boxcard">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
          <span>推广活动</span>
        </div>
      <el-form label-width="80px" >
        <el-form-item label="活动标题" >
          <el-input v-model="markerimg.title" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="分享标题" >
          <el-input v-model="markerimg.share_title"  placeholder="请输入微信分享标题"></el-input>
        </el-form-item>
        <el-form-item label="分享次数" >
          <el-input v-model.number="markerimg.share_count"  placeholder="请输入微信分享次数"></el-input>
        </el-form-item>
        <el-form-item label="活动展示大图" >
          <v-upload num="big_image" :image='markerimg.big_image' @upresult='upresult'></v-upload>
        </el-form-item>
        <el-form-item label="微信转发分享图片" >
          <v-upload num='share_image' :image='markerimg.share_image' @upresult='upresult'></v-upload>
        </el-form-item>
        <el-form-item label="分享成功页面图片" >
          <v-upload num='bg_image' :image='markerimg.bg_image' @upresult='upresult'></v-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
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
        promoteList:[],
        promoteId:'',
        markerimg:{},
        page:1,
        total: 0
      }
  },
  mounted(){
    this.getpromoteList()
  },
   methods: {
      pageChange(val){
        console.log(val)
        if(this.page === val) return
        this.page = val
        this.getpromoteList(val)
      },
      enrollment(id){
        this.$router.push({ path: '/enrollment',query:{
          pid:id
        } })
        // this.$router.push({name:'enrollment',params:{pid:id}})
      },
      upresult(data){
        this.markerimg[data.num] = data.image_path
      },
      toggleCard(bl){
        this.boxcard = bl
        this.markerimg = {}
      },
      handleClick(scope){
        this.qrcodeCard = true
        this.getQrcode(scope.date)
      },
      hideQrcode(){
        this.qrcodeCard = false
        this.canCode = false
      },
      getpromoteInfo(scope){
        this.markerimg = JSON.parse(JSON.stringify(scope));
        this.promoteId = scope.id
        this.boxcard = true
      },
      getpromoteList(page = 1){
        let that =this
        that.$request({
          data: {
            page:page,
            page_num:10
          },
          url: 'user/getpromoteList',
          success(res){
            that.promoteList = res.data;
            let retotal= Math.ceil(parseInt(res.total) / 10);
            if (that.total === retotal) return;
            that.total = retotal;
          },
          error(){
          }
        })
      },
      submitForm(){
        if(!this.markerimg.title){
          this.$message({message:'标题不能为空',type:'error' });
          return
        }
        if(!this.markerimg.share_title){
          this.$message({message:'分享标题不能为空',type:'error' });
          return
        }
        if(!this.markerimg.share_count){
          this.$message({message:'分享次数不能为空',type:'error' });
          return
        }
        if(!Number.isInteger(this.markerimg.share_count)){
          this.$message({message:'分享次数必须是数字',type:'error' });
          return
        }
        if(this.promoteId){
          this.editpromote()
        }else{
          this.addpromote()
        }
      },
      editpromote(){
        let that =this;

        that.$request({
          data: that.markerimg,
          url: 'user/editpromote',
          success(res){
            that.boxcard = false
            that.$message({message:'修改成功',type:'success' });
            that.getpromoteList()
          },
          error(code){
            let text = '';
            switch(parseInt(code)){
              case 3001:
                text = '标题不能为空';
                break;
              case 3001:
                text = '标题不能为空';
                break;
              case 3002:
                text = '分享标题不能为空';
                break;
              case 3006:
                text = '活动展示大图图片没有上传过';
                break;
              case 3007:
                text = '微信转发分享图片没有上传过';
                break;
              case 3008:
                text = '分享成功页面图片没有上传过';
                break;
              case 3009:
                text = '分享次数有误';
                break;
              case 3010:
                text = '修改失败';
                break;
              default:
                text = '意料之外的错误';
                break
            }
            that.$message({message:text,type:'error' });
          }
        })
      },
      addpromote(){
        let that =this;
        if(!this.markerimg.big_image){
          this.$message({message:'请上传活动展示大图',type:'error' });
          return
        }
        if(!this.markerimg.share_image){
          this.$message({message:'请上传微信转发分享图片',type:'error' });
          return
        }
        if(!this.markerimg.bg_image){
          this.$message({message:'请上传分享成功页面图片',type:'error' });
          return
        }
        that.$request({
          data: that.markerimg,
          url: 'user/addpromote',
          success(res){
            that.boxcard = false
            that.getpromoteList()
            that.$message({message:'创建成功',type:'success' });
          },
          error(code){
            let text = '';
          switch(parseInt(code)){
            case 3001:
              text = '标题不能为空';
              break;
            case 3002:
              text = '分享标题不能为空';
              break;
            case 3003:
              text = '活动展示大图未上传';
              break;
            case 3004:
              text = '微信转发分享图片未上传';
              break;
            case 3005:
              text = '分享成功页面图片未上传';
              break;
            case 3006:
              text = '活动展示大图图片没有上传过';
              break;
            case 3007:
              text = '微信转发分享图片没有上传过';
              break;
            case 3008:
              text = '分享成功页面图片没有上传过';
              break;
            case 3009:
              text = '分享次数有误';
              break;
            case 3010:
              text = '添加失败';
              break;
            default:
              text = '意料之外的错误';
              break
          }
          that.$message({message:text,type:'error' });
          }
        })
      },
      getQrcode(id){
        let that =this;
        let wapurl = process.env.WAP_URL || WAP_URL, 
            url=wapurl+"?hid="+id+'&pid='+that.$glbalData.userInfo.uid;

        QRcode.toCanvas(document.getElementById('qrcode'), url, function (error) {
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
    .head_pic{
      display: block;
      margin: 0 auto;
    }
    .flex-cen{
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
</style>
