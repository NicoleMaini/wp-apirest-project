import { configureStore, combineReducers } from "@reduxjs/toolkit";
import PostReducer from "../reducers/postReducer";

const combinedReducers = combineReducers({
  post: PostReducer,
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
