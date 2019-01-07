.<style lang='scss' scoped>
.cardarea {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.home-page {
  .yearlist {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
}
.typeitem {
  list-style: none;
  float: left;
  box-sizing: border-box;
  width: 16.6%;
  margin-right: -1px;
  margin-bottom: -1px;
  border: 1px solid #eee;
  background: #fff;
  font-size: 14px;
  text-align: center;
  height: 37px;
  line-height: 37px;
  cursor: pointer;
  &:hover {
    background: #9e548c;
    color: white;
  }
}
.active_class {
  background: #9e548c;
  color: white;
}
</style>
<template>
  <div class="home-page mainbody" id="xxxFullScreen">
    <div class="yearlist">
      <Htitle>分类标签</Htitle>
      <div class="cardarea">
        <ul style="width:100%;">
          <li
            :class="[{active_class:curType===item.typetext},'typeitem']"
            @click="findBytype"
            v-for="item in typelist"
            :key="item._id"
          >{{item.typetext}}</li>
        </ul>
      </div>
      <Htitle v-show="articlelist.length">当前查询分类: 【{{curType}}】</Htitle>
      <ArticleList :articlelist="articlelist"></ArticleList>
    </div>
  </div>
</template>
<script>
import ArticleList from "../components/ArticleCard";
import Htitle from "../components/Htitle";
export default {
  data() {
    return { typelist: [], articlelist: [], curType: "" };
  },
  components: { Htitle, ArticleList },
  methods: {
    queryTypeList() {
      this.apis.queryTypeList().then(data => {
        if (data.data) {
          this.typelist = data.data;
        }
      });
    },
    findBytype(e) {
      var a_type = e.target.innerText;
      this.curType = a_type;
      this.apis.findBytype({ a_type }).then(data => {
        if (data.data) {
          this.articlelist = data.data;
        }
      });
    }
  },
  created() {
    this.queryTypeList();
  }
};
</script>
