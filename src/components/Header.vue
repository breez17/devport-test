<template>
  <div class="c-header">
    <Sidemenu />
    <div class="c-header__container">
      <h4 class="c-header__title">
        Welcome back, {{ authentication.currentUser.name }}
      </h4>

      <div class="c-header__logout">
        <img
            @click="isOpen = !isOpen"
            class="c-header__logout-add"
            src="../assets/icons/icon-add.svg"
            alt="add"
        />
        <img
            @click="logout"
            class="c-header__logout-icon"
            src="../assets/icons/logout.svg"
            alt="logout"
        />
      </div>
    </div>
    <CreateModal
        v-if="isOpen"
        @close="isOpen = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sidemenu from "./Sidemenu";
import CreateModal from "./CreateModal";

export default {
  name: "Header",
  components: {CreateModal, Sidemenu},
  computed: {
    ...mapState(['authentication']),
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authenticated');
      this.$router.push('/login')
    },
  }
}
</script>

<style lang="scss">
.c-header {
  display: flex;
  align-items: center;
  min-height: 60px;
  height: 60px;
  background: var(--light-blue);
  &__container {
    display: flex;
    align-items: center;
    max-width: 80%;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
      margin: 0 0 0 20px;
      width: 70%;
    }
    @media screen and (max-width: 600px) {
      margin-left: 0;
    }
  }
  &__title {
    color: var(--white);
    @media screen and (max-width: 550px) {
      font-size: 12px;
    }
  }
  &__logout {
    display: flex;
    align-items: center;
    gap: 10px;
    &-add {
      cursor: pointer;
    }
    &-icon {
      width: 25px;
      height: auto;
      cursor: pointer;
    }
  }
}
</style>
