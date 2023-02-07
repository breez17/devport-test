<template>
  <div class="layout l-login">
      <div class="layout_header"></div>
        <router-view></router-view>
      <div class="layout_footer"></div>
  </div>
</template>

<style lang="scss">
.l-login {
  background: var(--light-gray);
}
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &_header {
    background: var(--dark-gray);
    min-height: 60px;
  }
  &_footer {
    background: var(--dark-gray);
    min-height: 270px;
    @media screen and (max-width: 940px) {
      min-height: auto;
    }
  }
}
</style>
