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
    import vHead from './header';
    import vSidebar from './sidebar';
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
              localStorage.setItem('sup_id',res.data.id)
            }
          })
        }
      },
      components:{
          vHead, vSidebar
      }
    }
</script>
