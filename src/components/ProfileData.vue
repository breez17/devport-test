<template>
  <div class="c-profile-data">
      <div v-for="field of slugs" :key="field.id" class="c-profile-data__element">
        <div class="c-profile-data__element_title">{{ field }}:</div>
        <div class="c-profile-data__element_value">{{ authentication.currentUser[field] }}</div>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileData",
  computed: {
    ...mapState(['authentication']),
  },
  data() {
    return {
      slugs: ['name', 'email', 'username', 'website', 'phone']
    }
  }
}
</script>

<style lang="scss">
.c-profile-data {
  position: absolute;
  font-size: 12px;
  width: 18%;
  right: 20px;
  top: 20%;
  transform: translate(0, -20%);
  border: 1px solid var(--black);
  padding: 20px;
  border-radius: 6px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1440px) {
    padding: 10px;
    width: 16%;
    font-size: 10px;
  }
  @media screen and (max-width: 1150px) {
    display: none;
  }
  &__element {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px 0;
    &_title {
      text-transform: capitalize;
      font-weight: 800;
    }
  }
}
</style>
