<template>
    <div>
        <div class="layout-header">
            <img :src="require('@/assets/img/logo.png')" alt="" class="layout-logo">
            <div class="layout-header-user">
              <img :src="require('@/assets/img/背景1.png')" alt="" class="layout-user-bgc">
              <el-dropdown  @command='has_command'>
                <span class="el-dropdown-link" style="cursor:pointer">
                    {{userInfo.realName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item command="user">个人中心</el-dropdown-item> -->
                    <el-dropdown-item command="b">安全退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <a href="">帮助</a>
            </div>
        </div>
        <div class="layout-slider" :style="note">
            <ul>
                <li v-for="(item ,index) in list" :key="index" :class="get_current(item)">
                    <router-link :to='item.value'><svg-icon :icon-class='item.label'></svg-icon>{{item.label}}</router-link>
                </li>
            </ul>
        </div>
        <div class="layout-main">
            <transition name="fade" mode="out-in">
                <router-view :key="key"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
  import {mapGetters} from "vuex";
export default {
  components: {},
  name: "layout",

  data() {
    return {
      userInfo: {
        realName: ""
      },
      note: {
        backgroundImage: "url(" + require("@/assets/img/背景2.png") + ")"
      },
      list: [
        {
          label: "补助申报",
          value: "/SubsidyDeclaration/index"
        },
        {
          label: "我的申报",
          value: "/UserDeclaration/index"
        },
        {
          label: "我的补助",
          value: "/UserSubsidy/index"
        },
        {
          label: "我的发放",
          value: "/UserGranting/index"
        }
      ]
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
    ...mapGetters([`user_info`])
  },
  created() {
    this.userInfo.realName = this.user_info.phone
  },
  methods: {
    get_current(item) {
      if (this.$route.path === item.value) {
        return "current";
      } else {
        return "";
      }
    },
    has_command() {
      this.$router.push("/login");
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.layout-header {
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(235, 235, 237);
  z-index: 99;
  .layout-logo {
    height: 48px;
    margin-left: 40px;
  }
  .layout-header-user {
    float: right;
    padding-right: 30px;
    height: 72px;
    line-height: 72px;
    position: relative;
    background-color: rgba(57, 170, 242, 7);
    .el-dropdown {
      color: #ffffff;
      font-size: 16px;
    }
    .layout-user-bgc {
      position: absolute;
      top: 0;
      left: 0;
      height: 72px;
      transform: translate(-72%, 0);
      a {
        padding-left: 10px;
      }
    }
  }
}
.layout-slider {
  position: fixed;
  top: 72px;
  left: 0;
  bottom: 0;
  width: 239px;
  border-right: 1px solid rgb(235, 235, 237);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100%;
  background-color: #ffffff;
  ul {
    li {
      list-style: none;
      cursor: pointer;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid rgb(235, 235, 237);
      padding-left: 60px;
      .svg-icon {
        margin-right: 12px;
        font-size: 20px;
      }
      a {
        text-decoration: none;
        color: #000;
        &:hover {
          color: rgb(43, 164, 241);
        }
      }
      &:nth-of-type(4) {
        border: none;
      }
      &.current {
        a {
          color: rgb(43, 164, 241);
        }
      }
    }
  }
}
.layout-main {
  margin-left: 240px;
  margin-top: 72px;
  padding: 20px;
}
</style>

