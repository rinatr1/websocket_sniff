function handleError(error) {
	if (error.isError) {
		console.log(`Devtools error: ${error.code}`);
	} else {
		console.log(`JavaScript error: ${error.value}`);
	}
}

/**
 Handle the result of evaluating the script.
 If there was an error, call handleError.
 */
function handleResult(result) {
	if (result[1]) {
		handleError(result[1]);
	}
}



//http://jsfiddle.net/thrilleratplay/epcybL4v/
var thElm;
var startOffset;


var table_navs = document.querySelectorAll("table th");


table_navs.forEach(function(th)
{
	th.style.position = 'relative';

	var grip = document.createElement('div');
	grip.innerHTML = "&nbsp;";
	grip.style.top = 0;
	grip.style.right = 0;
	grip.style.bottom = 0;
	grip.style.width = '5px';
	grip.style.position = 'absolute';
	grip.style.cursor = 'col-resize';
	grip.addEventListener('mousedown', function (e) {
		thElm = th;
		startOffset = th.offsetWidth - e.pageX;
	});

	th.appendChild(grip);
});


document.addEventListener('mousemove', function (e) {
	if (thElm) {
		thElm.style.width = startOffset + e.pageX + 'px';
	}
});

document.addEventListener('mouseup', function () {
	thElm = undefined;
});



/*

let button =  document.getElementById("dev_tracking_button");
let status = document.getElementById("dev_tracking_status");
let registered = null;

document.getElementById("dev_tracking_button").addEventListener("click", () => {



	console.log('status:');
	console.log(button.dataset.status);

	if (status.dataset.status == 0)
	{
		status.dataset.status = 1;
		status.innerHTML = "Status: started";
		button.innerHTML = "Stop"

		registered = ws_register();


	}
	else
	{

		registered.unregister();
		registered = null;

		status.dataset.status = 0;
		status.innerHTML = "Status: stopped";
		button.innerHTML = "Start"
	}


});

*/



function connected(p)
{

	p.onMessage.addListener(function(m)
	{



		new_data({
			type: m.type,
			data: m.message,
			length: m.message.length,
			time: new Date()
		});

	});
}

browser.runtime.onConnect.addListener(connected);



// https://github.com/mdn/webextensions-examples/blob/master/embedded-webextension-sdk/step0-legacy-addon/lib/addon-ui.js
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Extending_the_developer_tools


ws_data = [];



function set_actual_data()
{
	ws_data.push(data);




}

function filter_select_input(old_data)
{
	let filter_value = document.getElementById('filter_type').value;

	if (filter_value !== "all")
	{
		//filter by type
		let new_data = new Array();

		old_data.forEach((row) =>{

			switch (filter_value)
			{
				case "from_websocket":
					if (row.type == 'from_websocket') new_data.push(row);
					break;
				case 'to_websocket':
					if (row.type == 'to_websocket') new_data.push(row);
					break;

			}
		});

		return new_data;
	}

	return old_data;
}


function filter_regex_input(old_data)
{


	let filter_value = document.getElementById('filter_regex').value;

	if (filter_value.length > 0)
	{


		let regexp   = RegExp(filter_value);
		let new_data = new Array();

		old_data.forEach((row) => {

			if (regexp.test(row.data) == true) new_data.push(row);
		});

		return new_data;
	}
	return old_data;
}

function filter_length_input(old_data)
{
	let filter_value = document.getElementById('filter_length').value;

	let new_data = [];

	if (filter_value.length > 0)
	{
		if (parseInt(filter_value) == filter_value)
		{
			//it is number
			old_data.forEach((row) =>{


				if (row.length == parseInt(filter_value))
				{
					new_data.push(row);
				}
			});

			return new_data;
		}
		else
		{
			let sign = filter_value.substring(0,1);

			let real_num = parseInt(filter_value.substring(1, filter_value.length));

			if (real_num !== NaN)
			{

				switch (sign)
				{

					case '>':

						old_data.forEach((row) =>{

							if (row.length > real_num)
							{
								new_data.push(row);
							}
						});

					break;
					case '<':

						old_data.forEach((row) =>{

							if (row.length < real_num)
							{
								new_data.push(row);
							}
						});

					break;
				}

				return new_data;
			}
			else
			{
				return old_data;
			}

		}

	}

	return old_data;
}


function generate_table(table_data)
{

	filtered_data = filter_select_input(table_data);
	filtered_data = filter_regex_input(filtered_data);
	filtered_data = filter_length_input(filtered_data);


	let content = "";

	document.querySelector('#websocket_log_table tbody').innerHTML = '';

	if (filtered_data.length > 0)
	{

		for (let i in filtered_data)
		{
			content += "<tr>"+ insert_row_formatter(filtered_data[i]) + "</tr>";
		}


		document.querySelector('#websocket_log_table tbody').innerHTML = content;
	}

}

function insert_row_formatter(row)
{
	let type_formatter = {
		"from_websocket":   "<span style = 'color:red'> ↓  </span>",
		"to_websocket":     "<span style = 'color:green'> ↑ </span>"
	};

	return     `<td>`+type_formatter[row.type]+`</td>
						<td>`+row.data+`</td>
						<td>`+row.length+`</td>
						<td>`+row.time+`</td>`;


}

function insert_row(row)
{

	var tr = document.querySelector('#websocket_log_table tbody').insertRow(-1);





	tr.innerHTML = insert_row_formatter(row);
}

function set_draft_data(data)
{
	ws_data.push(data);
}

function get_draft_data()
{
	return ws_data;
}

function clear_draft_data()
{
	 ws_data = [];
}

function new_data(data)
{
	set_draft_data(data);


	check_filter =  [{data}];

	check_filter = filter_select_input(check_filter);
	check_filter = filter_regex_input(check_filter);
	check_filter = filter_length_input(check_filter);


	if (check_filter.length > 0)
	{
		insert_row(data);
	}



}

document.getElementById('filter_type').addEventListener('change', () =>
{
	let data = get_draft_data();

	generate_table(data);
});

document.getElementById('clear_all').addEventListener('click', () =>
{
	let data = [];
	clear_draft_data();
	generate_table(data);
});


document.getElementById('filter_regex').addEventListener('keyup', () =>
{
	let data = get_draft_data();

	generate_table(data);
});



document.getElementById('filter_length').addEventListener('keyup', () =>
{
	let data = get_draft_data();

	generate_table(data);
});


document.getElementById('clear_filters').addEventListener('click', () =>
{
	document.getElementById('filter_type').options[0].selected=true;
	document.getElementById('filter_regex').value = "";
	document.getElementById('filter_length').value = "";

	let data = get_draft_data();

	generate_table(data);
});
