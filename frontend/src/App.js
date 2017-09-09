import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    // this.listTodos()
  }

  // async listTodos() {
  //   const todos = await Api.listTodos()
  //   console.log(todos)
  //   this.todos = todos.message
  //   // this.todos = await todos.json().message
  //   // console.log(await todos.json())
  // }

  create() {
    console.log('create new')
  }

  render() {
    const rows = this.props.todos.map((todo, key) =>
        <li className={todo.done ? 'todo done' : 'todo not-done'} key={key}>
            {todo.title} <input type="checkbox" checked={todo.done} />
        </li>)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Todo9000</h2>
        </div>
        <input type="text" /><button onClick={this.create}>create</button>
        <ul className="todos">{rows}</ul>
      </div>
    );
  }
}

export default App;
