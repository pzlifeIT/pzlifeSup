webpackJsonp([1],{174:function(e,t,r){r(254);var a=r(77)(r(238),r(264),"data-v-289756e5",null);e.exports=a.exports},179:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},182:function(e,t,r){e.exports=!r(184)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},184:function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},185:function(e,t){var r=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},188:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["num","image"],data:function(){return{imaegUrl:""}},watch:{image:function(e){this.imaegUrl=this.image}},mounted:function(){this.imaegUrl=this.image},methods:{fileShow:function(){document.querySelector("#fileinp"+this.num).click()},fileChange:function(e){var t=e.target.files||e.dataTransfer.files,r=this;r.imageDeal(t[0],function(e){r.uploadfile(e)})},uploadfile:function(e){var t=this,r=new FormData;r.append("image",e),t.$request({data:r,url:"upload/uploadfile",success:function(e){console.log(t.num),t.imaegUrl=e.image_path||"",t.$emit("upresult",{image_path:e.image_path,num:t.num})},complete:function(e){document.querySelector("#fileinp"+t.num).value=""},error:function(){t.$emit("upresult",{num:t.num})}})},imageDeal:function(e,t){var r=this,a=e;if(void 0!=a){if(a.size<=1048576)return void t(a);var i=new FileReader;i.readAsDataURL(a),i.onload=function(e){var a=e.target.result;console.log("压缩前："+a.length),r.suofang(a,1.5,t)}}},suofang:function(e){function t(t,r,a){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e,t,r){console.log("执行缩放程序,bili="+t);var a=new Image,i=this;a.src=e,a.onload=function(){var e=document.createElement("canvas"),a=this.width/t,n=this.height/t;e.setAttribute("width",a),e.setAttribute("height",n),e.getContext("2d").drawImage(this,0,0,a,n);var o=e.toDataURL("image/jpeg");e.toBlob(function(e){if(e.size>1048576)suofang(o,t,r);else{var a=parseInt(1e5*Math.random()),n=i.dataURLtoFile(o,a+".jpg");r(e,n)}},"image/jpeg")}}),dataURLtoFile:function(e,t){for(var r=e.split(","),a=r[0].match(/:(.*?);/)[1],i=atob(r[1]),n=i.length,o=new Uint8Array(n);n--;)o[n]=i.charCodeAt(n);return new File([o],t,{type:a})}}}},190:function(e,t,r){e.exports={default:r(191),__esModule:!0}},191:function(e,t,r){r(204),e.exports=r(78).Number.isInteger},192:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},193:function(e,t,r){var a=r(179);e.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!");return e}},194:function(e,t,r){var a=r(192);e.exports=function(e,t,r){if(a(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,a){return e.call(t,r,a)};case 3:return function(r,a,i){return e.call(t,r,a,i)}}return function(){return e.apply(t,arguments)}}},195:function(e,t,r){var a=r(179),i=r(185).document,n=a(i)&&a(i.createElement);e.exports=function(e){return n?i.createElement(e):{}}},196:function(e,t,r){var a=r(185),i=r(78),n=r(194),o=r(198),s=r(197),c=function(e,t,r){var u,l,m,p=e&c.F,f=e&c.G,d=e&c.S,g=e&c.P,h=e&c.B,v=e&c.W,_=f?i:i[t]||(i[t]={}),b=_.prototype,y=f?a:d?a[t]:(a[t]||{}).prototype;f&&(r=t);for(u in r)(l=!p&&y&&void 0!==y[u])&&s(_,u)||(m=l?y[u]:r[u],_[u]=f&&"function"!=typeof y[u]?r[u]:h&&l?n(m,a):v&&y[u]==m?function(e){var t=function(t,r,a){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,a)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(m):g&&"function"==typeof m?n(Function.call,m):m,g&&((_.virtual||(_.virtual={}))[u]=m,e&c.R&&b&&!b[u]&&o(b,u,m)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},197:function(e,t){var r={}.hasOwnProperty;e.exports=function(e,t){return r.call(e,t)}},198:function(e,t,r){var a=r(201),i=r(202);e.exports=r(182)?function(e,t,r){return a.f(e,t,i(1,r))}:function(e,t,r){return e[t]=r,e}},199:function(e,t,r){e.exports=!r(182)&&!r(184)(function(){return 7!=Object.defineProperty(r(195)("div"),"a",{get:function(){return 7}}).a})},200:function(e,t,r){var a=r(179),i=Math.floor;e.exports=function(e){return!a(e)&&isFinite(e)&&i(e)===e}},201:function(e,t,r){var a=r(193),i=r(199),n=r(203),o=Object.defineProperty;t.f=r(182)?Object.defineProperty:function(e,t,r){if(a(e),t=n(t,!0),a(r),i)try{return o(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(e[t]=r.value),e}},202:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},203:function(e,t,r){var a=r(179);e.exports=function(e,t){if(!a(e))return e;var r,i;if(t&&"function"==typeof(r=e.toString)&&!a(i=r.call(e)))return i;if("function"==typeof(r=e.valueOf)&&!a(i=r.call(e)))return i;if(!t&&"function"==typeof(r=e.toString)&&!a(i=r.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},204:function(e,t,r){var a=r(196);a(a.S,"Number",{isInteger:r(200)})},205:function(e,t,r){t=e.exports=r(170)(),t.push([e.i,".el-icon-plus[data-v-d62cc4e8]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.el-icon-plus[data-v-d62cc4e8]:hover{border-color:#409eff}.avatar-uploader-icon[data-v-d62cc4e8]{font-size:28px;color:#8c939d;width:60px;height:60px;line-height:60px;text-align:center}.avatar[data-v-d62cc4e8]{width:60px;height:60px;display:block;cursor:pointer}.add[data-v-d62cc4e8]{margin-bottom:20px}",""])},206:function(e,t,r){var a=r(205);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(171)("f44f7f54",a,!0)},207:function(e,t,r){r(206);var a=r(77)(r(188),r(208),"data-v-d62cc4e8",null);e.exports=a.exports},208:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:e.num}},[e.imaegUrl?r("img",{staticClass:"avatar",attrs:{src:e.imaegUrl},on:{click:e.fileShow}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon",on:{click:e.fileShow}}),e._v(" "),r("input",{staticClass:"hide",attrs:{type:"file",name:"",id:"fileinp"+e.num},on:{change:e.fileChange}})])},staticRenderFns:[]}},238:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(190),i=r.n(a),n=r(207),o=r.n(n);t.default={data:function(){return{activeName:"first",id:"",imgList:[],image_path:"",markerimg:{},page:1,total:0,sort_num:0,image_card:!1,sort_card:!1,preview_card:!1}},mounted:function(){this.id=this.$route.query.id,this.getpromoteInfo(),this.getPromoteimagedetail()},methods:{handleClick:function(){},showImg:function(){this.image_card=!0,this.image_path=""},hideImg:function(){this.image_card=!1},showSort:function(e){this.image_path=e.image_path,this.sort_num=e.order_by,this.sort_card=!0},hideSort:function(){this.image_path="",this.sort_num="",this.sort_card=!1},showPreview:function(){this.preview_card=!0},hidePreview:function(){this.preview_card=!1},getPromoteimagedetail:function(){var e=this;e.$request({data:{promote_id:e.id},url:"promote/getPromoteimagedetail",success:function(t){e.imgList=t.detail},error:function(){}})},getpromoteInfo:function(){var e=this;e.$request({data:{id:e.id},url:"user/getpromoteinfo",success:function(t){e.markerimg=t.data},error:function(){}})},submitImg:function(){if(!this.markerimg.title)return void this.$message({message:"标题不能为空",type:"error"});this.uploadPromoteImages()},submitSort:function(){return this.sort_num?i()(this.markerimg.share_count)?this.markerimg.share_count>=1e3?void this.$message({message:"排序不能超过3位数字",type:"error"}):void this.sortPromoteimagedetail():void this.$message({message:"排序必须是数字",type:"error"}):void this.$message({message:"排序不能为空",type:"error"})},sortPromoteimagedetail:function(){var e=this;e.$request({data:{image_path:e.image_path,order_by:e.sort_num},url:"promote/sortPromoteimagedetail",success:function(t){e.sort_card=!1,e.getPromoteimagedetail(),e.$message({message:"修改成功",type:"success"})},error:function(t){var r="";switch(parseInt(t)){case 3001:r="图片不能为空";break;case 3002:r="图片不存在";break;case 3003:r="排序只能为数字且不超过3位数字";break;case 3004:r="上传失败";break;default:r="意料之外的错误"}e.$message({message:r,type:"error"})}})},uploadPromoteImages:function(){var e=this,t=new FormData;t.append("image_type",1),t.append("promote_id",e.id),t.append("images[]",e.image_path),e.$request({data:t,url:"promote/uploadPromoteImages",success:function(t){e.image_card=!1,e.getPromoteimagedetail(),e.$message({message:"添加成功",type:"success"})},error:function(t){var r="";switch(parseInt(t)){case 3001:r="图片类型有误";break;case 3002:r="商品id只能是数字";break;case 3003:r="图片不能空";break;case 3004:r="商品不存在";break;case 3005:r="图片没有上传过";break;case 3006:r="上传失败";break;default:r="意料之外的错误"}e.$message({message:r,type:"error"})}})},submitForm:function(){return this.markerimg.title?this.markerimg.share_title?this.markerimg.share_count?i()(this.markerimg.share_count)?void this.editpromote():void this.$message({message:"分享次数必须是数字",type:"error"}):void this.$message({message:"分享次数不能为空",type:"error"}):void this.$message({message:"分享标题不能为空",type:"error"}):void this.$message({message:"标题不能为空",type:"error"})},editpromote:function(){var e=this;e.$request({data:e.markerimg,url:"user/editpromote",success:function(t){e.boxcard=!1,e.$message({message:"修改成功",type:"success"}),e.getpromoteInfo()},error:function(t){var r="";switch(parseInt(t)){case 3001:case 3001:r="标题不能为空";break;case 3002:r="分享标题不能为空";break;case 3006:r="活动展示大图图片没有上传过";break;case 3007:r="微信转发分享图片没有上传过";break;case 3008:r="分享成功页面图片没有上传过";break;case 3009:r="分享次数有误";break;case 3010:r="修改失败";break;default:r="意料之外的错误"}e.$message({message:r,type:"error"})}})},delImg:function(e){if(!e)throw new Error("img 未拿到值");var t=this;t.$request({data:{image_path:e},url:"promote/delPromoteImage",success:function(e){t.getPromoteimagedetail(),t.$message({message:"删除成功",type:"success"})},error:function(e){var r="";switch(parseInt(e)){case 3001:r="删除失败";break;default:r="意料之外的错误"}t.$message({message:r,type:"error"})}})},upresult:function(e){"image_path"==e.num?this.image_path=e.image_path:this.markerimg[e.num]=e.image_path}},components:{vUpload:o.a}}},246:function(e,t,r){t=e.exports=r(170)(),t.push([e.i,".btn[data-v-289756e5]{width:200px}.box-card[data-v-289756e5]{margin-top:30px;width:600px}.img-con[data-v-289756e5]{display:block;margin:0 auto}.add[data-v-289756e5]{margin-bottom:20px;cursor:pointer}.el-icon-view[data-v-289756e5]{font-size:18px}.imgpreview[data-v-289756e5]{max-height:600px;overflow:auto}",""])},254:function(e,t,r){var a=r(246);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(171)("71b7c4b3",a,!0)},264:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"editMarketing"}},[r("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"基本信息",name:"first"}},[r("div",{staticClass:"box-card"},[r("el-form",{attrs:{"label-width":"80px"}},[r("el-form-item",{attrs:{label:"活动标题"}},[r("el-input",{attrs:{placeholder:"请输入活动标题"},model:{value:e.markerimg.title,callback:function(t){e.$set(e.markerimg,"title",t)},expression:"markerimg.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"分享标题"}},[r("el-input",{attrs:{placeholder:"请输入微信分享标题"},model:{value:e.markerimg.share_title,callback:function(t){e.$set(e.markerimg,"share_title",t)},expression:"markerimg.share_title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"分享次数"}},[r("el-input",{attrs:{placeholder:"请输入微信分享次数"},model:{value:e.markerimg.share_count,callback:function(t){e.$set(e.markerimg,"share_count",e._n(t))},expression:"markerimg.share_count"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"活动展示大图"}},[r("v-upload",{attrs:{num:"big_image",image:e.markerimg.big_image},on:{upresult:e.upresult}})],1),e._v(" "),r("el-form-item",{attrs:{label:"微信转发分享图片"}},[r("v-upload",{attrs:{num:"share_image",image:e.markerimg.share_image},on:{upresult:e.upresult}})],1),e._v(" "),r("el-form-item",{attrs:{label:"分享成功页面图片"}},[r("v-upload",{attrs:{num:"bg_image",image:e.markerimg.bg_image},on:{upresult:e.upresult}})],1),e._v(" "),r("el-form-item",{staticClass:"flex-cen"},[r("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("保存")])],1)],1)],1)]),e._v(" "),r("el-tab-pane",{attrs:{label:"活动详情图",name:"second"}},[r("el-button",{staticClass:"add",attrs:{type:"primary"},on:{click:function(t){return e.showImg()}}},[e._v("添加详情图")]),e._v(" "),r("el-button",{staticClass:"fr add",attrs:{type:"primary"},on:{click:function(t){return e.showPreview()}}},[r("i",{staticClass:"el-icon-view"})]),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.imgList,border:""}},[r("el-table-column",{attrs:{type:"index",label:"序号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"image_path",label:"图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticClass:"img-con",attrs:{src:e.row.image_path,width:"40"}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"order_by",label:"排序"}}),e._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"上传时间"}}),e._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.showSort(t.row)}}},[e._v("排序")]),e._v(" "),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return e.delImg(t.row.image_path)}}},[e._v("删除")])]}}])})],1)],1)],1),e._v(" "),e.image_card?r("div",{staticClass:"suspension"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("图片")])]),e._v(" "),r("el-form",{attrs:{"label-width":"80px"}},[r("el-form-item",{attrs:{label:"图片"}},[r("v-upload",{attrs:{num:"image_path",image:e.image_path},on:{upresult:e.upresult}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitImg()}}},[e._v("保存")]),e._v(" "),r("el-button",{on:{click:function(t){return e.hideImg(!1)}}},[e._v("取消")])],1)],1)],1)],1):e._e(),e._v(" "),e.sort_card?r("div",{staticClass:"suspension"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("排序")])]),e._v(" "),r("el-form",{attrs:{"label-width":"80px"}},[r("el-form-item",{attrs:{label:"排序"}},[r("el-input",{attrs:{placeholder:"请输入排序数字"},model:{value:e.sort_num,callback:function(t){e.sort_num=e._n(t)},expression:"sort_num"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitSort()}}},[e._v("保存")]),e._v(" "),r("el-button",{on:{click:function(t){return e.hideSort(!1)}}},[e._v("取消")])],1)],1)],1)],1):e._e(),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.preview_card,expression:"preview_card"}],staticClass:"suspension"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("图片预览")])]),e._v(" "),r("el-form",{attrs:{"label-width":"1px"}},[r("el-form-item",{staticClass:"imgpreview",attrs:{label:""}},e._l(e.imgList,function(e,t){return r("el-image",{key:t,staticClass:"elImg fl",attrs:{src:e.image_path}})}),1),e._v(" "),r("el-form-item",[r("el-button",{on:{click:function(t){return e.hidePreview()}}},[e._v("取消")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});