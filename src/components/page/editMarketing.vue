<template>
  <div id="editMarketing">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
      <div class="box-card">
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
            <v-upload num='big_image' :image='markerimg.big_image' @upresult='upresult'></v-upload>
          </el-form-item>
          <el-form-item label="微信转发分享图片" >
            <v-upload num='share_image' :image='markerimg.share_image' @upresult='upresult'></v-upload>
          </el-form-item>
          <el-form-item label="分享成功页面图片" >
            <v-upload num='bg_image' :image='markerimg.bg_image' @upresult='upresult'></v-upload>
          </el-form-item>
          <el-form-item class="flex-cen">
            <el-button class="btn" type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </el-form>
        </div>
    </el-tab-pane>
    <el-tab-pane label="活动详情图" name="second">
      <el-button class="add" type="primary" @click="showImg()">添加详情图</el-button>
      <el-table :data="imgList" border style="width: 100%">
      <el-table-column  type="index" label="序号"></el-table-column>
      <el-table-column  prop="image_path" label="图片" >
        <template slot-scope="scope">
  　　　　<img :src="scope.row.image_path" width="40"  class="img-con"/>
  　　  </template>
      </el-table-column>
      <el-table-column  prop="order_by" label="排序" ></el-table-column>
      <el-table-column  prop="create_time" label="上传时间" ></el-table-column>
      <el-table-column  prop="create_time" label="操作" >
        <template slot-scope="scope">
        <el-button type="text" @click="showSort(scope.row)" size="small">排序</el-button>
        <el-button type="text" @click="delImg(scope.row.image_path)" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
  <div class="suspension" v-if="image_card">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>图片</span>
          </div>
        <el-form label-width="80px" >
          <el-form-item label="图片" >
            <v-upload num='image_path' :image='image_path' @upresult='upresult'></v-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitImg()">保存</el-button>
            <el-button @click="hideImg(false)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="suspension" v-if="sort_card">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>排序</span>
          </div>
        <el-form label-width="80px" >
          <el-form-item label="排序">
            <el-input v-model.number="sort_num" placeholder="请输入排序数字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSort()">保存</el-button>
            <el-button @click="hideSort(false)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import vUpload from '../common/upload';
export default {
  data() {
      return {
        activeName: 'first',
        id:'',
        imgList:[],
        image_path:'',
        markerimg:{},
        page:1,
        total:0,
        sort_num:0,
        image_card:false,
        sort_card:false
      }
  },
  mounted(){
      this.id = this.$route.query.id;
      this.getpromoteInfo()
      this.getPromoteimagedetail()
  },
  methods: {
    handleClick(){
      
    },
    showImg(){
        this.image_card = true
        this.image_path = ''
    },
    hideImg(){
        this.image_card = false
    },
    showSort(scope){
      this.image_path = scope.image_path
      this.sort_num = scope.order_by
      this.sort_card = true
    },
    hideSort(){
      this.image_path = ''
      this.sort_num = ''
      this.sort_card = false
    },
    getPromoteimagedetail(){
        let that =this
        that.$request({
          data: {
            promote_id:that.id,
          },
          url: 'promote/getPromoteimagedetail',
          success(res){
            that.imgList = res.detail;
          },
          error(){
          }
        })
    },
    getpromoteInfo(){
      let that =this
        that.$request({
          data: {
            id:that.id
          },
          url: 'user/getpromoteinfo',
          success(res){
            that.markerimg = res.data
          },
          error(){
          }
        })
    },
    submitImg(){
      if(!this.markerimg.title){
          this.$message({message:'标题不能为空',type:'error' });
          return
      }
      this.uploadPromoteImages()
    },
    submitSort(){ 
      if(!this.sort_num){
        this.$message({message:'排序不能为空',type:'error' });
        return
      }
      if(!Number.isInteger(this.markerimg.share_count)){
          this.$message({message:'排序必须是数字',type:'error' });
          return
      }
      if(this.markerimg.share_count >=1000){
          this.$message({message:'排序不能超过3位数字',type:'error' });
          return
      }
      this.sortPromoteimagedetail()
    },
    sortPromoteimagedetail(){
      let that =this;
        that.$request({
          data: {
            image_path:that.image_path,
            order_by:that.sort_num
          },
          url: 'promote/sortPromoteimagedetail',
          success(res){
            that.sort_card = false
            that.getPromoteimagedetail()
            that.$message({message:'修改成功',type:'success' });
          },
          error(code){
            let text = '';
            switch(parseInt(code)){
              case 3001:
                text = '图片不能为空';
                break;
              case 3002:
                text = '图片不存在';
                break;
              case 3003:
                text = '排序只能为数字且不超过3位数字';
                break;
              case 3004:
                text = '上传失败';
                break;
              default:
                text = '意料之外的错误';
                break
            }
            that.$message({message:text,type:'error' });
          }
        })
    },
    uploadPromoteImages(){
      let that =this,formData = new FormData();
            formData.append('image_type', 1)
            formData.append('promote_id', that.id)
        formData.append('images[]', that.image_path)
        that.$request({
          data: formData,
          url: 'promote/uploadPromoteImages',
          success(res){
            that.image_card = false
            that.getPromoteimagedetail()
            that.$message({message:'添加成功',type:'success' });
            
            // that.getpromoteInfo()
          },
          error(code){
            let text = '';
            switch(parseInt(code)){
              case 3001:
                text = '图片类型有误';
                break;
              case 3002:
                text = '商品id只能是数字';
                break;
              case 3003:
                text = '图片不能空';
                break;
              case 3004:
                text = '商品不存在';
                break;
              case 3005:
                text = '图片没有上传过';
                break;
              case 3006:
                text = '上传失败';
                break;
              default:
                text = '意料之外的错误';
                break
            }
            that.$message({message:text,type:'error' });
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
        this.editpromote()
      },
      editpromote(){
        let that =this;
        that.$request({
          data: that.markerimg,
          url: 'user/editpromote',
          success(res){
            that.boxcard = false
            that.$message({message:'修改成功',type:'success' });
            that.getpromoteInfo()
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
    delImg(img){
      if(!img) throw new Error('img 未拿到值')
      let that =this;
        that.$request({
          data: {
            image_path:img
          },
          url: 'promote/delPromoteImage',
          success(res){
            that.getPromoteimagedetail()
            that.$message({message:'删除成功',type:'success' });
          },
          error(code){
            let text = '';
            switch(parseInt(code)){
              case 3001:
                text = '删除失败';
                break;
              default:
                text = '意料之外的错误';
                break
            }
            that.$message({message:text,type:'error' });
          }
        })
    },
    upresult(data){
      if(data.num == 'image_path'){
        this.image_path = data.image_path
      }else{
        this.markerimg[data.num] = data.image_path
      }
       
    },
  },
  components:{
    vUpload
  }
}
</script>

<style lang="less" scoped>
#editMarketing{
  // background-color: #fff;
}
.btn{
  width: 200px;
}
.box-card{
  margin-top: 30px;
  width: 600px;
}
.img-con{
  display: block;
  margin: 0 auto;
}
.add{
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
