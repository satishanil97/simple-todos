import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js'

//Task component -- represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
    /*The update function on a collection takes two arguments.
    The first is a selector that identifies a subset of the collection,
    and the second is an update parameter that specifies what should be done to the matched objects.*/
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return(
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>&times;</button>
        <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked.bind(this)}/>

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}

Task.propTypes = {
  //This component gets the task to display through a react prop
  //We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired
};
