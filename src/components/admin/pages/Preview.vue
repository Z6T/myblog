<template>
  <el-button type="text" @click="open5">点击预览MARKDOWN</el-button>
</template>

<script>
import marked from 'marked'

  export default {
    props:{
        markdown_text:{
            type:String
        }
    },
    methods: {
      open5() {
        var markdown_html = marked(this.markdown_text);
        this.$alert(markdown_html, '预览界面', {
          dangerouslyUseHTMLString: true
        });
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
    }
  }
</script>

<style>
.el-message-box{
    min-width: 470px;
    width: inherit;
}
</style>
