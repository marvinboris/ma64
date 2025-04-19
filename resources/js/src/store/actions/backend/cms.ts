import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "cms",
        {
            start: () => ({ type: actionTypes.CMS_START }),
            success: (data: object) => ({
                type: actionTypes.CMS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.CMS_FAIL, error }),
        },
        type,
        ...params
    );

export const resetCms = () => ({ type: actionTypes.CMS_RESET });
export const getCms = (page = 1, show = 10, search = "") =>
    resource("index", (page = 1), (show = 10), (search = ""));
export const postCms = (data: object) => resource("post", data);
export const patchCms = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteCms = (id: string) => resource("delete", id);
