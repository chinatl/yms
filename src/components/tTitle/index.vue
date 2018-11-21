<template>
    <div class="title"><slot></slot></div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  border-radius: 6px 6px 0px 0px;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  font-weight: normal;
  padding-left: 28px;
  color: #000;
  position: relative;
  border-bottom: 2px solid rgb(235, 235, 237);
  background-color: #fff;
  &::before {
    height: 24px;
    width: 4px;
    background-color: #37aeeb;
    display: inline-block;
    position: absolute;
    left: 12px;
    top: 18px;
    content: "";
  }
}
</style>

