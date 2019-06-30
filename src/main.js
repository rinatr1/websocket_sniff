import Vue from 'vue'
import App from './App.vue'


function connected(p) {
    p.onMessage.addListener(function (m) {

        new_data({
            type: m.type,
            data: m.message,
            length: m.message.length,
            time: new Date()
        });

    });
}

function new_data(data) {
    app.$children[0].ws_data.push(data);
}

Vue.config.productionTip = false;
window.app = new Vue({
    render: h => h(App),

}).$mount('#app');
browser.runtime.onConnect.addListener(connected);






