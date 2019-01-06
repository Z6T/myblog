<template>
  <div class="markdown-body">
      <div class="content">
          <h1>我是一个大标题</h1>
          <ul>
              <li>
                  <em>作者:</em>zeta
              </li>
              <li>
                  <em>作者:</em>zeta
              </li>
              <li>
                  <em>作者:</em>zeta
              </li>
          </ul>
          <div class="art_content" v-html="markdown_html">
          </div>
      </div>
  </div>
</template>
<script>
import marked from 'marked'

export default {
  data() {
    return {
        arti_content:'### ni'
    };
  },
  computed:{
      thisid(){
          return this.$route.params.id
      },
      markdown_html(){
           var markdown_htmlc = marked(this.arti_content)
           return markdown_htmlc
      }
  },
  created(){
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
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
         });
          this.apis
        .editOfQuery({ _id:this.thisid })
        .then(data => {
          var data = data.data.a_content;
          this.arti_content = data;
        })
        .catch(err => console.log(err));
  }
};
</script>
<style scoped>
@import '../../../assets/css/markdown.css';
.hljs pre{
    background: red;
}
.language-javascript{
    background: red;
}
</style>


