import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "features",
        {
            start: () => ({ type: actionTypes.FEATURES_START }),
            success: (data: object) => ({
                type: actionTypes.FEATURES_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({
                type: actionTypes.FEATURES_FAIL,
                error,
            }),
        },
        type,
        ...params
    );

export const resetFeatures = () => ({ type: actionTypes.FEATURES_RESET });
export const getFeatures = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getFeaturesInfo = () => resource("info");
export const getFeature = (id: string) => resource("show", id);
export const postFeatures = (data: object) => resource("post", data);
export const patchFeatures = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteFeatures = (id: string) => resource("delete", id);
