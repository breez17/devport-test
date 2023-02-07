<template>
  <div class="c-todo">
    <div class="c-todo__holder">
      <h4 class="c-todo__holder-title">
        {{ todo.title }}
      </h4>
      <div class="c-todo__holder-status">
        {{ isCompleted(todo.completed) }}
        <div class="c-todo__holder-status-fav">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    }
  },
  methods: {
    isCompleted(status) {
      if (status) {
        return '✅'
      }

      return '🙅🏻‍'
    }
  },
}
</script>

<style lang="scss">
.c-todo {
  &:hover {
    background: var(--light-blue);
    cursor: pointer;
    color: var(--white);
    border-radius: 8px;
  }

  &__holder {
    display: flex;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--light-blue);
    padding: 7px 15px;
    font-size: 25px;
    margin-bottom: 10px;
    @media screen and (max-width: 500px) {
      font-size: 20px;
    }
    &-title {
      font-size: 16px;
      @media screen and (max-width: 500px) {
        font-size: 14px;
      }
    }
    &-status {
      display: flex;
      align-items: center;
      gap: 5px;
      &-fav {
        width: 25px;
        height: auto;
        @media screen and (max-width: 500px) {
          width: 20px;
        }
      }
    }
  }
}

.bookmark {
  fill:none;
  stroke:#000;
  stroke-linejoin:round;
  stroke-width:2px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
