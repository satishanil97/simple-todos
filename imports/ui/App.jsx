//imports is to be considered as a special directory which behaves different from other directories.
//Files outside imports will be loaded automatically when the meteor server starts, while files inside the imports directory load only when an import statement is used to load them.

import React, { Component, PropTypes } from 'react';
import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';
import { createContainer } from 'meteor/react-meteor-data';

//App component - represents the whole app
class App extends Component {

  renderTasks() {
    return this.props.tasks.map((task) => (<Task key={task._id} task={task} />));
  }

  render() {
    return(
      <div className="container">
        <header>
          <h1> ToDo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
};

//To use react-meteor-data,
//we need to wrap our component in a container using the createContainer Higher Order Component
export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch()
  };
}, App);
/*The wrapped App component fetches tasks from the Tasks collection and supplies them to the underlying App component
it wraps as the tasks prop. It does this in a reactive way, so that when the contents of the database change,
the App re-renders*/
