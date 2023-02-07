<template>
  <div class="v-authentication">
    <login />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "Authentication",
  components: { Login }
}
</script>
<style lang="scss">
.v-authentication {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
