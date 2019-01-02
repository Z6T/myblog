<style lang='scss' scoped>
.home-page {
  padding: 20px;
  .yearlist {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    section {
      padding: 25px 20px 0;
      .yeartitle-list {
        list-style: square;
        margin-left: 20px;
        li {
          margin: 10px 0;
          a {
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="home-page" id="xxxFullScreen">
    <div class="yearlist">
      <Htitle>时光轴历史文章</Htitle>
      <section class="oneyear-list">
        <h4>2018年10月</h4>
        <ul class="yeartitle-list">
          <li>
            <a class="arti-title" href>《ECMAScript6入门》学习笔记之函数的扩展</a>
          </li>
          <li>
            <a class="arti-title" href>《ECMAScript6入门》学习笔记之函数的扩展</a>
          </li>
        </ul>
      </section>
      <section class="oneyear-list">
        <h4>2018年10月</h4>
        <ul class="yeartitle-list">
          <li>
            <a class="arti-title" href>《ECMAScript6入门》学习笔记之函数的扩展</a>
          </li>
          <li>
            <a class="arti-title" href>《ECMAScript6入门》学习笔记之函数的扩展</a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import Htitle from "../components/Htitle";
export default {
  data() {
    return {};
  },
  components: { Htitle }
};
</script>
