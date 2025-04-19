import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "languages",
        {
            start: () => ({ type: actionTypes.LANGUAGES_START }),
            success: (data: object) => ({
                type: actionTypes.LANGUAGES_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({
                type: actionTypes.LANGUAGES_FAIL,
                error,
            }),
        },
        type,
        ...params
    );

export const resetLanguages = () => ({ type: actionTypes.LANGUAGES_RESET });
export const getLanguages = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getLanguagesInfo = () => resource("info");
export const getLanguage = (id: string) => resource("show", id);
export const postLanguages = (data: object) => resource("post", data);
export const patchLanguages = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteLanguages = (id: string) => resource("delete", id);
