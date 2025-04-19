import * as actionTypes from "../actionTypes";
import { manageResource } from "../../../shared/utility";

const resource = (type: string, ...params: unknown[]) =>
    manageResource(
        "roles",
        {
            start: () => ({ type: actionTypes.ROLES_START }),
            success: (data: object) => ({
                type: actionTypes.ROLES_SUCCESS,
                ...data,
            }),
            fail: (error: Error) => ({ type: actionTypes.ROLES_FAIL, error }),
        },
        type,
        ...params
    );

export const resetRoles = () => ({ type: actionTypes.ROLES_RESET });
export const getRoles = (
    page: string | number = 1,
    show: string | number = 10,
    search = ""
) => resource("index", (page = 1), (show = 10), (search = ""));
export const getRolesInfo = () => resource("info");
export const getRole = (id: string) => resource("show", id);
export const postRoles = (data: object) => resource("post", data);
export const patchRoles = (id: string, data: object) =>
    resource("patch", id, data);
export const deleteRoles = (id: string) => resource("delete", id);
