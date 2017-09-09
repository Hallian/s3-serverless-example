import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { sortBy } from 'lodash';

import * as Api from './Api';

Api.listTodos().then(todos => {
	todos = sortBy(todos, 'done');
	ReactDOM.render(<App todos={todos} />, document.getElementById('root'));
	registerServiceWorker();
})

// const todos = [{ title: 'do something', done: false }];

