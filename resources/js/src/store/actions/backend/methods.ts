import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "methods",
        {
            start: () => ({ type: actionTypes.METHODS_START }),
            success: (data: object) => ({
                type: actionTypes.METHODS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.METHODS_FAIL, error }),
        },
        type,
        ...params
    );

export const resetMethods = () => ({ type: actionTypes.METHODS_RESET });
export const getMethods = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getMethodsInfo = () => resource("info");
export const getMethod = (id: string) => resource("show", id);
export const postMethods = (data: object) => resource("post", data);
export const patchMethods = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteMethods = (id: string) => resource("delete", id);
