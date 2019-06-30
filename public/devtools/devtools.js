// activated when user opens Tab
function handleShown() {
    console.log("handleShown");
}

// activated when user closes Tab
function handleHidden() {
    console.log("handleHidden");
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


function listener(request, sender, sendResponse) {

    console.log("111ddd---")

}




