/**
 When we receive the message, execute the given script in the given
 tab.
 */
function handleMessage(request, sender, sendResponse)
{


	switch (request.type)
	{
		case 'from_websocket':

			var myPort = browser.runtime.connect({name: "from_websocket"});
			myPort.postMessage(request);
			break;

		case 'to_websocket':

			var myPort = browser.runtime.connect({name: "from_websocket"});
			myPort.postMessage(request);
			break;

		case 'open_websocket':

			var myPort = browser.runtime.connect({name: "from_websocket"});
			myPort.postMessage(request);
			break;
	}
	if (sender.url != browser.runtime.getURL("/pages/panel.html"))
	{
		return;
	}


	browser.tabs.executeScript(
		request.tabId,
		{
			code: request.script
		});

}


/**
 Listen for messages from our devtools panel.
 */
browser.runtime.onMessage.addListener(handleMessage);



