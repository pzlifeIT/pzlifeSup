<template>
  <div id="marketing">
    <!--<el-button class="add" type="primary" @click="toggleCard(true)">新建推广活动</el-button>-->

    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="_sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="_idenity_type" label="证件类型"></el-table-column>
      <el-table-column prop="idenity_nmber" label="证件号"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="getpromoteInfo(scope.row)" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex-cen">
      <el-pagination :hide-on-single-page="true" background @current-change="pageChange" layout="prev, pager, next"
                     :total="total"></el-pagination>
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
        a: '',
        boxcard: false,
        qrcodeCard: false,
        canCode: false,
        image: '',
        list: [],
        promoteId: '',
        markerimg: {},
        page: 1,
        total: 0,
        Mtitle: '推广活动'
      }
    },
    mounted() {
      this.getpromoteList()
    },
    methods: {
      getpromoteList() {
        let that = this
        that.$request({
          data: {
            page: that.page,
            page_num: 10
          },
          url: 'user/getSamplingAppointment',
          success(res) {

            that.list = that.disData(res.data)
            that.total = res.total;
          },
          error() {
          }
        })
      },
      disData(data) {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i].sex == 1) {
            data[i]._sex = '男'
          } else if (data[i].sex == 2) {
            data[i]._sex = '女'
          } else {
            data[i]._sex = '未知'
          }
          if (data[i].idenity_type == 1) {
            data[i]._idenity_type = '身份证'
          } else if (data[i].idenity_type == 2) {
            data[i]._idenity_type = '护照'
          } else {
            data[i]._idenity_type = '未知'
          }
        }
        return data
      },
      pageChange(val) {
        console.log(val)
        if (this.page === val) return
        this.page = val
        this.getpromoteList()
      },
      enrollment(id) {
        this.$router.push({
          path: '/enrollment', query: {
            pid: id
          }
        })
        // this.$router.push({name:'enrollment',params:{pid:id}})
      },
      upresult(data) {
        this.markerimg[data.num] = data.image_path
      },
      handleClick(id, tit = '') {
        this.Mtitle = tit
        this.qrcodeCard = true
        this.getQrcode(id)
      },
      hideQrcode() {
        this.qrcodeCard = false
        this.canCode = false
      },
      getpromoteInfo(scope) {
        this.$router.push({
          path: '/tabble', query: {
            id: scope.id
          }
        })
      },

      submitForm() {
        if (!this.markerimg.title) {
          this.$message({message: '标题不能为空', type: 'error'});
          return
        }
        if (!this.markerimg.share_title) {
          this.$message({message: '分享标题不能为空', type: 'error'});
          return
        }
        // if(!this.markerimg.share_count){
        //   this.$message({message:'分享次数不能为空',type:'error' });
        //   return
        // }
        // if(!Number.isInteger(this.markerimg.share_count)){
        //   this.$message({message:'分享次数必须是数字',type:'error' });
        //   return
        // }
        this.addpromote()
      },
      addpromote() {
        let that = this;
        if (!this.markerimg.big_image) {
          this.$message({message: '请上传活动展示大图', type: 'error'});
          return
        }
        if (!this.markerimg.share_image) {
          this.$message({message: '请上传微信转发分享图片', type: 'error'});
          return
        }
        // if(!this.markerimg.bg_image){
        //   this.$message({message:'请上传分享成功页面图片',type:'error' });
        //   return
        // }
        that.$request({
          data: that.markerimg,
          url: 'user/addpromote',
          success(res) {
            that.boxcard = false
            that.getpromoteList()
            that.$message({message: '创建成功', type: 'success'});
          },
          error(code) {
            let text = '';
            switch (parseInt(code)) {
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
            that.$message({message: text, type: 'error'});
          }
        })
      },
      getQrcode(id) {
        let that = this;
        let wapurl = process.env.WAP_URL || WAP_URL,
          url = wapurl + "?hid=" + id + '&pid=' + that.$glbalData.userInfo.uid;

        QRcode.toCanvas(document.getElementById('qrcode'), url, function (error) {
          if (error) throw new Error(error)
          that.canCode = true
        })
      },
      downImg() {
        downloadIamge(document.getElementById('qrcode').toDataURL("image/png"), '推广活动')
      }
    },
    components: {
      vUpload
    }
  }
</script>

<style lang="less" scoped>
  #marketing {
    .add {
      margin-bottom: 20px;
      cursor: pointer;
    }

    #qrcode {
      width: 200px !important;
      height: 200px !important;
      margin: 0 130px;
    }

    .codebtn {
      width: 100px;
    }

    .head_pic {
      display: block;
      margin: 0 auto;
    }

    .flex-cen {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
