import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "admins",
        {
            start: () => ({ type: actionTypes.ADMINS_START }),
            success: (data: object) => ({
                type: actionTypes.ADMINS_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.ADMINS_FAIL, error }),
        },
        type,
        ...params
    );

export const resetAdmins = () => ({ type: actionTypes.ADMINS_RESET });
export const getAdmins = (
    page: number | string = 1,
    show: number | string = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getAdminsInfo = () => resource("info");
export const getAdmin = (id?: string | number) => resource("show", id);
export const postAdmins = (data: object) => resource("post", data);
export const patchAdmins = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteAdmins = (id: string) => resource("delete", id);
