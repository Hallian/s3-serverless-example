import { find } from 'lodash'
import pathConfig from './path.config.json'

const getPathConfig = (path) => find(pathConfig, { path })

const requestFactory = (path, method, params = {}) => {
	path = getPathConfig(path)
	method = method.toUpperCase()
	if (!Object.keys(path.methods).includes(method))
		throw new Error(`Method ${method} not supported by ${path.path}`)
	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	const url = Object.keys(params.url || []).reduce((sum, param) => sum.replace(`{${param}}`, params.url[param]), path.url)
	return new Request(url, {
		method,
		headers,
		mode: 'cors',
		cache: 'default',
		body: params.body && ['PUT', 'POST', 'PATCH'].includes(method) && JSON.stringify(params.body)
	})
}

const makeApiRequest = async (path, method, params) => (await fetch(requestFactory(path, method, params))).json()

export const listTodos = () => makeApiRequest('/todos/list', 'GET')

export const updateTodo = (id, title, done) => makeApiRequest('/todos/update/{id}', 'PUT', { url: { id }, body: { title, done } })

export const createTodo = (title, done) => makeApiRequest('/todos/create', 'POST', { body: { title, done } })
