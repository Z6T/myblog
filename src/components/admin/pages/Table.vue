<template>
  <el-table :data="articlelist" style="width: 100%">
    <el-table-column label="文章标题" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.a_title }}</span>
      </template>
    </el-table-column>
    <el-table-column label="文章描述" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.a_desc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="发布日期" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.a_pubdate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="文章标签" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.a_tags.join(' | ') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="文章分类" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.a_type }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    articlelist: {
      type: Array
    }
  },
  data() {
    return {
      // tableData: this.articlelist
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$emit("isEditing", row._id);
      // console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      var _id = row._id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
          this.apis
            .deleteArticle({ _id })
            .then(data => {
              if (data.error_code === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.$emit("query");
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>