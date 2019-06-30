var real_socket = window.WebSocket;


try {
    var th = document.getElementsByTagName("head")[0];
    s = create_js();
    th.insertBefore(s, th.firstChild);

} catch (err) {

    try {
        var th = document.getElementsByTagName("head")[0];
        s = create_js();
        th.insertBefore(s, th.firstChild);


        var th = document.getElementsByTagName("body")[0];
        s = create_js();
        th.insertBefore(s, th.firstChild);

    } catch (err) {
        s = create_js();
        document.insertBefore(s, document.firstElementChild);
    }

}


function create_js() {

    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');


    //https://gist.github.com/jeffdrumgod/d2bc277658ac4d94d802b99363a7efce

    s.text = `
 	(function debugify_content_script(){
  var nativeWebSocket = window.WebSocket;
  var requests = window.requestLog = {}; 
  var WebSocket = window.WebSocket = function(uri) {
    this.websocket = new nativeWebSocket(uri);
    this.websocket.onopen = this.onOpen.bind(this);
    this.websocket.onmessage = this.onMessage.bind(this);
    this.listeners = {onmessage: null, onopen: null};

    if (!window._openWebSockets) window._openWebSockets = [];
    window._openWebSockets.push(this);
  };
  WebSocket.prototype.send = function(msg) {
  	let ws_sniff_debug_to = new CustomEvent("ws_sniff_debug_to",
	  {
		  detail:
			  {
				  data: msg.data,
				  obj: this.websocket
			  }
	  }
	);
	document.body.dispatchEvent(ws_sniff_debug_to);
    this.websocket.send.apply(this.websocket, arguments);
  };
  WebSocket.prototype.onOpen = function(e){
  	let ws_sniff_debug_open = new CustomEvent("ws_sniff_debug_open",
	  {
		  detail:
			  {
				  data: e.data,
				  obj: this.websocket
			  }
	  }
	);
	document.body.dispatchEvent(ws_sniff_debug_open);
    this.listeners.onopen(e);
  };
  WebSocket.prototype.onMessage = function(e){
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
  };
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
})();`;
    return s;

}

function handleResponse(e) {
}

function handleError(e) {
}


document.body.addEventListener("ws_sniff_debug_to", function (e) {

    var sending = browser.runtime.sendMessage({
        type: "to_websocket",
        message: e.detail.data,
        url: e.detail.obj.url
    });
    sending.then(handleResponse, handleError);


});

document.body.addEventListener("ws_sniff_debug_from", function (e) {

    var sending = browser.runtime.sendMessage({
        type: "from_websocket",
        message: e.detail.data,
        url: e.detail.obj.url

    });
    sending.then(handleResponse, handleError);


});

document.body.addEventListener("ws_sniff_debug_open", function (e) {
    var sending = browser.runtime.sendMessage({
        type: "notify-attached-tab",
        message: e.detail.data,
        url: e.detail.obj.url
    });
    sending.then(handleResponse, handleError);

});


