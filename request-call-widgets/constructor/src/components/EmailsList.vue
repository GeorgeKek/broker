<template>
  <div>
    <label>Адреса на которые скидывать заявки </label>
    <div>
      <ValidationObserver
        ref="emailInput"
        tag="div"
      >
        <customInput
          v-model="email"
          type="email"
          name="email"
          class="input-group"
          placeholder="first-email@iti.com"
          :rules="fieldRules"
          @onEnter="addNewEmail"
        >
          <div class="input-group-append">
            <button
              type="button"
              class="btn btn-secondary"
              @click="addNewEmail"
            >
              Добавить
            </button>
          </div>
        </customInput>
      </ValidationObserver>
    </div>
    <b-list-group>
      <b-list-group-item
        v-for="(email, index) in emails"
        :key="index"
        class="d-flex justify-content-between align-items-center"
      >
        <div
          v-if="editedEmail.index != index"
          class="widget-email-wr"
        >
          {{ email }}
        </div>
        <div
          v-else=""
          class="widget-email-edit"
        >
          <input
            v-model="editedEmail.value"
            type="email"
            name="email"
            class="form-control form-control-sm"
            placeholder="first-email@iti.com"
            focused
            @keydown.enter="saveEmail"
          >
        </div>
        <div
          v-if="editedEmail.index != index"
          class="btn-group"
        >
          <button
            type="button"
            class="btn btn-sm btn-danger"
            @click="deleteEmail(index)"
          >
            Удалить
          </button>
          <button
            type="button"
            class="btn btn-sm btn-info"
            @click="editEmail(index)"
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
            @click="cancelEditEmail"
          >
            Отменить
          </button>
          <button
            type="button"
            class="btn btn-sm btn-info"
            @click="saveEmail"
          >
            Сохранить
          </button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
	import customInput from "./ValidatorInput"
	export default {
		components: {customInput},
		props: ['emails'],
		data(){
			return {
				/**
				 * объект для отслеживания изменений
				 * почтовых адресов редактируемого виджета
				 */
				editedEmail: {
					enable: false,
					index: null
				},
				email: ''
			}
		},
		computed: {
			fieldRules() {
				if(this.emails.length > 0 && this.email == '')
				{
					requestAnimationFrame(() => {
						this.$refs.emailInput.reset();
					});
					return ''
				}
				else
				{
					requestAnimationFrame(() => {
						this.$refs.emailInput.reset();
					});
					return 'required|email';
				}
			}
		},
		methods: {
			itsEmail(email)
			{
				var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

				if (emailReg.test(email))
					return true;
				else
					return false;
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


			saveEmail()
			{
				if (this.itsEmail(this.editedEmail.value))
				{
					this.emails[this.editedEmail.index] = this.editedEmail.value;
					this.cancelEditEmail();
				}
				else
					alert('Enter correct email');
			},

			cancelEditEmail()
			{
				this.editedEmail.enable = false;
				this.editedEmail.index = null;
				this.newEmail = '';
				this.$emit('update', this.emails);
			},

			// удаление почтового адреса из списка добавленных
			deleteEmail(index)
			{
				this.confirmEvent({
					title: 'Удалить email адрес',
					header: `Вы действтительно хотите удалить адрес ${this.emails[index]}`,
					confirmEvent: () => {
						this.emails.splice(index, 1);
						this.$emit('update', this.emails);
					}
				})
			},

			// редактирование почтового адреса
			editEmail(index)
			{
				this.editedEmail.enable = true;
				this.editedEmail.index = index;
				this.editedEmail.value = this.emails[index];
			},

			// добавление нового почтового адреса
			addNewEmail()
			{
				if(this.itsEmail(this.email))
				{
					this.emails.push(this.email);
					this.$emit('update', this.emails);
					this.email = '';
					requestAnimationFrame(() => {
						this.$refs.emailInput.reset();
					});
				}
			},
		}
	}
</script>

<style lang="scss">

</style>