<template>
  <div class="tcontent">
    <div class="title">检测样本接收单详情</div>
    <div class="number">样本接收单编号：</div>
    <table class="tablel" border="1">
      <tr>
        <td>姓名：{{info.name}}</td>
        <td>个人码：</td>
        <td v-if="info.sex==1">性别：男</td>
        <td v-else-if="info.sex==2">性别：女</td>
        <td>年龄：{{info.age}}</td>
      </tr>
      <tr>
        <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时-->
        <td colspan="2">采样时间：</td>
        <td colspan="2">采样机构编号：</td>
      </tr>
      <tr v-for="(v,k) in arr " :key="k">
        <td class="td-title">检<br>测<br>项<br>目<br>内<br>容</td>
        <td colspan="3" class="td-content">
          <div class="left-center">{{v}}</div>
          <!--<div class="td-left">（国纳）项目检测条码</div>-->
          <div class="td-left">（粘贴千麦）项目条码</div>
        </td>
      </tr>
    </table>
    <div class="people">接收员签收：</div>
    <div class="people mr">签收时间：</div>
    <el-dialog
      title="核验"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form>
        <el-form-item label="安全码：">
          <el-input v-model="code" placeholder="请输入安全码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click='checked'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "table",
    data() {
      return {
        id: '',
        info: {},
        project: [],
        group: [],
        arr: [],
        code: '',
        dialogVisible: true,
        time: '',
        state: ''
      }
    },
    created() {
      this.id = this.$route.query.id
      this.time = this.$route.query.time
      if (this.$route.query.code) {
        this.state = false
        this.dialogVisible = true
      } else {
        this.state = true
        this.dialogVisible = false
        this.getInfo()
      }

    },
    mounted() {


    },
    methods: {
      checked() {
        let that = this
        that.$request({
          url: 'user/verifySamplingAppointment',
          data: {
            id: that.id,
            time: that.time,
            safe_code: that.code
          },
          success(res) {
            that.dialogVisible = false
            that.state = true
            that.getInfo()
          }
        })
      },
      getInfo() {
        let that = this
        that.$request({
          url: 'user/getSamplingAppointmentInfo',
          data: {
            id: that.id
          },
          success(res) {
            that.info = res.result
            that.project = res.result.project_id.split(',')
            that.group = res.result.projects
            that.dis(that.project, that.group)
          },
          error(code) {
            that.$message.error('错误码：' + code)
          }
        })
      },
      dis(pro, group) {
        let arr = []
        for (let i = 0; i < pro.length; i++) {
          for (let j = 0; j < group.length; j++) {
            for (let k in group[j]) {
              if (pro[i] == k) {
                arr.push(group[j][k])
              }
            }
          }
        }
        this.arr = arr
      }
    }
  }
</script>

<style scoped>
  .tcontent {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .title {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
  }

  .number {
    width: 80%;
    margin: 20px auto 0;
    font-size: 12px;
  }

  .tablel {
    width: 80%;
    margin: 0 auto;
    font-size: 12px;
  }

  td {
    padding: 10px;
    box-sizing: border-box;
  }

  .td-title {
    /*width: 6%;*/
    text-align: center;
  }

  .td-content {
    height: 230px;
    position: relative;
  }

  .td-left {
    /*float: left;*/
    width: 50%;
    /*line-height: 450px;*/
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
  }

  .td-right {
    /*float: right;*/
    width: 50%;
    /*line-height: 450px;*/
    text-align: center;
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  .people {
    text-align: right;
    margin-top: 20px;
    font-size: 12px;
    padding-right: 400px;
    box-sizing: border-box;
  }

  .left-center {
    width: 50%;
    text-align: center;
    position: absolute;
    top: 20px;
    left: 0;
  }

  .mr {
    margin-top: 10px;
  }
</style>
