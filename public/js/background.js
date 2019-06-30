/**
 When we receive the message, execute the given script in the given
 tab.
 */
function handleMessage(request, sender, sendResponse) {
    switch (request.type) {
        case 'from_websocket':
            var myPort = browser.runtime.connect({name: "from_websocket"});
            myPort.postMessage(request);
            break;

        case 'to_websocket':

            var myPort = browser.runtime.connect({name: "to_websocket"});
            myPort.postMessage(request);
            break;

        case 'open_websocket':

            var myPort = browser.runtime.connect({name: "open_websocket"});
            myPort.postMessage(request);
            break;

        case 'open_websocket_tab':
            window.localStorage.setItem("is_open_tab", "on");
            break;

        case 'close_websocket_tab':
            window.localStorage.setItem("is_open_tab", "off");
            break;

        case 'check_websocket_tab':
            sendResponse({response: window.localStorage.getItem("is_open_tab")});
            break;
    }
}


/**
 Listen for messages from our devtools panel.
 */
browser.runtime.onMessage.addListener(handleMessage);



