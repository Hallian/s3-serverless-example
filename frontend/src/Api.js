import { find, pick } from 'lodash';
import pathConfig from './path.config.json';

export const getPathConfig = (path) => find(pathConfig, { path })

export const requestFactory = (path, method) => {
	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	method = method.toUpperCase();
	if (!Object.keys(path.methods).includes(method))
		throw new Error(`Method ${method} not supported by ${path.path}`);
	return new Request(path.url, {
		method,
		headers,
		mode: 'cors',
		cache: 'default'
	});
}

export const listTodos = async () => (await fetch(requestFactory(getPathConfig('/todos/list'), 'GET'))).json()

