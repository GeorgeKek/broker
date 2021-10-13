<template>
  <div>
    <div
      class="widget-container"
      :class="{'loaded': widgetsLoaded}"
    >
      <br>
      <div class="justify-content-end">
        <div class="col-lg-12 col-md-12 pagetitle-wr">
          <h1 class="pagetitle">
            <span class="pagetitle-icon">
              <i class="fa fa-address-card-o" />
            </span>
            <span class="pagetitle-text">
              Конструктор виджетов
            </span>
          </h1>
          <div class="pagetitle-actions">
            <button
              v-if="adding || editedWidget.enable"
              class="btn btn-danger"
              @click="cancelChangeWidget"
            >
              Отменить
            </button>
            <button
              v-else=""
              class="btn btn-primary"
              @click="adding = true"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
      <br>
      <div
        v-show="adding || editedWidget.enable"
        class="add-widget "
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <ValidationObserver ref="widgetSettings">
                <form>
                  <h4>основные настройки</h4>
                  <div
                    v-if="adding && !editedWidget.enable"
                    class="form-group"
                  >
                    <label for="widget-id">id</label>
                    <customInput
                      v-model="widgetCheme.id"
                      type="text"
                      placeholder="1"
                      name="widget-id"
                      rules="required"
                    />
                  </div>
                  <div
                    v-else
                    class="form-group"
                  >
                    <label for="widget-id">id</label>
                    <h3>{{ widgetCheme.id }}</h3>
                  </div>
                  <WidgetBoundParams
                    v-if="editedWidget.enable"
                    :widgets="widgets"
                    :widget-cheme="widgetCheme"
                    @editWidgetStartById="editWidgetStartById"
                    @editWidgetStart="editWidgetStart"
                    @setParent="setParent"
                    @setBound="setBound"
                    @addNewBound="addNewBound"
                  />
                  <div class="form-group">
                    <emails-list
                      :emails="widgetCheme.emails"
                      @update="updateEmails"
                    />
                  </div>
                  <div class="form-group">
                    <label>Название виджета(не отобржается) </label>
                    <input
                      v-model="widgetCheme.name"
                      type="text"
                      class="form-control"
                      placeholder="ИИС Восток"
                      name="widget-name"
                    >
                  </div>
                  <WidgetAgentsParams
                    :agent-id="widgetCheme.agent"
                    :prod="widgetCheme.prod"
                    :prod-id="widgetCheme.prodId"
                    @updateProdOrAgentIds="updateProdOrAgent"
                  />
                  <div class="form-group">
                    <label>Заголовок</label>
                    <input
                      v-model="widgetCheme.title"
                      type="text"
                      class="form-control"
                      placeholder="ИИС Восток"
                      name="widget-label"
                    >
                  </div>
                  <div class="form-group">
                    <label>Описание</label>
                    <textarea
                      v-model="widgetCheme.description"
                      type="text"
                      class="form-control"
                      placeholder="ИИС Восток"
                      name="widget-description"
                    />
                  </div>

                  <div class="form-group">
                    <label>Открывать сразу по ссылке</label>
                    <input
                      v-model="widgetCheme.activeUrl"
                      type="text"
                      class="form-control"
                      placeholder="/call"
                      name="widget-links"
                    >
                  </div>
                  <div class="form-group">
                    <label>Заголовок успешной отправки</label>
                    <input
                      v-model="widgetCheme.successHeader"
                      type="text"
                      class="form-control"
                      placeholder="Отправить"
                      name="widget-btn-text"
                    >
                  </div>
                  <div class="form-group">
                    <label>Текст успешной отправки</label>
                    <input
                      v-model="widgetCheme.successText"
                      type="text"
                      class="form-control"
                      placeholder="Отправить"
                      name="widget-btn-text"
                    >
                  </div>
                  <div class="form-group">
                    <label>Заголовок ошибки</label>
                    <input
                      v-model="widgetCheme.errorHeader"
                      type="text"
                      class="form-control"
                      placeholder="Отправить"
                      name="widget-btn-text"
                    >
                  </div>
                  <div class="form-group">
                    <label>Текст ошибки при отправке</label>
                    <input
                      v-model="widgetCheme.errorText"
                      type="text"
                      class="form-control"
                      placeholder="Отправить"
                      name="widget-btn-text"
                    >
                  </div>
                  <div class="form-group">
                    <label>Текст внутри кнопки</label>
                    <input
                      v-model="widgetCheme.buttonTxt"
                      type="text"
                      class="form-control"
                      placeholder="Отправить"
                      name="widget-btn-text"
                    >
                  </div>
                  <div class="form-group">
                    <b-form-checkbox
                      id="widget-enabled"
                      v-model="widgetCheme.enabled"
                      name="checkbox-1"
                      value="true"
                      unchecked-value="false"
                    >
                      Включен
                    </b-form-checkbox>
                    <b-form-checkbox
                      id="widget-send-to-crm"
                      v-model="widgetCheme.sendToCrm"
                      name="checkbox-1"
                      value="true"
                      unchecked-value="false"
                    >
                      Отправлять в CRM
                    </b-form-checkbox>
                  </div>
                </form>
              </ValidationObserver>
            </div>

            <div class="col-lg-4 col-md-4">
              <form>
                <h4>поля</h4>
                <div class="form-group">
                  <label>Тип поля</label>
                  <select
                    v-model="newField.type"
                    class="form-control"
                  >
                    <option
                      value="text"
                      selected
                    >
                      Обычное текстовое
                    </option>
                    <option value="email">
                      Электронный адрес
                    </option>
                    <option value="phone">
                      Номер телефона
                    </option>
                    <option value="enum">
                      Перечисление
                    </option>
                  </select>
                </div>
                <ValidationObserver ref="fieldSettings">
                  <div class="form-group">
                    <label>Лэйбл поля</label>
                    <customInput
                      v-model="newField.label"
                      type="text"
                      placeholder="Текст над полем"
                      name="field-label"
                      rules="required"
                    />
                  </div>
                  <div
                    v-if="newField.type != 'enum'"
                    class="form-group"
                  >
                    <label>Placeholder поля</label>
                    <input
                      v-model="newField.placeholder"
                      type="text"
                      class="form-control"
                      placeholder="Какой-то текст"
                      name="field-placeholder"
                    >
                  </div>
                  <div class="form-group">
                    <b-form-checkbox
                      id="required-field-chk"
                      v-model="newField.required"
                      name="checkbox-4"
                    >
                      Обязательное поле
                    </b-form-checkbox>
                  </div>
                  <div v-show="changeFieldName">
                    <div class="form-group">
                      <label>Название поля для кодеров</label>
                      <customInput
                        v-model="newField.fieldName"
                        type="text"
                        placeholder="field-name"
                        name="field-name"
                        rules="required"
                      />
                    </div>
                  </div>
                </ValidationObserver>
                <div v-if="newField.type == 'enum'">
                  <ValidationObserver ref="enumSettings">
                    <div class="form-group">
                      <label>Текст перечисления</label>
                      <customInput
                        v-model="enumItem.label"
                        type="text"
                        name="enum-value"
                        rules="required"
                        @keydown.enter="addEnumField"
                      />
                    </div>
                    <div class="form-group">
                      <label>Значение перечисления</label>
                      <input
                        v-model="enumItem.value"
                        type="text"
                        class="form-control"
                        @keydown.enter="addEnumField"
                      >
                    </div>
                    <div class="form-group">
                      <label>Иконка - </label>  <span v-html="enumItem.icon" />
                      <br>
                      <b-dropdown
                        id="enumItemIcon"
                        text="Посмотреть доступные"
                      >
                        <b-dropdown-item @click="setEnumIcon">
                          <svg
                            width="30"
                            height="29"
                            fill="#F04F48"
                            xmlns="http://www.w3.org/2000/svg"
                          ><path d="M21.1435 19.0081l-4.74 1.271.002.0029-8.55501-8.5549 1.271-4.73809L3.11148.977051.105469 3.98206l.038025.03796C1.18349 9.78502 3.91549 15.3051 8.37149 19.7581c4.44701 4.451 9.95901 7.1799 15.71301 8.2219l.063.0431 3.005-3.0041-6.009-6.0109zM25.106 13.022v-2.001l-5.587.0019 9.607-9.60695L27.713 0l-9.607 9.60797.001-5.58502h-1.999l-.002 8.99905h9z" /></svg>
                        </b-dropdown-item>
                        <b-dropdown-item @click="setEnumIcon">
                          <svg
                            width="36"
                            height="24"
                            viewBox="0 0 36 24"
                            fill="#F04F48"
                            xmlns="http://www.w3.org/2000/svg"
                          > <path d="M3.46698 20.002H8.20197C8.07097 19.355 8.00098 18.686 8.00098 18C8.00098 12.476 12.477 8 18.001 8C23.523 8 28.001 12.476 28.001 18C28.001 18.686 27.931 19.355 27.8 20.002H32.535L36.001 18.002L30.295 14.707L33.59 9.00201H27.001L27.002 2.414L21.296 5.70801L18.001 0L14.707 5.70697L9.00098 2.41199L9.00195 9H2.41199L5.70697 14.706L0 18L3.46698 20.002ZM0.000976562 24H36.001V22H0.000976562V24Z" /></svg>
                        </b-dropdown-item>
                        <b-dropdown-item @click="setEnumIcon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="#F04F48"
                            xmlns="http://www.w3.org/2000/svg"
                          > <path d="M36.001 18.002L30.295 14.707L33.59 9.00201H27.001L27.002 2.414L21.296 5.70801L18.001 0L14.707 5.70697L9.00098 2.41199L9.00195 9H2.41199L5.70697 14.706L0 18L5.70599 21.294L2.41095 27H9.00098L9 33.589L14.706 30.295L18 36.001L21.295 30.295L27 33.59L27.001 27.001L33.589 27.002L30.295 21.295L36.001 18.002ZM18.001 28C12.477 28 8.00098 23.524 8.00098 18C8.00098 12.476 12.477 8 18.001 8C23.523 8 28.001 12.476 28.001 18C28.001 23.524 23.523 28 18.001 28Z" /> </svg>
                        </b-dropdown-item>
                        <b-dropdown-item @click="setEnumIcon">
                          <svg
                            width="36"
                            height="26"
                            viewBox="0 0 36 26"
                            fill="#F04F48"
                            xmlns="http://www.w3.org/2000/svg"
                          > <path d="M27 9.00098L27.001 2.41302L21.295 5.70697L18 0L14.706 5.70697L9 2.41199L9.00098 9H2.41101L5.29999 14.002H8.836C10.379 10.47 13.898 8 18 8C22.101 8 25.62 10.47 27.164 14.002H30.701L33.589 9.00201L27 9.00098ZM36 18H0V16H36V18ZM28 22H16V20H28V22ZM18 26H10V24H18V26Z" /> </svg>
                        </b-dropdown-item>
                      </b-dropdown>
                      <!-- @keydown.enter="addEnumField" -->
                      <!-- v-model="enumItem.label" -->
                    </div>
                  </ValidationObserver>
                  <div class="btn-group">
                    <button
                      v-if="!editedEnumItem.enable"
                      type="button"
                      class="btn btn-success"
                      @click="addEnumField"
                    >
                      Добавить новый пункт
                    </button>
                    <button
                      v-if="editedEnumItem.enable"
                      type="button"
                      class="btn btn-warning"
                      @click="cancelEnumField"
                    >
                      Отменить
                    </button>
                    <button
                      v-if="editedEnumItem.enable"
                      type="button"
                      class="btn btn-secondary"
                      @click="saveEnumField"
                    >
                      Сохранить
                    </button>
                  </div>
                  <div
                    class="form-group"
                    style="padding-top: 20px;"
                  >
                    <b-list-group>
                      <draggable
                        :list="newField.enumItemsList"
                        :disabled="false"
                        class="list-group"
                        ghost-class="ghost"
                        @start="dragging = true"
                        @end="dragging = false"
                      >
                        <b-list-group-item
                          v-for="(enumItem, index) in newField.enumItemsList"
                          :key="enumItem.label"
                        >
                          <div class="widget-email-wr">
                            {{ enumItem.label }}
                          </div>
                          <div class="buttons field-edit-buttons">
                            <div
                              v-if="editedEnumItem.index != index"
                              class="btn-group"
                            >
                              <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="deleteEnumItem(index)"
                              >
                                Удалить
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-info"
                                @click="editEnumItem(index)"
                              >
                                Изменить
                              </button>
                            </div>
                            <div
                              v-else=""
                              class="btn-group"
                            >
                              <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="cancelEnumField"
                              >
                                Отменить
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-info"
                                @click="saveEnumField"
                              >
                                Сохранить
                              </button>
                            </div>
                          </div>
                        </b-list-group-item>
                      </draggable>
                    </b-list-group>
                  </div>
                </div>
              </form>
              <div
                v-if="!editedField.enable"
                class="btn-group"
              >
                <button
                  class="btn btn-secondary"
                  @click="changeFieldName = !changeFieldName"
                >
                  <span v-if="!changeFieldName">Доп.Настройки</span>
                  <span v-else="">Скрыть доп.Настройки</span>
                </button>

                <button
                  class="btn btn-success"
                  @click="addField"
                >
                  Добавить поле
                </button>
              </div>
              <div
                v-else=""
                class="btn-group"
              >
                <button
                  class="btn btn-secondary"
                  @click="changeFieldName = !changeFieldName"
                >
                  <span v-if="!changeFieldName">Доп.Настройки</span>
                  <span v-else="">Скрыть доп.Настройки</span>
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="cancelFieldEdit"
                >
                  Отменить
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="saveField"
                >
                  Сохранить
                </button>
              </div>

              <br>
              <br>
              <h5>добавленные поля</h5>
              <b-list-group>
                <draggable
                  :list="widgetCheme.fields"
                  :disabled="false"
                  class="list-group"
                  ghost-class="ghost"
                  @start="dragging = true"
                  @end="dragging = false"
                >
                  <b-list-group-item
                    v-for="(field, index) in widgetCheme.fields"
                    :key="index"
                  >
                    <div>
                      <div class="field__name">
                        Лэйбл: {{ field.label }}
                      </div>
                      <div class="field__type">
                        Тип: {{ field.type }}
                      </div>
                      <div class="field__type">
                        Название поля для программистов: {{ field.fieldName }}
                      </div>
                      <div class="field__type">
                        Placeholder: {{ field.placeholder }}
                      </div>
                      <div
                        v-if="field.required"
                        class="field__type"
                      >
                        Поле обязательное
                      </div>
                    </div>
                    <div class="buttons field-edit-buttons">
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="..."
                      >
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                          @click="deleteField(index)"
                        >
                          Удалить
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-primary"
                          @click="editField(index)"
                        >
                          Изменить
                        </button>
                      </div>
                    </div>
                  </b-list-group-item>
                </draggable>
              </b-list-group>
            </div>
            <div class="col-lg-4 col-md-4">
              <widget-preview :widget="widgetCheme" />
            </div>
          </div>
          <div class="widget-add-actions row">
            <div class="widget-add-actions__btns">
              <div
                v-show="!editedWidget.enable"
                class="btn-group"
                role="group"
              >
                <button
                  type="button"
                  class="btn btn-lg btn-danger"
                  @click="clearAll"
                >
                  Очистить
                </button>
                <button
                  type="submit"
                  class="btn btn-lg btn-success"
                  @click="addNewWidget"
                >
                  Добавить
                </button>
              </div>

              <div
                v-show="editedWidget.enable"
                class="btn-group"
                role="group"
              >
                <button
                  type="button"
                  class="btn btn-lg btn-danger"
                  @click="deleteWidget"
                >
                  Удалить
                </button>
                <button
                  type="button"
                  class="btn btn-lg btn-warning"
                  @click="cancelWidgetEdit"
                >
                  Отменить
                </button>
                <button
                  type="button"
                  class="btn btn-lg btn-success"
                  @click="saveWidgetEdit"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="clearfix">
        <div
          v-if="!widgets.length"
          class="col-lg-12 col-md-12"
        >
          <h1>Готовых виджетов пока нет</h1>
        </div>
        <div
          v-else=""
          class="col-lg-12 col-md-12"
        >
          <h4>Тут отображаются готовые виджеты</h4>
          <br>
          <div class="row">
            <div class="col-lg-5 col-md-5">
              <widget
                v-for="(widget, key) in widgets"
                v-if="!widget.parent"
                :key="key"
                :widget="widget"
                :index="key"
                @dublicate="dublicate"
                @edit-widget-start="editWidgetStart"
                @view="view"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading">
      Загрузка...
    </div>
  </div>
</template>

<script>
import WidgetPanel from './components/WidgetPanel.vue'
import WidgetSkeleton from './components/WidgetSkeleton.vue'
import EmailsList from './components/EmailsList.vue'
import draggable from "vuedraggable"
import customInput from "./components/ValidatorInput"
import WidgetAgentsParams from "./components/WidgetAgentsParams"
import WidgetBoundParams from "./components/WidgetBoundParams"

export default {
	name: 'App',
	components: {
		widget: WidgetPanel,
		widgetPreview: WidgetSkeleton,
		EmailsList,
		draggable,
		customInput,
		WidgetAgentsParams,
		WidgetBoundParams
	},
	data() {
	  return {
		widgetsLoaded: false,
		adding: false,
		widgetCheme: {},
		newField: {
			enumFieldsList: []
		},
		viewWidget: {},
		viewMode: false,
		/**
		 * объект для отслеживания изменений
		 * филдов редактируемого виджета
		 */
		editedField: {
			enable: false,
			index: null,
			oldValue: {}
		},
		//объект для отслеживания изменений виджета
		editedWidget: {
			enable: false,
			index: null,
		},

		/**
		 * объект для отслеживания изменений
		 * времен редактируемого виджета
		 */
		editedEnumItem: {
			enable: false,
			index: null,
			oldValue: {}
		},
		/**
		 * список готовых виджетов
		 */
		widgets: [],
		/**
		 * перечь доступных типов полей
		 */
		defaultFieldsNames: {
			text: 'field',
			phone: 'phone',
			email: 'email',
			enum: 'enum'
		},
		/**
		 * Пункт для перечисления
		 */
		enumItem: {
			label: '',
			value: '',
			icon: ''
		},
		changeFieldName: false,
		newEmail: '',
	  };
	},
	computed:
	{
		getWidgetsObjectForWidget()
		{
			var updateWidgets = {};
			for( var widget of this.widgets)
			{
				updateWidgets[widget.id] = widget
			}
			return updateWidgets;
		},
		baseUrl()
		{
			if(window.location.host == 'iticapital.ru' && window.location.host.indexOf('localhost:') == -1)
				return 'https://iticapital.ru';
			else
				return 'https://pre-prod.iticapital.ru';
		}
	},
	watch: {
		'newField.type':{
			handler(fieldType) {
				if(this.editedField.enable)
					return false;

				var prefix = this.defaultFieldsNames[fieldType] + '_';
				switch(fieldType){
					case 'phone': {
						this.newField.fieldName = prefix + this.getFieldsCount(fieldType);
						break;
					}
					case 'email': {
						this.newField.fieldName = prefix + this.getFieldsCount(fieldType);
						break;
					}
					case 'text': {
						this.newField.fieldName = prefix + this.uniqueNameGenerate();
						break;
					}
					case 'enum': {
						this.newField.fieldName = prefix + this.getFieldsCount(fieldType);
						this.newField.label = 'Выберите удобное время для звонка';
						break;
					}
				}
			},
			deep: true
		}
	},
	created()
	{
		this.getWidgets();
		this.setNewFieldScheme();
		this.setWidgetScheme();
	},
	methods: {
		setEnumIcon(e, instance)
		{
			console.log(this.newField, this.editedEnumItem);
			this.enumItem.icon = e.target.innerHTML;
			// if (this.editedEnumItem.index)
			// 	this.newField.enumItemsList.splice(this.editedEnumItem.index, 1, this.enumItem);
		},
		addNewBound(parentId)
		{
			let ind = this.widgets.findIndex(wg=>
			{
				return +wg.id === +parentId;
			});
			this.cancelWidgetEdit();
			this.dublicate(ind, +parentId);
		},
		setParent(id)
		{
			this.widgetCheme.parent = +id;
			this.saveWidgetEdit(true);
		},
		setBound(wgId, parentId)
		{
			this.editWidgetStartById(wgId);
			this.setParent(parentId);
		},
		scrollToTop()
		{
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		},

		confirmEvent(settings)
		{
			this.$bvModal.msgBoxConfirm(settings.header, {
				title: settings.title,
				size: 'sm',
				buttonSize: 'sm',
				okVariant: 'danger',
				okTitle: 'Удалить',
				cancelTitle: 'Отменить',
				centered: true
			})
			.then(value => {
				settings.confirmEvent(value);
			})
			.catch(err => {
				if(typeof settings.closeEvent == 'function')
					settings.closeEvent();
			});
		},

		updateEmails(newEmailsList)
		{
			this.widgetCheme.emails = [];
			for(let email of newEmailsList)
				this.widgetCheme.emails.push(email);
		},

		// добавление виджета
		async addNewWidget()
		{
			const widgetIsValid = await this.$refs.widgetSettings.validate();
			if(!widgetIsValid)
				return;

			this.$axios.post(this.baseUrl + '/widget-constructor/addwidget/', JSON.stringify(this.widgetCheme))
			.then(() => {
					this.widgets.push(this.widgetCheme);
					this.cancelChangeWidget();
				})
				.catch(error => {
					console.log('doesn\'t send');
				});
		},

		// очищение объекта виджета(убираем реактивность после добавления виджета)
		setWidgetScheme()
		{
			this.widgetCheme = {
				id: this.getUniqueId(),
				name: '',
				fields: [],
				title: '',
				activateUrl: '',
				description: '',
				enabled: true,
				agent: '10',
				parent: '',
				prod: '',
				prodId: '',
				buttonTxt: 'Отправить',
				emails: [],
				sendToCrm: false,
				successHeader: 'Спасибо',
				successText: 'Мы все получили',
				errorHeader: 'Упс, что-то пошло не так',
				errorText: 'По технической причине до нас ничего не дошло',
			}

			requestAnimationFrame(() => {
				this.$refs.fieldSettings.reset();
			});
		},

		// очищение объекта поля(убираем реактивность после добавления поля)
		setNewFieldScheme()
		{
			this.newField = {
				label: '',
				fieldName: this.defaultFieldsNames.text,
				placeholder: '',
				type: 'text',
				placeholder: '',
				required: false,
				enumItemsList: []
			}
			requestAnimationFrame(() => {
				this.$refs.fieldSettings.reset();
			});
		},

		// обновляем id агента или продукта
		updateProdOrAgent(prodInfo)
		{
			this.widgetCheme[prodInfo.property] = prodInfo.value;
		},

		// очищение объекта поля(убираем реактивность после добавления поля)
		setNewEnumItemdScheme()
		{
			this.enumItem = {
				label: '',
				value: '',
				icon: ''
			}
			requestAnimationFrame(() => {
				this.$refs.enumSettings.reset();
			});
		},

		// добавляем поле в виджет
		async addField()
		{
			let enumIsValid = false;
			let fieldIsValid = await this.$refs.fieldSettings.validate();
			if(this.newField.type == 'enum')
			{
				enumIsValid = await this.$refs.enumSettings.validate();
				fieldIsValid = fieldIsValid == (this.newField.enumItemsList.length > 0);
			}

			if(fieldIsValid)
			{
				this.widgetCheme.fields.push(this.newField);
				this.setNewFieldScheme();
			}
		},

		// добавление перечня времен для обратной связи
		async addEnumField()
		{
			const enumIsValid = await this.$refs.enumSettings.validate();
			if(!enumIsValid)
				return;

			if(!this.editedEnumItem.enable)
			{
				let newEnumItem = this.enumItem;
				if(!newEnumItem.value)
					newEnumItem.value = newEnumItem.label;

				this.newField.enumItemsList.push(newEnumItem);
			}

			this.cancelEditEnum();
		},

		async saveEnumField()
		{
			const enumIsValid = await this.$refs.enumSettings.validate();
			if(!enumIsValid)
				return false;

			this.newField.enumItemsList.splice(this.editedEnumItem.index, 1, this.enumItem);
			this.cancelEditEnum();
		},

		cancelEditEnum()
		{
			this.editedEnumItem =  {
				enable: false,
				index: null
			}
			this.setNewEnumItemdScheme();
		},

		// редактирование времени обратной связи
		editEnumItem(index)
		{
			this.editedEnumItem.enable = true;
			this.editedEnumItem.index = index;
			this.editedEnumItem.oldValue = {...this.newField.enumItemsList[index]};
			this.enumItem = this.newField.enumItemsList[index];
		},

		// удаление пункта времени из списка добавленных
		deleteEnumItem(index)
		{
			this.confirmEvent({
				header: `Удалить поле "${this.newField.enumItemsList[index].label}"`,
				title: 'Подтвердите удаление поля',
				confirmEvent: (value) => {
					if(value)
						this.newField.enumItemsList.splice(index, 1);
				}
			});
		},

		// удаление пункта времени из списка добавленных
		cancelEnumField()
		{
			this.newField.enumItemsList.splice(this.editedEnumItem.index, 1, this.editedEnumItem.oldValue);
			this.cancelEditEnum();
		},

		// счетик инпутов по типу
		getFieldsCount(type)
		{
			let inpCount = 0;

			for ( let field of this.widgetCheme.fields )
				if (type === field.type) inpCount++;

			return inpCount+1;
		},

		// генерация имен для инпутов
		uniqueNameGenerate()
		{
			let makedId = '';
			let char_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

			for(let i=0; i < 6; i++ )
			{
				makedId += char_list.charAt(Math.floor(Math.random() * char_list.length));
			}

			return makedId;
		},

		// отменяем все изменения
		clearAll()
		{
			this.setNewFieldScheme();
			this.setWidgetScheme();
			this.scrollToTop();
		},

		// выход из режима редактирования виджета
		cancelChangeWidget()
		{
			this.clearAll();
			this.adding = false;
			this.editedWidget.enable = false;
		},

		// метод для просмотра виджета по клику
		view(key)
		{
			this.viewMode = true;
			this.viewWidget = this.widgets[key];

			itiRqCall.widgets = this.getWidgetsObjectForWidget;
			itiRqCall.showForm(this.viewWidget.id);
		},

		// удаление филда по клику на кнопку 'Удалить'
		deleteField(index)
		{
			this.confirmEvent({
				header: `Удалить поле "${this.widgetCheme.fields[index].label}"`,
				title: 'Подтвердите удаление поля',
				confirmEvent: (value) => {
					if(value)
					{
						// this.cancelFieldEdit();
						this.widgetCheme.fields.splice(index, 1);
					}
				}
			});
		},

		// редактирование филда
		editField(index)
		{
			this.editedField.enable = true;
			this.editedField.index = index;
			this.editedField.oldValue = {...this.widgetCheme.fields[index]};
			this.newField = this.widgetCheme.fields[index];
			this.scrollToTop();
		},

		// выход из режима редактирования филда
		cancelFieldEdit()
		{
			this.editedField.enable = false;
			this.widgetCheme.fields.splice(this.editedField.index, 1, this.editedField.oldValue);
			this.setNewFieldScheme();
		},

		// сохранение филда
		async saveField()
		{
			let enumIsValid = false;
			let fieldIsValid = await this.$refs.fieldSettings.validate();

			if(this.newField.type == 'enum')
			{
				enumIsValid = await this.$refs.enumSettings.validate();
				fieldIsValid = fieldIsValid == (this.newField.enumItemsList.length > 0);
			}

			if(fieldIsValid)
			{
				this.editedField.enable = false;
				this.widgetCheme.fields.splice(this.editedField.index, 1, this.newField);
				this.setNewFieldScheme();
			}
		},

		// переход к режиму редактирования виджета по его id
		editWidgetStartById(id)
		{
			let index = this.widgets.findIndex(wg=>{return +wg.id === +id});
			if (index !== -1)
				this.editWidgetStart(index);
		},
		// переход к режиму редактирования выбранного виджета
		editWidgetStart(index)
		{
			this.adding = false;
			this.editedWidget.enable = true;
			this.editedWidget.index = index;
			this.widgetCheme = Object.assign({}, this.widgetCheme, this.widgets[index]);
			this.scrollToTop();
		},

		// выход из режима редактирования виджета
		cancelWidgetEdit()
		{
			this.editedWidget.enable = false;
			this.adding = false;
			this.setWidgetScheme();
			this.setNewFieldScheme();
		},

		// сохрание изменений виджета и отправка изменений на сервер
		async saveWidgetEdit(continueEdit)
		{
			const widgetIsValid = await this.$refs.widgetSettings.validate();
			if(!widgetIsValid)
				return;

			this.widgets.splice(this.editedWidget.index, 1, this.widgetCheme);

			// post на изменение виджета
			this.$axios.post(this.baseUrl + '/widget-constructor/editwidget/', JSON.stringify(this.widgetCheme))
			.then(() => {
				if (!continueEdit)
					this.cancelWidgetEdit();
			})
			.catch(error => {
				console.log(error);
			});
		},

		// генерация случайных 5-х значных ID
		getUniqueId()
		{
			var id = Math.round(Math.random() * (99999 - 1) + 1);

			for(var i = 0; i < this.widgets.length; i++)
				if (this.widgets[i].id == id)
					return this.getUniqueId();

			return id;
		},

		// дублирование виджета
		dublicate(id, parent)
		{
			var duplicate = JSON.parse(JSON.stringify(this.widgets[id]));
			duplicate.id = this.getUniqueId();
			duplicate.parent = parent ? parent : '';
			this.widgetCheme = duplicate;
			this.adding = true;

			this.scrollToTop();
		},

		// удаление виджета
		deleteWidget()
		{
			this.confirmEvent({
				title: 'Удаление виджета',
				header: `Вы действительно хотите удалить виджет "${this.widgets[this.editedWidget.index].name}"`,
				confirmEvent: (confirmed) => {
					if(confirmed)
					{
						this.$axios.post(this.baseUrl + '/widget-constructor/deletewidget/',JSON.stringify({widgetId: this.widgetCheme.id}))
					.then( response => {
							this.widgets.splice(this.editedWidget.index, 1);
						})
						.catch( error => {
							console.log(error);
						})
						this.cancelWidgetEdit();
					}
				}
			});
		},

		// получение всех виджетов с сервера
		getWidgets()
		{
			this.$axios.get(this.baseUrl + '/widget-constructor/getallwidgets/', { crossdomain: true })
			.then((response, err) => {
				for (let field of response.data.result )
				{
					var widgetSet = JSON.parse(field.settings);

					if (!+widgetSet.parent)
						widgetSet.parent = '';

					this.widgets.push(widgetSet);
				}
				this.widgetsLoaded = true;
			}).catch((err) => {
				this.widgetsLoaded = true;
			});
      console.log(this.widgets);
		},
	}
}
</script>

<style lang="scss">
	@import 'node_modules/bootstrap/scss/bootstrap';
	.modal-backdrop
	{
		opacity: 0.5;
	}
	.pagetitle
	{
		margin-top: 0;
	}
	.pagetitle-wr
	{
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		width: 100%;
		-ms-align-items: center;
		align-items: center;
		justify-content: space-between;
	}
	.panel-heading
	{
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		justify-content: space-between;
		-ms-align-items: center;
		align-items: center;
	}
	.panel-footer
	{
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		justify-content: flex-end;
	}

	.widget-add-actions
	{
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		-ms-align-items: center;
		align-items: center;justify-content: flex-end;
	}

	.field-edit-buttons
	{
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		justify-content: flex-end;
	}
	.form-group__flex
	{
		display: flex;
		justify-content: space-between;
	}
	.form-group__flex input
	{
		/*max-width: 75%;*/
		flex: 1;
		margin-right: 20px;
	}
	.times-list
	{
		margin-top: 10px;
		font-weight: bold;
	}
	.times-list__item:not(:last-child)
	{
		margin-bottom: 5px;
	}
	.times-list__item button
	{
		margin-left: 10px;
	}
	#app
	{
		position: relative;
	}

	.widget-container
	{
		display: none;
	}
	.loading
	{
		min-width: 100%;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		min-height: 100vh;
		background-color: #fff;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 55px;
	}
	.widget-container.loaded ~ .loading
	{
		display: none;
	}
	.widget-container
	{
		display: block;
	}
	.ghost
	{
		background-color: #ccc;
	}
</style>
