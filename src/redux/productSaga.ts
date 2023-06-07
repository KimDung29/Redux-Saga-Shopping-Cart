import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getProductError, getProductSuccess } from './productSlice'


const url = "https://fakestoreapi.com/products";

function* toGetProduct(): any {
    try {
        const response = yield call(() => axios.get(url));
        yield put(getProductSuccess(response.data))   
    } catch (error: any) {
        yield put(getProductError(error))
    }
}

function* productSaga() {
    yield takeEvery('products/getProductFetch', toGetProduct)
}

export default productSaga;