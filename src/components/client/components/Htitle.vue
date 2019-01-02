<style lang='scss' scoped>
.htitle {
  font-size: 16px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  color: #484848;
  font-weight: normal;
  position: relative;
  margin-bottom: 10px;
  margin-left: 22px;
  &::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 2px;
    content: "";
    background: #000;
    left: 0;
    bottom: 0;
    -moz-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
}
</style>
<template>
  <h2 class="htitle">
    <slot></slot>
  </h2>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
