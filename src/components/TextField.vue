<template>
  <label
    class="v-text-field"
    :class="[
      fullWidth ? 'v-text-field--full-width' : '',
      size ? `v-text-field--${size}` : '',
    ]"
  >
    <div
      v-if="label"
      class="v-text-field__lbl"
    >
      {{ label }}
    </div>
    <img
      v-if="prependIconSrc"
      :src="prependIconSrc"
      alt=""
      class="icon-default v-text-field__prepend-icon"
    />
    <input
      :type="type"
      class="v-text-field__input"
      :class="[
        {'v-text-field__input--prepend-icon': prependIconSrc},
        size ? `v-text-field__input--${size}` : '',
      ]"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :required="required"
      :value="value"
      :maxlength="maxlength"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "TextField",
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    prependIconSrc: {
      type: String,
      default: ''
    },
    size: String,
    fullWidth: Boolean,
    placeholder: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
      default: null
    },
    required: Boolean,
    maxlength: String
  }
}
</script>

<style lang="scss">
.v-text-field {
  position: relative;
  width: auto;
  margin: 0;

  &--xs {
    width: 80px;
  }

  &--full-width {
    width: 100%;
  }

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

  &__input {
    width: 100%;
    height: 48px;
    background: #FEFEFE;
    border: 1px solid #C0C7DC;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 16px;

    &--xs {
      height: 36px;
      padding: 8px;
    }

    &--sm {
      height: 40px;
    }

    &--md {
      height: 48px;
    }

    &--prepend-icon {
      padding: 8px 16px 8px 56px;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--black);
      opacity: .65;
    }
  }
}
</style>
