import { createStore, applyMiddleware } from "redux";
import shopTestReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(shopTestReducer, composeWithDevTools());

export default store;
