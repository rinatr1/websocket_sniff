
###  Fork from: 
`https://github.com/rinatr1/websocket_sniff`

For staring:

1. `npm install`
2. `npm run build`
3. Start Firefox, go on `about:debugging`, add folder `dist` as Temporary Extensions
	(more [Your first extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension))

Issues:

* There is no checking for host, tab shows all messages from all websocket connections
* If you open tab on one site, and switch on another code for listening websocket will be added on the site.