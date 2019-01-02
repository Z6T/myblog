<style lang='scss' scoped>
@media screen and (min-width: 800px) {
  .wrapper {
    width: 100%;
    background: #333;
    &:before {
      background: #000
        linear-gradient(
          to right,
          #4cd964,
          #5ac8fa,
          #007aff,
          #34aadc,
          #5856d6,
          #ff2d55
        );
      content: "";
      height: 5px;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
  header {
    margin: 5px auto 0;
    max-width: 1200px;
  }
  .logo {
    float: left;
    font-size: 32px;
    line-height: 50px;
    a {
      color: white;
      text-decoration: none;
    }
  }
  .nav_list {
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(51, 51, 51);
    padding: 10px;
    padding-left: 150px;
    li {
      transition: all 0.5s;
      display: inline-block;
      margin: 0 20px;
      height: 30px;
      cursor: pointer;
      color: white;
      line-height: 30px;
      &:not(:first-child):hover {
        color: #00c1de;
        border-bottom: 2px solid #00c1de;
      }
      &:first-child a {
        color: white;
        text-decoration: none;
        font-size: 20px;
      }
    }
  }
  li.li_active {
    border-bottom: 2px solid #00c1de;
    color: #00c1de;
  }
}
@media screen and (max-width: 800px) {
  li.li_active {
    border-bottom: 2px solid #00c1de;
    color: #00c1de;
    background: #49606b;
  }
  header {
    height: 3rem;
    line-height: 3rem;
    .logo {
      position: relative;
      text-align: center;
      background: #000;
      a {
        text-decoration: none;
        font-size: 2rem;
        color: #fff;
      }
      .more {
        height: 2rem;
        width: 3rem;
        position: absolute;
        top: 0.55rem;
        left: 0.5rem;
        color: #fff;
        display: inline-block;
        background: url("../../../assets/imgs/more.png") no-repeat;
        background-size: 67%;
      }
    }
    .nav_list {
      background-color: #106377;
      z-index: 222;
      line-height: 3rem;
      position: absolute;
      text-align: center;
      font-weight: bold;
      color: #fff;
      width: 8rem;
      transition: all 0.5s;
      li:not(:last-child) {
        border-bottom: #ccc 1px solid;
      }
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <span class="more" @click="showUlLIst"></span>
        <a href="/">ZETA</a>
      </div>
      <ul class="nav_list" v-show="isulShow">
        <li
          :class="{li_active:$route.path===item.path}"
          v-for="(item,key) in linkTargets"
          :key="key"
          @click="jump(item.path)"
        >{{item.name}}</li>
      </ul>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      isulShow: false,
      linkTargets: [
        {
          name: "首 页",
          path: "/home"
        },
        {
          name: "专 栏",
          path: "/series"
        },
        {
          name: "时 光 轴",
          path: "/historylist"
        },
        {
          name: "随 笔",
          path: "/record"
        },
        {
          name: "关 于 我",
          path: "/aboutme"
        }
      ]
    };
  },
  methods: {
    showUlLIst(e) {
      if (this.screenWidth < 800) {
        this.isulShow = !this.isulShow;
      }
    },
    jump(path) {
      this.$router.push(path);
      if (this.screenWidth < 800) {
        this.isulShow = false;
      }
    }
  },
  created() {
    if (this.screenWidth > 800) {
      this.isulShow = true;
    }
  }
};
</script>

