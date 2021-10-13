<template>
  <div>
    <b-dropdown
      variant="outline-primary"
      :text="'Перейти к виджету'"
    >
      <b-dropdown-group header="Связанные виджеты">
        <b-dropdown-item
          v-for="(wg, ind) in widgets"
          v-if="+wg.parent === +widgetCheme.id"
          :key="ind"
          @click="editWidgetStart(ind)"
        >
          {{ wg.id }} - {{ wg.name }}
        </b-dropdown-item>
        <b-dropdown-divider />
      </b-dropdown-group>
      <b-dropdown-group header="Действия с виджетами">
        <b-dropdown-item
          v-if="widgetCheme.parent"
          @click="editWidgetStartById(widgetCheme.parent)"
        >
          Вернуться к родителю
        </b-dropdown-item>
        <b-dropdown-item
          @click="addingBoundWidget = true"
        >
          Добавить связанный виджет
        </b-dropdown-item>
        <b-dropdown-item
          v-if="!widgetCheme.parent"
          @click="addinngParentWidget = true"
        >
          Назначить виджет-родитель
        </b-dropdown-item>
        <b-dropdown-item
          v-else
          @click="setParent('')"
        >
          Удалить привязку к родителю
        </b-dropdown-item>
      </b-dropdown-group>
    </b-dropdown>

    <div
      v-if="addinngParentWidget"
      class="constructor-dropdown-wr"
    >
      <div class="constructor-dropdown-wr__top">
        <div class="form-group">
          <div class="form-group">
            <label>Назначить виджет-родитель</label>
            <input
              v-model="searchWgText"
              type="text"
              class="form-control"
              placeholder="Поиск по названию и id"
              name="widget-name"
              @input="widgetsSearch"
              @focus="toggleSearchWg"
              @blur="toggleSearchWg"
            >
          </div>
        </div>
      </div>
      <div
        v-if="searchWgVis && searchedWidgets.length"
        class="constructor-dropdown"
      >
        <div class="constructor-dropdown__close">
          <div class="constructor-dropdown__close-icon">
            &times;
          </div>
        </div>
        <div
          v-for="(wg, wgInd) in searchedWidgets"
          class="constructor-dropdown-item"
          @click="setParent(wg.id)"
        >
          {{ wg.id }} - {{ wg.name }}
        </div>
      </div>
    </div>
    <!--  -->
    <div
      v-if="addingBoundWidget"
      class="constructor-dropdown-wr"
    >
      <div class="constructor-dropdown-wr__top">
        <div class="form-group">
          <div class="form-group">
            <label>Связать виджет</label>
            <input
              v-model="searchWgText"
              type="text"
              class="form-control"
              placeholder="Поиск по названию и id"
              name="widget-name"
              @input="widgetsSearch"
              @focus="toggleSearchWg"
              @blur="toggleSearchWg"
            >
          </div>
          <b-button
            variant="outline-success"
            @click="addNewBound"
          >
            Создать новый
          </b-button>
        </div>
      </div>
      <div
        v-if="searchWgVis && searchedWidgets.length"
        class="constructor-dropdown _widgets"
      >
        <div class="constructor-dropdown__close">
          <div class="constructor-dropdown__close-icon">
            &times;
          </div>
        </div>
        <div
          v-for="(wg, wgInd) in searchedWidgets"
          class="constructor-dropdown-item"
          @click="setBound(wg.id)"
        >
          {{ wg.id }} - {{ wg.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	export default
	{
		props: ['widgets', 'widgetCheme'],
		data()
		{
			return {
				addinngParentWidget: false,
				searchedWidgets: [],
				searchWgVis: false,
				searchWgText: '',
				addingBoundWidget: false,
			}
		},
		watch:
		{
			'widgetCheme.id'()
			{
				this.addinngParentWidget = this.addingBoundWidget = false;
				this.searchWgText = '';
			},
			addingBoundWidget(newValue)
			{
				if (newValue && this.addinngParentWidget)
					this.addinngParentWidget = false;
			},
			addinngParentWidget(newValue)
			{
				if (newValue && this.addingBoundWidget)
					this.addingBoundWidget = false;
			}
		},
		methods:
		{
			widgetsSearch(e)
			{
				this.searchedWidgets = JSON.parse(JSON.stringify(this.widgets.filter(wg=>
				{
					return ((wg.id + '').match(this.searchWgText) || wg.name.match(this.searchWgText)) && +this.widgetCheme.id !== +wg.id;
				})));
			},
			addNewBound()
			{
				this.$emit('addNewBound', this.widgetCheme.id);
			},
			setBound(id)
			{
				this.$emit('setBound', id, this.widgetCheme.id);
			},
			setParent(id)
			{
				this.searchWgText = id;
				this.widgetCheme.parent = id;
				this.$emit('setParent', this.widgetCheme.parent);
			},
			toggleSearchWg()
			{
				setTimeout(()=>
				{
					this.searchWgVis = !this.searchWgVis;
				},100);
			},
			editWidgetStartById(id)
			{
				this.$emit('editWidgetStartById', id);
			},
			editWidgetStart(ind)
			{
				this.$emit('editWidgetStart', ind);
			},
		}
	}
</script>
<style lang="scss">
	.constructor-dropdown._widgets
	{
		top: 80px;
	}
</style>