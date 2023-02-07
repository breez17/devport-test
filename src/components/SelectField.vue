<template>
  <label class="v-select-field">
    <div
      v-if="label"
      class="v-select-field__lbl"
    >
      {{ label }}
    </div>
    <img
      v-if="prependIconSrc"
      :src="prependIconSrc"
      alt=""
      class="icon-default v-select-field__prepend-icon"
    />
    <select
      class="v-select-field__select"
      :class="[
        {'v-select-field__select--prepend-icon': prependIconSrc},
        size ? `v-select-field__select--${size}` : ''
      ]"
      :value="value"
      @change="$emit('change', $event.target.value)"
      :disabled="isDisabled"
    >
      <option v-if="defaultOptionHide" value="">...</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "SelectField",
  props: {
    label: String,
    value: [String, Number],
    prependIconSrc: {
      type: String,
      default: ''
    },
    size: String,
    options: Array,
    defaultOptionHide: Boolean,
    isDisabled: Boolean,
  },
}
</script>

<style lang="scss">
.v-select-field {
  position: relative;
  width: 100%;
  margin: 0;

  &__lbl {
    font-weight: 600;
    color: var(--grey-700);
    margin-bottom: 8px;
  }

  &__prepend-icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }

  &__select {
    width: 100%;
    height: 48px;
    border: 1px solid #C0C7DC;
    border-radius: 8px;
    padding: 8px 24px 8px 16px;
    font-size: 16px;
    appearance: none;
    background: 97% 12px/24px no-repeat url(../assets/icons/icon-chevron-down.svg) #FEFEFE;
    cursor: pointer;

    &--sm {
      height: 40px;
      background: 97% 10px/20px no-repeat url(../assets/icons/icon-chevron-down.svg) #FEFEFE;
    }

    &--md {
      height: 48px;
      background: 97% 10px/20px no-repeat url(../assets/icons/icon-chevron-down.svg) #FEFEFE;
    }

    &--prepend-icon {
      padding: 8px 16px 8px 56px;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
