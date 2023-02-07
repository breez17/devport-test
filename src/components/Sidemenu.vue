<template>
  <div id="sidemenu">
    <button class="sidemenu__btn" @click="navOpen = !navOpen" :class="{active:navOpen}">
      <span class="top"></span>
      <span class="mid"></span>
      <span class="bottom"></span>
    </button>
    <transition name="translateX">
      <nav v-show="navOpen">
        <div class="sidemenu__wrapper">
          <div v-for="field of slugs" :key="field.id" class="c-profile-data__element sidemenu__element">
            <div class="c-profile-data__element_title sidemenu__element_title">{{ field }}:</div>
            <div class="c-profile-data__element_value sidemenu__element_value">{{ authentication.currentUser[field] }}</div>
          </div>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidemenu",
  computed: {
    ...mapState(['authentication']),
  },
  data() {
    return {
      navOpen: false,
      slugs: ['name', 'email', 'username', 'website', 'phone']
    }
  },
}
</script>

<style lang="scss">
#sidemenu {
  display: none;
  @media screen and (max-width: 1150px) {
    display: block;
  }
  nav {
    width: 400px;
    background: grey;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }

  .sidemenu {
    &__btn {
      display: block;
      width: 50px;
      height: 50px;
      background: var(--light-blue);
      border: none;
      position: relative;
      z-index: 100;
      appearance: none;
      cursor: pointer;
      outline: none;

      span {
        display: block;
        width: 20px;
        height: 2px;
        margin: auto;
        background: white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: all .4s ease;

        &.top {
          transform: translateY(-8px);
        }

        &.bottom {
          transform: translateY(8px);
        }
      }
      &.active{
        background: grey;
        .top {
          transform: rotate(-45deg);
        }
        .mid{
          transform: translateX(-20px) rotate(360deg);
          opacity: 0;
        }
        .bottom {
          transform: rotate(45deg);
        }
      }

    }

    &__wrapper {
      padding: 50px 0 50px 50px;
      @media screen and (max-width: 500px) {
        padding: 60px 0 20px 20px;
        font-size: 12px;
      }
    }

    &__list {
      list-style:none;
      padding: 50px 0 0 0;
      margin: 0;
    }

    &__item {
      a {
        text-decoration: none;
        line-height: 1.6em;
        font-size: 1.6em;
        padding: .5em;
        display: block;
        color: white;
        transition: .4s ease;

        &:hover {
          background: lightgrey;
          color: dimgrey;
        }
      }
    }
    &__element {
      &_title {
        color: var(--white);
      }
      &_value {
        color: var(--white);
      }
    }
  }
}

.translateX-enter{
  transform:translateX(-200px);
  opacity: 0;
}

.translateX-enter-active,.translateX-leave-active{
  transform-origin: top left 0;
  transition:.2s ease;
}

.translateX-leave-to{
  transform: translateX(-200px);
  opacity: 0;
}
</style>
