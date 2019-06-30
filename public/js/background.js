/**
 When we receive the message, execute the given script in the given
 tab.
 */
function handleMessage(request, sender, sendResponse) {
    let myPort;
    switch (request.type) {
        case 'from_websocket':

            myPort = browser.runtime.connect({name: "from_websocket"});
            myPort.postMessage(request);
            break;

        case 'to_websocket':

            myPort = browser.runtime.connect({name: "from_websocket"});
            myPort.postMessage(request);
            break;

        case 'open_websocket':

            myPort = browser.runtime.connect({name: "from_websocket"});
            myPort.postMessage(request);
    }

    // if (sender.url != browser.runtime.getURL("/pages/panel.html"))
    // {
    // 	return;
    // }

    // browser.tabs.executeScript(
    //     sender.tab.id,
    //     {
    //         code: request.script
    //     });

}


/**
 Listen for messages from our devtools panel.
 */
browser.runtime.onMessage.addListener(handleMessage);



