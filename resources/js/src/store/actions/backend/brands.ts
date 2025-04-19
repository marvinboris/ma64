import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "brands",
        {
            start: () => ({ type: actionTypes.BRANDS_START }),
            success: (data: object) => ({
                type: actionTypes.BRANDS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.BRANDS_FAIL, error }),
        },
        type,
        ...params
    );

export const resetBrands = () => ({ type: actionTypes.BRANDS_RESET });
export const getBrands = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getBrandsInfo = () => resource("info");
export const getBrand = (id: string) => resource("show", id);
export const postBrands = (data: unknown) => resource("post", data);
export const patchBrands = (id: string, data: unknown) =>
    resource("patch", id, data);
export const deleteBrands = (id: string) => resource("delete", id);
