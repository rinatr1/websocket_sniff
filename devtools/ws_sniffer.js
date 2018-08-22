
var real_socket = window.WebSocket;


try
{
	var th = document.getElementsByTagName("head")[0] ;
	s = create_js();
	th.insertBefore(s, th.firstChild);

}
catch (err)
{

	try
	{
		var th = document.getElementsByTagName("body")[0];
		s = create_js();
		th.insertBefore(s, th.firstChild);

	} catch (err)
	{
		s = create_js();
		document.insertBefore(s, document.firstElementChild);
	}

}



function create_js()
{
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');


//https://gist.github.com/jeffdrumgod/d2bc277658ac4d94d802b99363a7efce

	s.text = `
	
	

	var real_socket = window.WebSocket;
	
	var WebSocket = window.WebSocket = function(uri)
	{
		this.websocket = new real_socket(uri);
		this.websocket.onopen = this.onOpen.bind(this);
		this.websocket.onmessage = this.onMessage.bind(this);
		this.listeners = {onmessage: null, onopen: null};






		if (!window._openWebSockets) window._openWebSockets = [];
		window._openWebSockets.push(this);
	};

	WebSocket.prototype.send = function(data) {
		

		// First create the event
		let ws_sniff_debug_to = new CustomEvent("ws_sniff_debug_to",
			{
				detail:
					{
						data: data,
						obj: this.websocket
					}
			}
		);

		document.body.dispatchEvent(ws_sniff_debug_to);

		this.websocket.send.apply(this.websocket, arguments);
	}

	WebSocket.prototype.onOpen = function(e)
	{
	

		// First create the event
		let ws_sniff_debug_open = new CustomEvent("ws_sniff_debug_open",
			{
				detail:
					{
						data: arguments,
						obj: this.websocket
					}
			}
		);

		this.listeners.onopen(e);
	}

	WebSocket.prototype.onMessage = function(e){
		


		// First create the event
		let ws_sniff_debug_from = new CustomEvent("ws_sniff_debug_from",
			{
				detail:
					{
						data: e.data,
						obj: this.websocket
					}
			}
		);

		document.body.dispatchEvent(ws_sniff_debug_from);

		this.listeners.onmessage(e);
	}

	Object.defineProperty(WebSocket.prototype, 'readyState', {
		get: function() {
			return this.websocket.readyState;
		}
	});

	Object.defineProperty(WebSocket.prototype, 'onopen', {
		get: function() {
			return this.listeners.onopen;
		},
		set: function(fn) {
			this.listeners.onopen = fn;
		}
	});


	Object.defineProperty(WebSocket.prototype, 'onclose', {
		get: function() {
			return this.websocket.onclose;
		},
		set: function(fn) {
			this.websocket.onclose = fn;
		}
	});


	Object.defineProperty(WebSocket.prototype, 'onmessage', {
		get: function() {
			return this.listeners.onmessage;
		},
		set: function(fn) {
			this.listeners.onmessage = fn;
		}
	});

	Object.defineProperty(WebSocket.prototype, 'onerror', {
		get: function() {
			
			return this.websocket.onerror;
		},
		set: function(fn) {
		
			this.websocket.onerror = fn;
		}
	});

`;

	return s;

}



document.body.addEventListener("ws_sniff_debug_to", function(e)
{


	browser.runtime.sendMessage({
		type: "to_websocket",
		message: JSON.stringify(e.detail.data),
		url: e.detail.obj.url
	});


});

document.body.addEventListener("ws_sniff_debug_from", function(e)
{


	browser.runtime.sendMessage({
		type: "from_websocket",
		message: JSON.stringify(e.detail.data),
		url: e.detail.obj.url

	});


});


document.body.addEventListener("ws_sniff_debug_open", function(e)
{

	browser.runtime.sendMessage({
		type: "notify-attached-tab",
		message: JSON.stringify(e.detail.data),
		url: e.detail.obj.url
	});

});


