<template>
    <div class="" :id='num'>
        <img v-if="imaegUrl" :src="imaegUrl" @click="fileShow" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"  @click="fileShow"></i>
        <input class="hide" type="file" @change="fileChange" name="" :id="'fileinp'+num">
    </div>
</template>

<script>

export default {
  props: ['num','image'],
  data(){
    return{
      imaegUrl:''
    }
  },
  watch: {
    'image': function(newVal){
        this.imaegUrl = this.image
    },
  },
  mounted(){
    this.imaegUrl = this.image
  },
  methods: {
    fileShow(){
      document.querySelector('#fileinp'+this.num).click()
    },
    fileChange(e){
      let files = e.target.files || e.dataTransfer.files,that =this;
      that.imageDeal(files[0],function(file1) {
        that.uploadfile(file1)
      })
    },
    uploadfile(file){
      let that = this,formdata = new FormData();
      formdata.append('image', file);
      that.$request({
        data: formdata,
        url: 'upload/uploadfile',
        success(res){
          console.log(that.num)
           that.imaegUrl = res.image_path || ''
           that.$emit('upresult',{
            image_path: res.image_path,
            num:that.num
          })
        },
        complete(res){
            document.querySelector('#fileinp'+that.num).value = ''
        },
        error(){
          that.$emit('upresult',{num:that.num})
        }
      })
    },
    imageDeal(files, returnBase64) {
        //获取file，转成base64	
        let that =this
        var file = files;
        //取传入的第一个文件
        //如果未找到文件，结束函数，跳出			
        if (undefined == file) return;
        
        if (file.size <= 1048576) {
            returnBase64(file)
            return
        }
        var r = new FileReader();
        r.readAsDataURL(file);
        r.onload = function(e) {
            var base64 = e.target.result;
            var bili = 1.5;
            console.log("压缩前：" + base64.length);
            that.suofang(base64, bili, returnBase64);
        }
    },
    suofang(base64, bili, callback) {
        console.log("执行缩放程序,bili=" + bili); //处理缩放，转格式	
        var _img = new Image();
        let that =this;
        _img.src = base64;
        _img.onload = function() {
            var _canvas = document.createElement("canvas");
            var w = this.width / bili;
            var h = this.height / bili;
            _canvas.setAttribute("width", w);
            _canvas.setAttribute("height", h);
            _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
            var base64 = _canvas.toDataURL("image/jpeg");
            _canvas.toBlob(function(blob) {
                if (blob.size > 1024 * 1024) {
                    suofang(base64, bili, callback);
                } else {
                    let m = parseInt(Math.random() * 100000)
                    let file = that.dataURLtoFile(base64, m + '.jpg')
                    callback(blob, file);
                }
            }, "image/jpeg");
        }
    },
    dataURLtoFile(dataurl, filename) { //将base64转换为文件
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

  }
}
</script>
<style lang="less" scoped>
.el-icon-plus {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
}
  .el-icon-plus:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
  cursor: pointer;
}
.add{
  margin-bottom: 20px;
}
</style>

