import AWS from 'aws-sdk'
import { tableName } from './table-name.json'
import { promisifyAll } from 'bluebird';

const docClient = promisifyAll(new AWS.DynamoDB.DocumentClient());

async function create(event) {
	const inputBody = event.body && JSON.parse(event.body)
	try {
		const data = await docClient.putAsync({
			TableName: tableName,
			Item: {
				"title": inputBody.title,
				"done": (inputBody.done || false) ? 1 : 0
			}
		});
		return JSON.stringify(data, null, 2);
	} catch (err) {
		console.error('create error', err);
	}
}

async function update(event) {
	const inputBody = event.body && JSON.parse(event.body)
	try {
		console.log('updateAsync')
		const data = await docClient.updateAsync({
			TableName: tableName,
			Key: {
				"title": inputBody.title
			},
			UpdateExpression: "set done=:d",
			ExpressionAttributeValues:{
				":d": (inputBody.done || false) ? 1 : 0
			},
			ReturnValues:"ALL_NEW"
		})
		return data.Attributes;
	} catch (err) {
		console.log('update error', err)
	}
}

async function list(event) {
	const data = await docClient.scanAsync({
		TableName : tableName
	});
	return data.Items;
}


export async function todos(event, context, callback) {
	let body;

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
