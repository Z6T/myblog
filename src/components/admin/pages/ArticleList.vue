<style lang='scss' scoped>
.tag {
  background-color: rgba(64, 158, 255, 0.1);
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
  white-space: nowrap;
  margin-right: 5px;
}
.form-warpper {
  position: absolute;
  width: 78%;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background: #e9eaed;
}

.addtype {
  font-size: 22px;
  cursor: pointer;
  margin: 0 10px;
  vertical-align: middle;
  height: 35px;
  line-height: 35px;
  width: 35px;
  text-align: center;
}
</style>
<template>
  <div>
    <el-form ref="form" :model="form" label-width class="form-warpper">
      <el-form-item>
        <el-button type="primary" @click="showFormPanel">新建文章</el-button>
        <el-button type="primary" @click="queryList">查询</el-button>
      </el-form-item>
      <Table :articlelist="articlelist" @query="queryList" @isEditing="isEditing"></Table>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px" class="form-warpper" v-show="showPanel">
      <el-form-item label="文章标题">
        <el-input v-model="form.a_title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="a_type" placeholder="请选择文章类型">
          <el-option
            v-for="item in typetextarr"
            :key="item._id"
            :label="item.typetext"
            :value="item.typetext"
          ></el-option>
        </el-select>
        <i class="el-icon-circle-plus-outline addtype" title="添加分类" @click="showAddType"></i>
        <el-input
          placeholder="添加分类"
          style="width:inherit"
          v-model="typetext"
          v-if="showAddTypeinput"
        ></el-input>
        <el-button v-if="showAddTypeinput" size="small" round @click="addArticleType">确定添加</el-button>
        <el-button v-if="showAddTypeinput" size="small" round @click="removeArticleType">小心删除</el-button>
      </el-form-item>
      <el-form-item label="专题收录">
        <el-select v-model="form.a_zhuanti" placeholder="选择收录的专题">
          <el-option
            v-for="item in ztarr"
            :key="item._id"
            :label="item.typetext"
            :value="item.typetext"
          ></el-option>
        </el-select>
        <i class="el-icon-circle-plus-outline addtype" title="添加专题" @click="showAddZt"></i>
        <el-input placeholder="添加专题" style="width:inherit" v-model="zttext" v-if="showAddTypeZt"></el-input>
        <el-button v-if="showAddTypeZt" size="small" round @click="addArticleZt">确定添加</el-button>
        <el-button v-if="showAddTypeZt" size="small" round @click="removeArticleZt">小心删除</el-button>
      </el-form-item>
      <el-form-item label="发布时间">
        <!-- <el-input v-model="curtag" style="width:150px" @blur="addTag"></el-input> -->
        <!-- <span style="margin-left:20px;color:#606266">发布时间:</span> -->
        <div class="block" style="display:inline">
          <el-date-picker
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            v-model="form.a_pubdate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </el-form-item>
      <div style="clear: both;overflow: hidden;margin-bottom: 10px;padding-left: 81px;">
        <div class="tag" v-if="form.a_type.length" v-for="(item,key) in form.a_type" :key="key">
          {{item}}
          <i
            class="el-tag__close el-icon-close"
            style="cursor:pointer;"
            @click="removetag(item)"
          ></i>
        </div>
      </div>
      <el-form-item label="文章简介">
        <el-input type="textarea" v-model="form.a_desc" rows="3" cols="20"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <Preview :markdown_text="form.a_content"></Preview>
        <el-input type="textarea" v-model="form.a_content" rows="13" cols="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button type="primary" @click="closePanel">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Table from "./Table";
import Preview from "./Preview";

export default {
  data() {
    return {
      curtag: "",
      form: {
        a_title: "",
        a_desc: "",
        a_zhuanti: "",
        a_type: [],
        a_tags: [],
        a_pubdate: "",
        a_content: ""
      },
      a_type: "",
      articlelist: [],
      showPanel: false,
      showAddTypeinput: false,
      isSave: false,
      typetext: "",
      zttext: "",
      typetextarr: [],
      ztarr: [],
      showAddTypeZt: false
    };
  },
  components: { Table, Preview },
  methods: {
    showFormPanel() {
      Object.keys(this.form).map(
        item =>
          (this.form[item] = typeof this.form[item] === "string" ? "" : [])
      );
      this.showPanel = true;
      document.body.style.background = "rgba(0,0,0,.3)";
    },
    removetag(tag) {
      var tagarr = this.form.a_type;
      tagarr.splice(tagarr.indexOf(tag), 1);
    },
    addTag(e) {
      if (!this.curtag) return;
      if (this.form.a_tags.indexOf(this.curtag) > -1) return; // 不能重复
      this.form.a_tags.push(this.curtag);
      this.curtag = "";
    },
    publish() {
      debugger;
      //   this.form._id = "";
      this.showPanel = false;
      document.body.style.background = "#e9eaed";
      if (this.isSave) {
        this.save();
      } else {
        var formdata = {
          a_title: this.form.a_title,
          a_desc: this.form.a_desc,
          a_type: this.form.a_type,
          a_tags: this.form.a_tags,
          a_pubdate: this.form.a_pubdate,
          a_content: this.form.a_content,
          a_zhuanti: this.form.a_zhuanti
        };
        this.apis
          .addArticle(formdata)
          .then(data => {
            if (data.error_code === 0) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: "success"
              });
              this.isSave = false;
              this.queryList(); // 重新查询
            } else if (data.error_code === 1) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: "warning"
              });
            }
          })
          .catch(err => console.log(err));
      }
    },
    queryList() {
      //   Object.keys(this.form).map(key => (obj[key] = ""));
      this.apis
        .queryList({})
        .then(data => {
          if (data.data) {
            this.articlelist = data.data;
          }
        })
        .catch(err => console.log(err));
    },
    // 点击编辑展示内容
    isEditing(_id) {
      this.showPanel = true;
      this.isSave = true;
      this.apis
        .editOfQuery({ _id })
        .then(data => {
          var data = data.data;
          this.form = data;
        })
        .catch(err => console.log(err));
    },
    save() {
      this.showPanel = false;
      document.body.style.background = "#e9eaed";
      this.apis
        .saveArticle(this.form)
        .then(data => {
          if (data.error_code === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "success"
            });
            this.isSave = false;
            this.queryList(); // 重新查询
          } else if (data.error_code === 1) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    closePanel() {
      this.isSave = false;
      this.showPanel = false;
      document.body.style.background = "#e9eaed";
    },
    showAddType(e) {
      this.showAddTypeinput = !this.showAddTypeinput;
      if (e.target.className.indexOf("el-icon-circle-plus-outline") == -1) {
        e.target.className = "el-icon-circle-plus-outline addtype";
      } else {
        e.target.className = "el-icon-remove-outline addtype";
      }
    },
    addArticleType() {
      this.apis
        .addArticleType({ typetext: this.typetext })
        .then(data => {
          if (data.error_code === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "success"
            });
            this.typetext = "";
            this.queryTypeList();
          } else if (data.error_code === 1) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    removeArticleType() {
      this.apis
        .removeArticleType({ typetext: this.form.a_type })
        .then(data => {
          if (data.error_code === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "success"
            });
            this.typetext = "";
            this.queryTypeList();
          } else if (data.error_code === 1) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    queryTypeList() {
      this.apis.queryTypeList().then(data => {
        console.log(data.data);
        if (data.data) {
          this.typetextarr = data.data;
        }
      });
    },
    showAddZt(e) {
      this.showAddTypeZt = !this.showAddTypeZt;
      if (e.target.className.indexOf("el-icon-circle-plus-outline") == -1) {
        e.target.className = "el-icon-circle-plus-outline addtype";
      } else {
        e.target.className = "el-icon-remove-outline addtype";
      }
    },
    // 添加文字专题
    addArticleZt() {
      this.apis
        .addArticleZt({ typetext: this.zttext })
        .then(data => {
          if (data.error_code === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "success"
            });
            this.typetext = "";
            this.queryZt();
          } else if (data.error_code === 1) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    queryZt() {
      this.apis.queryZt().then(data => {
        if (data.data) {
          this.ztarr = data.data;
        }
      });
    },
    removeArticleZt() {
      this.apis
        .removeArticleZt({ typetext: this.form.a_zhuanti })
        .then(data => {
          if (data.error_code === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "success"
            });
            this.typetext = "";
            this.queryZt();
          } else if (data.error_code === 1) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    a_type(curval, oldval) {
      if (this.form.a_type.indexOf(this.a_type) > -1) return; // 不能重复
      this.form.a_type.push(this.a_type);
      console.log(this.form.a_type);
    }
  },
  created() {
    this.queryList();
    this.queryTypeList();
    this.queryZt(); // 查询专题
  }
};
</script>
