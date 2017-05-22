import React from 'react';
import { Meteor }from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {  //knows how to call code when the page is loaded and ready.
                        //This code loads the other components and renders them into the #render-target html element.
  render(<App />, document.getElementById('render-target'));
});



/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
