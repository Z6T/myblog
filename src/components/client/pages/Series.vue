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
          margin: 14px 0;
          &:hover {
            list-style-type: hiragana;
          }
          a {
            position: relative;
            text-decoration: none;
            &:hover::after {
              width: 100%;
              transform: rotate(0deg);
            }
            &::after {
              transition: all 0.5s;
              content: "";
              height: 1px;
              background: #0770fe;
              width: 0%;
              position: absolute;
              left: 0%;
              bottom: -6px;
              transform: rotate(-20deg);
            }
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
      <Htitle>知识系列专栏</Htitle>
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
