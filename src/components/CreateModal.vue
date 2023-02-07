<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
             <h3 class="modal-header_title">
               Create new Todo
             </h3>
          </div>

          <form @submit.prevent="handleCreateModal" class="modal-body">
            <TextField
                v-model="userId"
                label="User ID"
                size="xs"
                required
                class="modal-body_text-field"
            />
            <TextField
                v-model="title"
                label="Title"
                size="xs"
                required
                class="modal-body_text-field"
            />
            <p v-show="isError" class="error-message">Validation error!</p>
            <div class="modal-footer">
              <p class="modal-footer_cancel" @click="$emit('close')">
                Cancel
              </p>
              <button class="modal-footer_button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TextField from "./TextField";
import { usernameRegex, onlyNumbersRegex } from "../validators";
import { mapMutations } from "vuex";
export default {
  name: "CreateModal",
  components: {
    TextField
  },
  data() {
    return {
      title: '',
      userId: '',
      isError: false,
    }
  },
  methods: {
    ...mapMutations(['CREATE_TODO']),
    handleCreateModal() {
      if (onlyNumbersRegex(this.userId) || !usernameRegex(this.title)) {
        this.isError = true;
        return
      }

      this.CREATE_TODO({
        userId: this.userId,
        id: new Date().getMilliseconds(),
        title: this.title,
        completed: false
      });
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.modal {
  &-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  &-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  &-container {
    width: 550px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  &-header {
    padding: 20px 10px;
  }
  &-body {
    padding: 0 30px;
    &_text-field {
      margin-bottom: 10px;
      display: block;
      width: 100%;
    }
  }
  &-footer {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    &_cancel {
      height: 30px;
      background: var(--red);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 220px;
      border: none;
      outline: none;
      color: var(--white);
      cursor: pointer;
      transition: opacity 0.4s;
      border-radius: 6px;
      font-size: 14px;
      &:hover {
        opacity: 0.65;
      }
    }
    &_button {
      height: 30px;
      background: var(--light-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 220px;
      border: none;
      outline: none;
      color: var(--white);
      cursor: pointer;
      transition: opacity 0.4s;
      border-radius: 6px;
      &:hover {
        opacity: 0.65;
      }
    }
  }
}
</style>
