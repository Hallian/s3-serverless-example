export function todos(event, context, callback) {
	let message;

	switch(event.httpMethod) {
		case 'POST': message = 'create something'; break; 
		case 'PUT': message = 'update something'; break;
		case 'GET': message = 'list something'; break;
	}

	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message,
			input: event,
		}),
	};

	callback(null, response);
}
