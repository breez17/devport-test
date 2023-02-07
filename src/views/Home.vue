<template>
  <div class="home">
    <div class="container">
      <TodosField />
      <ProfileData />
    </div>
  </div>
</template>

<script>
import ProfileData from "@/components/ProfileData.vue";
import TodosField from "@/components/TodosField.vue";
export default {
  name: 'Home',
  components: {
    TodosField,
    ProfileData
  },
}
</script>

<style lang="scss">
.container {
  padding: 20px 0;
  max-width: 60%;
  margin: 0 auto;
  @media screen and (max-width: 1150px) {
    max-width: 90%;
  }
}
</style>
