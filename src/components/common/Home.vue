<template>
    <div class="wrapper">
        <v-head :name='name'></v-head>
         <v-sidebar></v-sidebar>
        
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header';
    import vSidebar from './Sidebar';
    export default {
      data () {
        return {
          name:''
        }
      },
      mounted () {
        this.getuserInfo()
      },
      methods: { 
        getuserInfo(){
          let that = this;
          that.$request({
            url:'user/getsupuser',
            success:function(res){
                that.$glbalData.userInfo = res.data || {};
                that.name = res.data.sup_name
            }
          })
        }
      },
      components:{
          vHead, vSidebar
      }
    }
</script>
