import { Dispatch } from "redux";
import * as actionTypes from "../actionTypes";

export const resetPosts = () => ({ type: actionTypes.POSTS_RESET });
const postsStart = () => ({ type: actionTypes.POSTS_START });
const postsSuccess = (data: object) => ({
    type: actionTypes.POSTS_SUCCESS,
    ...data,
});
const postsFail = (error: Error) => ({ type: actionTypes.POSTS_FAIL, error });
export const getPosts =
    (postCategorySlug?: string) => async (dispatch: Dispatch) => {
        dispatch(postsStart());

        try {
            let res;
            if (postCategorySlug)
                res = await fetch(
                    `${window.PREFIX}post-categories/${postCategorySlug}/posts`
                );
            else res = await fetch(`${window.PREFIX}posts`);
            const resData = await res.json();

            dispatch(postsSuccess(resData));
        } catch (error) {
            console.log(error);
            dispatch(postsFail(error as Error));
        }
    };

export const getPost =
    (postCategorySlug: string, slug: string) => async (dispatch: Dispatch) => {
        dispatch(postsStart());

        try {
            let res;
            if (postCategorySlug)
                res = await fetch(
                    `${window.PREFIX}post-categories/${postCategorySlug}/posts/${slug}`
                );
            else res = await fetch(`${window.PREFIX}posts/${slug}`);
            const resData = await res.json();

            dispatch(postsSuccess(resData));
        } catch (error) {
            console.log(error);
            dispatch(postsFail(error as Error));
        }
    };
