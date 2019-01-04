 <template>
  <el-container>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              @open="handleOpen"
              @close="handleClose"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="1">
                <template slot="title">
                  <i class="el-icon-service"></i>
                  <span>用户管理</span>
                </template>
              </el-menu-item>
              <router-link to="/admin/articlelist">
                <el-menu-item index="/admin/articlelist">
                  <template slot="title">
                    <i class="el-icon-service"></i>
                    <span>文章管理</span>
                  </template>
                </el-menu-item>
              </router-link>
              <el-submenu index="4">
                <template slot="title">admin</template>
                <el-menu-item index="1-4-1" @click="logout">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
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
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>