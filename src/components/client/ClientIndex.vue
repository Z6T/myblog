<template>
  <div>
    <Headnav></Headnav>
    <transition appear appear-active-class="animated swing" >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Headnav from "./common/Headnav";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: { Headnav },
  created(){
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
