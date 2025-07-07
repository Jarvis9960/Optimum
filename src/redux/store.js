import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer
  // You can add middleware like thunk or saga here if needed in the future
);

export default store;
