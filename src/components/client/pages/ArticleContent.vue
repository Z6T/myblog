<template>
  <div class="wrapper">
    <div class="markdown-body">
      <div class="content">
        <h1>我是一个大标题</h1>
        <ul class="art_info">
          <li>
            <em>作者:</em>zeta
          </li>
          <li>
            <em>时间:</em>
            {{a_pubdatee}}
          </li>
          <li>
            <em style="float:left;">分类:</em>
            <a v-for="item in a_typee" class="typee" :key="item">{{item}}</a>
          </li>
        </ul>
        <div class="art_content" v-html="markdown_html"></div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from "marked";

export default {
  data() {
    return {
      arti_content: "",
      a_typee: [],
      a_pubdatee: ""
    };
  },
  computed: {
    thisid() {
      return this.$route.params.id;
    },
    markdown_html() {
      var markdown_htmlc = marked(this.arti_content);
      return markdown_htmlc;
    }
  },
  created() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
    this.apis
      .editOfQuery({ _id: this.thisid })
      .then(data => {
        this.a_typee = data.data.a_type;
        this.a_pubdatee = data.data.a_pubdate;
        var data = data.data.a_content;
        this.arti_content = data;
      })
      .catch(err => console.log(err));
  }
};
</script>
<style scoped>
@import "../../../assets/css/markdown.css";

.markdown-body {
  width: 70%;
  padding: 30px;
  box-sizing: border-box;
}



.art_info {
  display: flex;
}
.art_info li {
  list-style: none;
  margin: 0 20px;
}
.art_info li em {
  font-style: normal;
  font-weight: 900;
  margin: 0 10px;
}
.typee {
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
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.typee:hover {
  text-decoration: none;
  cursor: pointer;
  background-color: #007aff;
  color: #fff;
}
</style>


