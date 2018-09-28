
function handleShown()
{

}

function handleHidden()
{

}


/**
Create a panel, and add listeners for panel show/hide events.
*/
browser.devtools.panels.create(
  "Websocket Sniffer",
  "/icons/ws_devtool.png",
  "/index.html"
).then((newPanel) => {
  newPanel.onShown.addListener(handleShown);
  newPanel.onHidden.addListener(handleHidden);




});


function listener(request, sender, sendResponse)
{


}




