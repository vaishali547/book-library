import index from './Redux/reducers'
import {createStore} from 'redux';
import { persistStore,persistReducer } from "redux-persist";
// import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools} from 'redux-devtools-extension'

const persistConfig={
  key:'persist-key',
  storage,
  // sessionStorage
}
const persistedReducer = persistReducer(persistConfig,index)
const Store = createStore(persistedReducer, composeWithDevTools()
)
export const persistor = persistStore(Store)
 export default Store