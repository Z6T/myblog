 <template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" h>
      <router-link to="/admin/home">列表</router-link>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">标签管理</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3" style="float:right">
      <template slot="title">admin</template>
      <el-menu-item index="3-1" @click="logout">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("eleToken");
      location.reload();
    }
  }
};
</script>