import React, { Component } from 'react';
import ColumnList from './components/ColumnList/ColumnList';
import logo from './logo.svg';
import './App.css';

/**
 * App component, is a main class
 */
class App extends Component {

  // constructor
  constructor () {

    super();

    // default state
    const tasks = JSON.parse(
      (window.localStorage.getItem('toDoListTasks') || '[]')
    );

    this.state = { tasks };
  }

  // Update to local storage
  updateLocalStorage = tasks => {

    const stringified = JSON.stringify(tasks);
    window.localStorage.setItem('toDoListTasks', stringified);
  }

  // Save/Update tasks
  updateAndSave = tasks => {

    this.updateLocalStorage(tasks);
    this.setState({ tasks });
  }

  // Add task
  addTask = e => {
    
    e.preventDefault();

    let { tasks } = this.state;

    let taskTarget = e.target.querySelector('input');

    const value = taskTarget.value;

    if(!value) {
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      description: value,
      status: 'To Do'
    };

    taskTarget.value = '';
    tasks = tasks.concat(newTask);
    this.updateAndSave(tasks);

  };

  // Update task
  updateTask = (target, task) => {
    
    let { tasks } = this.state;
    
    tasks = tasks
      .filter(t => t.id !== task.id)
      .concat({
        ...task,
        status: target.checked ? 'Done' : 'To Do'
      });

      this.updateAndSave(tasks);

  };

  render() {

    // Default tasks list
    const { tasks } = this.state;

    // Default columns list
    const columns = [
      { title: 'To Do', tasks },
      { title: 'Done', tasks }
    ];

    // Render component to DOM
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React To-Do List</h2>
        </header>
        <div className="App-container">
          <div className="app-lists">
            { columns.map(column => (
              <ColumnList 
                key={column.title}
                columnTitle={column.title}
                tasks={column.tasks}
                addTask={this.addTask}
                updateTask={this.updateTask}
              />
            )) }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
