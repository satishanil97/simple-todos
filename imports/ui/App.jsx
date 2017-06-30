//imports is to be considered as a special directory which behaves different from other directories.
//Files outside imports will be loaded automatically when the meteor server starts, while files inside the imports directory load only when an import statement is used to load them.

import React, { Component, PropTypes } from 'react';
import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';
import { createContainer } from 'meteor/react-meteor-data';

//App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    //find text in the field via React ref attribute
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),  //current time
    });

    //clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return(
      <div className="container">
        <header>
          <h1> ToDo List ({this.props.incompleteCount})</h1>
          <label className="hide-completed">
            <input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted.bind(this)} />
            Hide Completed Tasks
          </label>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
            <button type="submit" value="submit">Add</button>
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );//React components have a special field called state where you can store encapsulated component data
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired
};

//To use react-meteor-data,
//we need to wrap our component in a container using the createContainer Higher Order Component
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
  };
}, App);
/*The wrapped App component fetches tasks from the Tasks collection and supplies them to the underlying App component
it wraps as the tasks prop. It does this in a reactive way, so that when the contents of the database change,
the App re-renders*/
