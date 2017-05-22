import { Mongo } from 'meteor/mongo';
//To create the collection, we define a new tasks module that creates a Mongo collection and exports it:
/*Notice that we place this file in a new imports/api directory.
This is a sensible place to store API-related files for the application.
We will start by putting "collections" here and later we will add "publications"
that read from them and "methods" that write to them */
export const Tasks = new Mongo.Collection('tasks');
