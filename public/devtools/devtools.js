// activated when user opens Tab
function handleShown() {
    browser.runtime.sendMessage({
        type: "open_websocket_tab"
    });
}

// activated when user closes Tab
function handleHidden() {
    browser.runtime.sendMessage({
        type: "close_websocket_tab"
    });
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
}




