<template>
  <div style="text-align: center;margin-top: 200px;">
    <el-form ref="form" :model="form" label-width="80px" style="display: inline-block;">
      <h1
        style="font-size: 20px;
              padding-left: 56px;
              color: rebeccapurple;
              margin: 20px 0;"
      >后台管理登录</h1>
      <el-form-item label="用户名">
        <el-input v-model="form.uname" style="width:240px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.psd"
          type="password"
          style="width:240px"
          @keyup.native.13="keySubmit($event)"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
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
        psd: ""
      }
    };
  },
  methods: {
    keySubmit(e) {
      this.onSubmit();
    },
    onSubmit() {
      this.apis
        .login(this.form)
        .then(data => {
          if (data.error_code === 0) {
            // 登录成功
            localStorage.setItem("eleToken", data.token);
            this.$message({
              showClose: true,
              message: data.msg,
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("admin/articlelist");
            }, 100);
          } else if (data.error_code === 1) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "warning"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>