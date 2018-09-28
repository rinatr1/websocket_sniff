import VueJsonPretty from 'vue-json-pretty';

export default {
	name: "ws_detail",
	components: {
		VueJsonPretty
	},

	data()
	{
		return {
			edit_mode: false,
			temp_data: String,
			is_json: false
		};
	},
	props:
		{
			item_data: {
				type: String,
				default: {}
			},

		},
	computed: {
		item_virtual_data()
		{
			return JSON.parse(this.item_data);
		},

	},
	watch: {
		item_data()
		{
			try
			{
				let t = JSON.parse(this.item_data);
				this.temp_data = JSON.stringify(t, null, 4);
				this.is_json = true;

			} catch (e)
			{

				this.temp_data = this.item_data;
				this.is_json = false;
			}
		}

	},
	created()
	{
		console.log('created');

		try
		{
			let t = JSON.parse(this.item_data);
			this.temp_data = JSON.stringify(t, null, 4);
			this.is_json = true;

		} catch (e)
		{
			console.log('error')
			this.temp_data = this.item_data;
			this.is_json = false;
		}
	},

	methods: {
		edit()
		{
			this.edit_mode = true;
		},
		send()
		{
			this.$emit('ws_send', this.temp_data);
		},
		hide()
		{
			this.$emit('hide_detail');
		}
	},


};