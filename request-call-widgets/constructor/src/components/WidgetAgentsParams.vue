<template>
  <div class="row">
    <div class="col-lg-6">
      <b-form-group
        label="id агента"
      >
        <b-dropdown
          split
          block
          variant="primary"
          split-variant="outline-primary"
          class="mt-2 widget-agent-dropdown"
        >
          <template v-slot:button-content>
            {{ agent || 'Пусто' }}
          </template>
          <b-dropdown-form>
            <input
              v-model="searchAgentValue"
              type="text"
              class="form-control m-2"
              placeholder="Поиск по названию"
              name="widget-agent"
              list="agent-list"
              @input="searchAgent(searchAgentValue)"
            ></input>
          </b-dropdown-form>
          <b-dropdown-item
            v-for="(agent, agentInd) in searchAgents"
            :key="agentInd"
            @click="setAgent(agent)"
          >
            <b>{{ agent.id }}</b> - {{ agent.Name }}
          </b-dropdown-item>
        </b-dropdown>
      </b-form-group>
    </div>
    <div class="col-lg-6">
      <b-form-group
        label="Продукт"
      >
        <b-dropdown
          class="mt-2 widget-agent-dropdown"
          block
          split
          variant="primary"
          split-variant="outline-primary"
        >
          <template v-slot:button-content>
            {{ inputProdValue || 'Пусто' }}
          </template>
          <b-dropdown-form>
            <input
              v-model="searchProdValue"
              type="text"
              class="form-control m-2"
              placeholder="Поиск по названию"
              name="widget-prod"
              list="prod-list"
              @input="searchProd(searchProdValue)"
            ></input>
          </b-dropdown-form>
          <b-dropdown-item
            v-for="(prod, prodInd) in searchProds"
            :key="prodInd"
            @click="setProd(prod)"
          >
            <b>({{ prod.id }})</b> - {{ prod.Name }}
          </b-dropdown-item>
        </b-dropdown>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconQuestionSquareFill } from "bootstrap-vue";
export default {
	name: 'WidgetAgentsParams',
	components: {
		BIcon,
		BIconQuestionSquareFill
	},
	props: {
		agentId: {
			type: String,
			default: '',
		},
		prodId: {
			type: String,
			default: '',
		},
		prod: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			agent: '',
			prodValue: '',
			prodName: '',
			prodIdValue: '',
			searchAgentValue: '',
			searchAgents: [],
			agentsIds: [],
			searchProdValue: '',
			searchProds: [],
			prods: []
		}
	},
	computed:
	{
		inputProdValue()
		{
			if (!this.prod && this.prodId)
				return this.prodId;
			else if (!this.prodId && !this.prod)
				return this.prodName;
			else
				return this.prod;
		},
		baseUrl()
		{
			return 'https://iticapital.ru';

			// if(window.location.host == 'iticapital.ru' && window.location.host.indexOf('localhost:') == -1)
			// 	return 'https://iticapital.ru';
			// else
			// 	return 'http://pre-prod.iticapital.ru';
		},

	},
	watch: {
		agentId(newValue) {
			this.agent = newValue;
		},
		prod(newValue) {
			this.prodValue = newValue;
		},
		prodId(newValue) {
			this.prodIdValue = newValue;
		},
	},
	async mounted()
	{
		await this.getToken();
		await this.getProducts();
		await this.getPartners();
		this.searchProds = JSON.parse(JSON.stringify(this.prods));
		this.searchAgents = JSON.parse(JSON.stringify(this.agentsIds));

	},
	methods: {
		async getProducts()
		{
			let result = await this.$axios.get(this.baseUrl + '/apicrm/Products/',
				{
					crossdomain: true,
					dataType: "json",
					headers:
					{
						'Authorization': 'Bearer ' + this.getHeader(),
					},
				});
			this.$set(this, 'prods', result.data.data.result);
			return Promise.resolve;
		},
		async getPartners()
		{
			let result = await this.$axios.get(this.baseUrl + '/apicrm/Partners/',
				{
					crossdomain: true,
					dataType: "json",
					headers:
					{
						'Authorization': 'Bearer ' + this.getHeader(),
					},
				});

			this.$set(this, 'agentsIds', result.data.data.result);
			return Promise.resolve;
		},
		getHeader()
		{
			let str = this.$store.state.itCheckstr,
				key = this.$store.state.itEntry,
				token = '';

			try
			{
				token = str.split('q').filter(Boolean).map(function (s) {
					return String.fromCharCode(parseInt(s) ^ key);
				}).join('');
			}
			catch (error)
			{
				token = null;
			}

			return token;
		},
		async getToken()
		{
			if (this.$store.state.itEntry && this.$store.state.itCheckstr)
				return;

			let result = await this.$axios.get(this.baseUrl + '/api-entrance/getkey/', { crossdomain: true });

			if (result.data.success !== "true")
			{
				alert('Не удалось получить токен!');
				return false;
			}

			this.$store.commit('setItCheckstr', result.data.output['it-checkstr']);
			this.$store.commit('setItEntry', result.data.output['it-entry']);
			return Promise.resolve;
		},
		setAgent(agent)
		{
			this.agent = agent.id;

			this.updateData({
				property: 'agent',
				value: this.agent
			});
		},
		setProd(prod)
		{
			this.prodValue = prod.value;
			this.prodIdValue = prod.id;
			this.prodName = prod.Name;

			this.updateData({
				property: 'prod',
				value: this.prodValue
			});

			this.updateData({
				property: 'prodId',
				value: this.prodIdValue
			});
		},
		updateData(data)
		{
			this.$emit('updateProdOrAgentIds', {
				property: data.property,
				value: data.value
			});
		},
		searchAgent(searchValue)
		{
			if (searchValue === '')
			{
				this.searchAgentVis = false;
				this.searchAgents = JSON.parse(JSON.stringify(this.agentsIds));
				return;
			}

			if (!this.searchAgentVis)
				this.searchAgentVis = true;

			this.searchAgents = this.agentsIds.filter((item)=>{
				return item.Name.match(searchValue) || item.id.match(searchValue);
			})
		},
		searchProd(searchValue)
		{
			if (searchValue === '')
			{
				this.searchProdVis = false;
				this.searchProds = JSON.parse(JSON.stringify(this.prods));
				return;
			}

			if (!this.searchProdVis)
				this.searchProdVis = true;

			this.searchProds = this.prods.filter((item)=>{
				return item.Name.match(searchValue) || item.id.match(searchValue);
			})
		}

	}
}
</script>

<style lang="scss">
	.pseudo-input
	{
		display: inline-block;
		width: 100%;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		position: relative;
		flex: 1 1 0%;
		min-width: 0;
		margin-bottom: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: default;
	}
	.widget-agent-dropdown
	{
		.dropdown-menu
		{
			max-height: 320px;
			overflow-y: scroll;
			min-width: 400px;
			input
			{
				width: 200px;
			}
		}
	}
</style>