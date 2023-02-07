<template>
  <div class="layout">
    <Header />
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Api from '../api'
export default {
  name: 'MainLayout',
  components: {
    Header
  },
  async created() {
    await Api.getUserData(localStorage.getItem('authenticated'));
  }
}
</script>

<style lang="scss">
</style>
