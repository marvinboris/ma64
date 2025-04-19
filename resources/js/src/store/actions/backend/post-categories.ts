import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "post-categories",
        {
            start: () => ({ type: actionTypes.POST_CATEGORIES_START }),
            success: (data: object) => ({
                type: actionTypes.POST_CATEGORIES_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({
                type: actionTypes.POST_CATEGORIES_FAIL,
                error,
            }),
        },
        type,
        ...params
    );

export const resetPostCategories = () => ({
    type: actionTypes.POST_CATEGORIES_RESET,
});
export const getPostCategories = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getPostCategoriesInfo = () => resource("info");
export const getPostCategory = (id: string) => resource("show", id);
export const postPostCategories = (data: object) => resource("post", data);
export const patchPostCategories = (id: string, data: object) =>
    resource("patch", id, data);
export const deletePostCategories = (id: string) => resource("delete", id);
