<template>
  <div>
    <h4>итоговые параметры виджета</h4>
    <br>
    <h3>{{ widget.title }}</h3>
    <div
      v-for="field in widget.fields"
      class="form-group"
    >
      <div v-if="field.enumItemsList.length">
        <label>{{ field.label }}</label>
        <div v-for="enumItem in field.enumItemsList">
          <label>
            <input
              type="radio"
              :name="field.fieldName"
              :value="enumItem.value"
            >
            {{ enumItem.label }}
          </label>
        </div>
      </div>
      <div v-else="">
        <label>{{ field.label }}</label>
        <input
          :type="field.type"
          :name="field.fieldName"
          :placeholder="field.placeholder"
          class="form-control"
        >
      </div>
    </div>
    <p v-html="widget.description" />
    <button
      v-if="widget.buttonTxt"
      class="btn btn-primary"
    >
      {{ widget.buttonTxt }}
    </button>
  </div>
</template>
<script>
	export default {
		props: ['widget']
	}
</script>

<style lang="scss">

</style>