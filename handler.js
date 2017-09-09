export function todos(event, context, callback) {
	let body;

	switch (event.httpMethod) {
		case 'POST':
			body = { title: 'mock new todo', done: false };
			break;
		case 'PUT':
			body = { title: 'mock updated todo', done: true };
			break;
		case 'GET':
			body = [
				{ title: 'mock new todo', done: false },
				{ title: 'mock updated todo', done: true },
				{ title: 'mock other todo', done: true },
				{ title: 'mock yet another todo', done: false }
			];
			break;
	}

	const response = {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "http://localhost:3000", // Required for CORS support to work
			"Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
		},
		body: JSON.stringify(body),
	};

	callback(null, response);
}
