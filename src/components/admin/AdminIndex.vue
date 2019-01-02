<style lang='sass' scoped>


</style>
<template>
  <div>
    <Headnav></Headnav>
    <router-view></router-view>
  </div>
</template>
<script>
import Headnav from "./common/Headnva";
export default {
  data() {
    return {};
  },
  components: { Headnav }
};
</script>
