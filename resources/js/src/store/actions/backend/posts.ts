import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "posts",
        {
            start: () => ({ type: actionTypes.POSTS_START }),
            success: (data: object) => ({
                type: actionTypes.POSTS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.POSTS_FAIL, error }),
        },
        type,
        ...params
    );

export const resetPosts = () => ({ type: actionTypes.POSTS_RESET });
export const getPosts = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getPostsInfo = () => resource("info");
export const getPost = (id: string) => resource("show", id);
export const postPosts = (data: object) => resource("post", data);
export const patchPosts = (id: string, data: object) =>
    resource("patch", id, data);
export const deletePosts = (id: string) => resource("delete", id);
