import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Api from './Api';


class App extends Component {
    constructor(props) {
        super(props)
            // console.log(props)
        this.state = {
            todos: [],
            newTodoTitle: ''
        }
        this.listTodos()
    }

    async listTodos() {
        this.setState({
            todos: await Api.listTodos()
        });
    }

    async create() {
        const result = await Api.createTodo(this.state.newTodoTitle, false)
        console.log(result);
    }

    onNewTodoTitleChange(event) {
        this.setState({
            newTodoTitle: event.target.value
        });
    }

    render() {
        const rows = this.state.todos.map((todo, key) =>
            <li className={todo.done ? 'todo done' : 'todo not-done'} key={key}>
                {todo.title} <input type="checkbox" checked={todo.done} />
            </li>)
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to Todo9000</h2>
            </div>
            <input type="text" onChange={this.onNewTodoTitleChange.bind(this)} /><button onClick={this.create.bind(this)}>create</button>
            <ul className="todos">{rows}</ul>
          </div>
        );
    }
}

export default App;
