<template>
  <div id="marketing">
    <!--<el-button class="add" type="primary" @click="toggleCard(true)">新建推广活动</el-button>-->

    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="_sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="_idenity_type" label="证件类型"></el-table-column>
      <el-table-column prop="idenity_nmber" label="证件号"></el-table-column>
      <el-table-column prop="appointment_time" label="预约时间"></el-table-column>
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
          error(code) {
            that.$message.error('错误码：'+code)
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
    },
    components: {
      vUpload
    }
  }
</script>

<style lang="less" scoped>
  #marketing {
    margin-top: 26px;
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
