import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "products",
        {
            start: () => ({ type: actionTypes.PRODUCTS_START }),
            success: (data: object) => ({
                type: actionTypes.PRODUCTS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({
                type: actionTypes.PRODUCTS_FAIL,
                error,
            }),
        },
        type,
        ...params
    );

export const resetProducts = () => ({ type: actionTypes.PRODUCTS_RESET });
export const getProducts = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getProductsInfo = () => resource("info");
export const getProduct = (id: string) => resource("show", id);
export const postProducts = (data: object) => resource("post", data);
export const patchProducts = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteProducts = (id: string) => resource("delete", id);
