<template>
  <ValidationProvider
    v-slot="{ errors, required, ariaInput, ariaMsg }"
    tag="div"
    :rules="rules"
    :vid="vid"
    :name="name || label"
  >
    <input
      :id="name"
      ref="input"
      v-model="innerValue"
      v-bind="ariaInput"
      class="form-control"
      :type="type"
      :placeholder="placeholder"
      :class="{'is-invalid': errors[0]}"
    >
    <slot />
  </ValidationProvider>
</template>

<script>
export default {
	name: "TextInput",
	props: {
		vid: {
			type: String,
			default: undefined
		},
		name: {
			type: String,
			default: ""
		},
		label: {
			type: String,
			default: ""
		},
		rules: {
			type: [Object, String],
			default: ""
		},
		placeholder: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text",
			validator(value) {
				return [
					"url",
					"text",
					"password",
					"tel",
					"search",
					"number",
					"email"
				].includes(value);
			}
		},
		value: {
			type: null,
			default: ""
		}
	},
	data: () => ({
		innerValue: ""
	}),
	computed: {
		hasValue() {
			return !!this.innerValue;
		}
	},
	watch: {
		innerValue(value) {
			this.$emit("input", value);
		},
		value(val) {
			if (val !== this.innerValue) {
				this.innerValue = val;
			}
		}
	},
	created() {
		if (this.value) {
			this.innerValue = this.value;
		}
	}
}
</script>

<style lang="css">
</style>