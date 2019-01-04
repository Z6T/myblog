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
  padding-left: 80px;
  padding-right: 80px;
  background: #e9eaed;
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
        <el-select v-model="form.a_type" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="curtag" style="width:150px" @blur="addTag"></el-input>
        <span style="margin-left:20px;color:#606266">
          发布时间
          :
        </span>
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
      <div
        style="    clear: both;
    overflow: hidden;
    margin-bottom: 10px;padding-left: 81px;"
      >
        <div class="tag" v-if="form.a_tags.length" v-for="(item,key) in form.a_tags" :key="key">
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
        <el-input type="textarea" v-model="form.a_content" rows="20" cols="20"></el-input>
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

export default {
  data() {
    return {
      curtag: "",
      form: {
        a_title: "",
        // region: ["shanghai", "beijing"],
        a_desc: "",
        a_type: "",
        a_tags: [],
        a_pubdate: "",
        a_content: ""
      },
      articlelist: [],
      showPanel: false,
      isSave: false
    };
  },
  components: { Table },
  methods: {
    showFormPanel() {
      this.showPanel = true;
      document.body.style.background = "rgba(0,0,0,.3)";
    },
    removetag(tag) {
      var tagarr = this.form.a_tags;
      tagarr.splice(tagarr.indexOf(tag), 1);
    },
    addTag(e) {
      if (!this.curtag) return;
      if (this.form.a_tags.indexOf(this.curtag) > -1) return; // 不能重复
      this.form.a_tags.push(this.curtag);
      this.curtag = "";
    },
    publish() {
      //   this.form._id = "";
      this.showPanel = false;
      document.body.style.background = "#e9eaed";
      if (this.isSave) {
        this.save();
      } else {
        this.apis
          .addArticle(this.form)
          .then(data => {
            if (data.error_code === 0) {
              // 登录成功
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
    }
  },
  created() {
    this.queryList();
  }
};
</script>
