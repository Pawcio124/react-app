import {combineReducers} from "redux";
import projectList from "./reducers/projectList";
import project from "./reducers/project"
import taskList from "./reducers/taskList";
import task from "./reducers/task"
import auth from "./reducers/auth"
import registration from "./reducers/registration"
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from "react-router-redux";

export default combineReducers({
   projectList,
   project,
   taskList,
   task,
   auth,
   registration,
   router: routerReducer,
   form: formReducer
});