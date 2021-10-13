<template>
  <b-card-group
    deck
    class="widget-card"
  >
    <b-card
      header-tag="header"
      footer-tag="footer"
    >
      <template
        v-slot:header
        class="container"
      >
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0">
            {{ widget.name }}
          </h5>
          <span v-if="widget.enabled != 'false'">
            <b-badge variant="success">Включен</b-badge>
          </span>
          <span v-else="">
            <b-badge variant="danger">Отключен</b-badge>
          </span>
        </div>
      </template>
      <div class="div">
        id виджета: {{ widget.id }}
      </div>
      <template v-slot:footer>
        <div class="btn-group justify-content-end w-100">
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="$emit('dublicate', index)"
          >
            Дублировать
          </button>
          <button
            type="button"
            class="btn btn-sm btn-success"
            @click="$emit('edit-widget-start', index)"
          >
            Редактировать
          </button>
          <button
            type="button"
            class="btn btn-sm btn-info"
            @click="$emit('view', index)"
          >
            Посмотреть
          </button>
        </div>
      </template>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
	name: 'Widgetcard',
	props: ['widget', 'index'],
	data() {
		return {

		}
	}
};
</script>

<style lang="scss">
	.widget-card
	{
		margin-bottom: 20px;
		&:last-child
		{
			margin-bottom: 0;
		}
	}
</style>
