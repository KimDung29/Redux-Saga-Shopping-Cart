import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import productSaga from "./productSaga";

const saga = createSagaMiddleware()
const store = configureStore({
    reducer: rootReducer,
    middleware: [saga]
})
saga.run(productSaga)

export default store;