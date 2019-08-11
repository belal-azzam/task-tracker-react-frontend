import { combineReducers } from "redux";
import taskReducer from "./tasks/reducer";
import generalReducer from './general/reducer';
import userReducer from './users/reducer';
export default combineReducers({
    tasks: taskReducer,
    general: generalReducer,
    users: userReducer,
});