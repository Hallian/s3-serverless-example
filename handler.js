export function todos(event, context, callback) {
	let body;

	const inputBody = event.body && JSON.parse(event.body)

	switch (event.httpMethod) {
		case 'POST':
			body = { title: inputBody.title, done: inputBody.done || false };
			break;
		case 'PUT':
			body = { title: 'mock updated todo', done: true, input: event };
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
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		},
		body: JSON.stringify(body),
	};

	callback(null, response);
}
