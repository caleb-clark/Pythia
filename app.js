var app = document.getElementById('app');


class application {
	constructor() {
		this.form = app.createElement('form');
	}
}


function set_up() {
	var form = app.createElement('form');
	var user_text = form.createElement('input');
	user_text.type = 'text';
}

document.addEventListener("load", set_up);

