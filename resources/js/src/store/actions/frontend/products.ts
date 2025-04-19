import { Dispatch } from "redux";
import * as actionTypes from "../actionTypes";

export const productsReset = () => ({ type: actionTypes.PRODUCTS_RESET });
const productsStart = () => ({ type: actionTypes.PRODUCTS_START });
const productsSuccess = (data: object) => ({
    type: actionTypes.PRODUCTS_SUCCESS,
    ...data,
});
const productsFail = (error: Error) => ({
    type: actionTypes.PRODUCTS_FAIL,
    error,
});
export const getProducts = () => async (dispatch: Dispatch) => {
    dispatch(productsStart());

    try {
        const res = await fetch(`${window.PREFIX}products`);
        const resData = await res.json();
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error as Error));
    }
};

export const getProduct = (slug: string) => async (dispatch: Dispatch) => {
    dispatch(productsStart());

    try {
        const res = await fetch(`${window.PREFIX}products/${slug}`);
        const resData = await res.json();
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error as Error));
    }
};
