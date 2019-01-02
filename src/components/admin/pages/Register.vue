<template>
  <div style="text-align: center;margin-top: 200px;">
    <el-form ref="form" :model="form" label-width="80px" style="display: inline-block;">
      <h1
        style="font-size: 20px;
              padding-left: 56px;
              color: rebeccapurple;
              margin: 20px 0;"
      >注册基地</h1>
      <el-form-item label="用户名">
        <el-input v-model="form.uname" style="width:240px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.psd" type="password" style="width:240px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.repsd" type="password" style="width:240px"></el-input>
      </el-form-item>
      <el-form-item label="注册口令">
        <el-input v-model="form.secret" type="password" style="width:240px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        uname: "",
        psd: "",
        repsd: "",
        secret: ""
      }
    };
  },
  methods: {
    checkEmpty() {
      var wraningmsg = "";
      if (!this.form.uname) {
        this.$message({
          showClose: true,
          message: "用户名不能为空",
          type: "warning"
        });
        return;
      } else if (!this.form.psd) {
        this.$message({
          showClose: true,
          message: "密码不能为空",
          type: "warning"
        });
        return;
      } else if (!this.form.repsd) {
        this.$message({
          showClose: true,
          message: "确认密码不能为空",
          type: "warning"
        });
        return;
      } else if (!this.form.secret) {
        this.$message({
          showClose: true,
          message: "注册口令不能为空",
          type: "warning"
        });
        return;
      }
    },
    checkForm() {
      this.checkEmpty();
      if (this.form.psd != this.form.repsd) {
        this.$message({
          showClose: true,
          message: "两次输入密码不一致",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    onSubmit() {
      if (this.checkForm()) {
        this.apis
          .register(this.form)
          .then(data => {
            if (data.error_code === 0) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: "success"
              });
              setTimeout(() => {
                this.$router.push("zetalogin");
              }, 2000);
            } else if (data.error_code === 1) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>