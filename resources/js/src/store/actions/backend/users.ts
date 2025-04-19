import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "users",
        {
            start: () => ({ type: actionTypes.USERS_START }),
            success: (data: object) => ({
                type: actionTypes.USERS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.USERS_FAIL, error }),
        },
        type,
        ...params
    );

export const resetUsers = () => ({ type: actionTypes.USERS_RESET });
export const getUsers = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getUsersInfo = () => resource("info");
export const getUser = (id: string) => resource("show", id);
export const postUsers = (data: object) => resource("post", data);
export const patchUsers = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteUsers = (id: string) => resource("delete", id);
