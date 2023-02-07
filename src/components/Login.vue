<template>
  <div class="c-login">
    <div class="c-login_title">
      <h4 class="c-login_title-headline">
        Description
      </h4>
    </div>
    <form @submit.prevent="handleForm" class="c-login_form">
      <h5 class="c-login_form-title">
        Description
      </h5>
      <text-field
          required
          v-model="username"
          placeholder="Username"
          class="c-login_form-text-field"
      />
      <text-field
          required
          v-model="phoneNumber"
          placeholder="Phone Number"
      />
      <p v-show="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>
      <button class="c-login_form-button" type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import TextField from "./TextField";
import { usernameRegex, phoneNumberRegex } from "../validators";
import Api from '../api'

export default {
  name: "Login",
  components: {
    TextField
  },
  data() {
    return {
      username: '',
      phoneNumber: '',
      errorMessage: '',
      users: []
    }
  },
  methods: {
    setError(value) {
      this.errorMessage = value;
    },
    handleForm() {
      this.setError('');
      if (!usernameRegex(this.username) || !phoneNumberRegex(this.phoneNumber)) {
        this.setError('Validation error!');
        return
      }
      this.setError('');
      const isExist = this.users.find(user => user.username === this.username);

      if (isExist && isExist.phone.split(' ')[0] === this.phoneNumber) {
        localStorage.setItem('authenticated', isExist.id)
        this.$toasted.success('You logged successfully!')
        this.$router.push("/");
      } else {
        this.setError('Login error!')
        this.$toasted.success('User was not found!')
      }
    }
  },
  async created() {
    this.users = await Api.getUsersList();
  },
}
</script>

<style lang="scss">
  .c-login {
    width: 450px;
    height: auto;
    border-radius: 5px;
    background: var(--silver);
    @media screen and (max-width: 550px) {
      width: 100%;
      max-width: 90%;
      margin: 0 auto;
    }
    &_title {
      padding: 15px 0;
      text-align: center;
      background: var(--concrete);
      &-headline {
        color: var(--title-color);
      }
    }
    &_form {
      padding: 15px 25px 30px 25px;
      &-title {
        margin-bottom: 14px;
        color: var(--title-color);
      }
      &-text-field {
        margin-bottom: 20px;
        display: block;
      }
      &-button {
        background: var(--green);
        color: var(--white);
        height: 40px;
        outline: none;
        border: none;
        margin-top: 20px;
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        font-size: 17px;
        line-height: 21px;
        letter-spacing: -0.025em;
        &:hover {
          opacity: .85;
        }
      }
    }
  }
  .error-message {
    color: var(--red);
    margin-top: 5px;
    font-size: 12px;
  }
</style>
