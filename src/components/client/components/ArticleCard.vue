<style lang='scss' scoped>
article {
  cursor: pointer;
  padding: 25px 20px;
  border-bottom: 1px solid #e9e9e9;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 11px 20px #ddd;
  }
  h1 {
    font-size: 21px;
    margin-bottom: 10px;
    a {
      color: #333;
      text-decoration: none;
      position: relative;
      &::after {
        transition: all 0.5s;
        content: "";
        height: 2px;
        background: #0770fe;
        width: 0%;
        position: absolute;
        left: 50%;
        bottom: -6px;
        transform: translate(-50%);
      }
      &:hover::after {
        width: 100%;
      }
    }
  }
  p {
    color: #777;
    line-height: 1.7rem;
    font-size: 1.1rem;
    margin: 15px 0px;
  }
  .article-info {
    overflow: hidden;
    div {
      float: left;
      a {
        text-decoration: none;
        float: left;
        padding: 0px 6px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #056eff;
        color: #056eff;
        font-size: 0.8rem;
        border-radius: 5px;
        margin-right: 5px;
        position: relative;
        transition: all 0.3s;
        &:hover {
          background-color: #007aff;
          color: #fff;
        }
      }
    }
    .pubtime {
      background-size: 22px;
      font-size: 16px;
      @media screen and (min-width: 800px) {
        padding-left: 16px;
      }
      float: left;
      display: block;
      margin: 0px 0px 0px 7px;
      line-height: 25px;
      color: #aaa;
      font-weight: bold;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
<template>
  <div>
    <article v-for="item in articlelist" :key="item._id">
      <router-link :to="'/archives/'+item._id">
      <h1>
        <a href="#">{{item.a_title}}</a>
      </h1>
      <p class="introduction">{{item.a_desc}}</p>
      <div class="article-info">
        <div class="tags">
          <a href="#" v-for="(type,index) in item.a_type" :key="index">{{type}}</a>
          <!-- <a href="#">typescript</a> -->
        </div>
        <div class="pubtime">
          <i class="el-icon-time" style="font-size:18px;vertical-align: text-bottom"></i>
          {{item.a_pubdate.substring(0,10)}}</div>
      </div>
      </router-link>
    </article>
  </div>
</template>
<script>
import animate from "animate.css";

export default {
  props: {
    articlelist: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
