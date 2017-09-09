import AWS from 'aws-sdk'
import { tableName } from './table-name.json'
import { promisifyAll } from 'bluebird';

const docClient = promisifyAll(new AWS.DynamoDB.DocumentClient());

async function create(event) {
	const inputBody = event.body && JSON.parse(event.body)
	const data = await docClient.putAsync({
		TableName: tableName,
		Item: {
			"title": inputBody.title.trim(),
			"done": (inputBody.done || false) ? 1 : 0
		}
	});
	return data;
}

async function update(event) {
	const inputBody = event.body && JSON.parse(event.body)
	const data = await docClient.updateAsync({
		TableName: tableName,
		Key: {
			"title": inputBody.title.trim()
		},
		UpdateExpression: "set done=:d",
		ExpressionAttributeValues:{
			":d": (inputBody.done || false) ? 1 : 0
		},
		ReturnValues:"ALL_NEW"
	})
	return data.Attributes;
}

async function list(event) {
	const data = await docClient.scanAsync({
		TableName: tableName
	});
	return data.Items;
}

async function remove(event) {
	const result = docClient.deleteAsync({
	    TableName: tableName,
	    Key:{
	        "title": decodeURIComponent(event.pathParameters.id)
	    }
	});

	return result;
}

export async function todos(event, context, callback) {
	let body = {}, statusCode = 200;

	try {
		switch (event.httpMethod) {
			case 'POST':
				body = await create(event);
				break;
			case 'PUT':
				body = await update(event);
				break;
			case 'GET':
				body = await list(event);
				break;
			case 'DELETE':
				body = await remove(event);
				break;
		}
	} catch (err) {
		statusCode = 400
		console.error('error', err)
	}
	const response = {
		statusCode,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		},
		body: JSON.stringify(body),
	};

	callback(null, response);
}
