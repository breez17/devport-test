<template>
  <div id="app">
    <component :is="__layout" />
  </div>
</template>
<script>
const MainLayout = () => import("@/layouts/MainLayout.vue");
const LoginLayout = () => import("@/layouts/LoginLayout.vue");

export default {
  name: 'App',
  components: {
    MainLayout,
    LoginLayout
  },
  computed: {
    __layout() {
      return (this.$route.meta.layout || "login") + "-layout";
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/fonts-variables.scss";
@import "@/assets/styles/colors-variables.scss";

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: $regular;
}
</style>
