import { combineReducers } from "redux";
import bookReducer from './BookReducer'
import {reducer as formReducer} from 'redux-form'

//  import historyReducer from "./HistoryReducer";
const reducers=combineReducers({
bookReducer,
form: formReducer

})

export default reducers