<style lang='scss' scoped>
.home-page {
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
  .banner-row {
    position: relative;
  }
  @media screen and (min-width: 800px) {
    .mecard {
      width: 30%;
      height: 220px;
      float: right;
      background-color: #333;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .banner {
    display: flex;
    height: 220px;
    @media screen and (min-width: 800px) {
      width: 68%;
    }
    @media screen and (max-width: 800px) {
      width: 100%;
    }
    position: relative;
    background: url("../../../assets/imgs/banner.jpg");
    background-size: 100% 100%;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      height: 20px;
      padding: 5px 20px;
      color: #fff;
      text-shadow: 1px 1px #333;
      font-size: 1.2rem;
      line-height: 2em;
      z-index: 9999;
    }
    @media screen and (min-width: 800px) {
      &:after {
        content: "";
        display: block;
        position: absolute;
        background: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: 5px;
      }

      .tome {
        display: block;
      }
    }
    @media screen and (max-width: 800px) {
      .tome {
        display: none;
      }
    }
  }
  .article-list {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
}
</style>
<template>
  <div class="home-page">
    <div class="banner-row">
      <div class="banner">
        <p class="message">人生的战役并不总是属于那些更强更快的人,但迟早，有一种人会取得胜利那就是相信自己的</p>
        <p class="tome">---送给自己 2018.XX.XX</p>
      </div>
      <div class="mecard">
        <img
          src="../../../assets/imgs/item1.jpg"
          alt
          style="height: 100%;width: 100%;border-radius: 5px;"
        >
      </div>
    </div>
    <div class="article-list">
      <Htitle>最新博文内容</Htitle>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
    </div>
  </div>
</template>
<script>
import Htitle from "../components/Htitle";
import Article from "../components/ArticleCard";
export default {
  data() {
    return {};
  },
  components: { Article, Htitle }
};
</script>
