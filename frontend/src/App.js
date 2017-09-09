import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import 'purecss/build/pure.css'
import * as Api from './Api'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            newTodoTitle: ''
        }
        setInterval(this.listTodos.bind(this), 60 * 1000)
        this.listTodos()
    }

    async listTodos() {
        this.setState({
            todos: await Api.listTodos()
        })
    }

    async create(event) {
        event.preventDefault();
        await Api.createTodo(this.state.newTodoTitle, false)
        this.listTodos()
        this.setState({
            newTodoTitle: ''
        })
    }

    update(title, done) {
        return async (event) => {
            await Api.updateTodo(title, !done)
            this.listTodos()
        }
    }

    delete(title) {
        return async (event) => {
            event.stopPropagation()
            await Api.deleteTodo(title)
            this.listTodos()
        }
    }

    onNewTodoTitleChange(event) {
        this.setState({
            newTodoTitle: event.target.value
        })
    }

    render() {
        const doneTodos = this.state.todos.filter(todo => todo.done)
        const notDoneTodos = this.state.todos.filter(todo => !todo.done)

        const makeRows = (todos, empty) => {
            if (todos.length === 0)
                return (<div className="empty-list">
                    <h1>{empty.line1}</h1>
                    <h2>{empty.line2}</h2>
                </div>)

            const rows = todos.map((todo, key) =>
                <li key={todo.title} className={'todo ' + (todo.done ? 'done' : 'not-done')} onClick={this.update(todo.title, todo.done).bind(this)}>
                    <input type="checkbox" id={todo.title} checked={todo.done} readOnly />
                    <label htmlFor={todo.title}>
                        {todo.title}
                    </label>
                    <i className="fa fa-trash-o delete-todo" onClick={this.delete(todo.title).bind(this)}></i>
                </li>
            )
            return (<ul className="todos">{rows}</ul>)
        }
        const doneTodosElement = makeRows(doneTodos, { line1: 'Nothing done.', line2: 'Start working!' })
        const notDoneTodosElement = makeRows(notDoneTodos, { line1: 'Nothing to do!', line2: 'Start by creating a todo.' })

        return (
          <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="content">
                    <h2>Welcome to Todo9000</h2>
                </div>
            </div>
            <div className="content">
                <form className="pure-form add-todo-form">
                    <fieldset>
                        <input type="text" className="pure-u-4-5" value={this.state.newTodoTitle} onChange={this.onNewTodoTitleChange.bind(this)} placeholder="What needs to get done?" />
                        <button className="pure-button pure-u-1-5 pure-button-primary" onClick={this.create.bind(this)}>create</button>
                    </fieldset>
                </form>
                {notDoneTodosElement}
                <div className="separator"></div>
                {doneTodosElement}
              </div>
          </div>
        )
    }
}

export default App
