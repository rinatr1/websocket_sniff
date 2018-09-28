import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false


 window.app = new Vue({
	                    render: h => h(App),

                    }).$mount('#app');



function connected(p)
{

	p.onMessage.addListener(function(m)
	                        {

		                        new_data({
			                                         type: m.type,
			                                         data: m.message,
			                                         length: m.message.length,
			                                         time: new Date()
		                                         });

	                        });
}


browser.runtime.onConnect.addListener(connected);

function new_data(data)
{




	app.$children[0].ws_data.push(data);
}


function handleError(error) {
	if (error.isError) {
		console.log(`Devtools error: ${error.code}`);
	} else {
		console.log(`JavaScript error: ${error.value}`);
	}
}


function handleResult(result) {
	if (result[1]) {
		handleError(result[1]);
	}
}







