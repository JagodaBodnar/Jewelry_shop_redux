import { createStore, applyMiddleware } from "redux";
import shopTestReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();
const store = createStore(shopTestReducer, persistedState);
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStoreWithMiddleware(shopTestReducer, composeWithDevTools());

export default store;
