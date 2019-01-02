<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import animate from "animate.css";
import axios from "axios";
export default {
  name: "App",
  created() {
    // axios.interceptors.request.use(
    //   function(config) {
    //     //在发送请求之前做某事
    //     console.log(config);
    //     return config;
    //   },
    //   function(error) {
    //     //请求错误时做些事
    //   }
    // );
  }
};
</script>

<style>
</style>
