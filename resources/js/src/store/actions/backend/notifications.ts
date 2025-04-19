import { Dispatch } from "redux";
import * as actionTypes from "../actionTypes";
import { authDataUpdateSuccess } from "../auth";

export const resetNotifications = () => ({
    type: actionTypes.NOTIFICATIONS_RESET,
});
const notificationsStart = () => ({ type: actionTypes.NOTIFICATIONS_START });
const notificationsSuccess = (data: object) => ({
    type: actionTypes.NOTIFICATIONS_SUCCESS,
    ...data,
});
const notificationsFail = (error: Error) => ({
    type: actionTypes.NOTIFICATIONS_FAIL,
    error,
});
export const getNotifications =
    () => async (dispatch: Dispatch, getState: Function) => {
        const token = localStorage.getItem("token");
        dispatch(notificationsStart());

        try {
            const res = await fetch(`${window.PREFIX}notifications`, {
                method: "GET",
                headers: {
                    Authorization: token || "",
                },
            });
            const resData = await res.json();
            dispatch(notificationsSuccess(resData));
        } catch (err) {
            console.log(err);
            dispatch(notificationsFail(err as Error));
        }
    };

export const getNotification =
    (id: string) => async (dispatch: Dispatch, getState: Function) => {
        const token = localStorage.getItem("token");
        dispatch(notificationsStart());

        try {
            const res = await fetch(`${window.PREFIX}notifications/${id}`, {
                method: "GET",
                headers: {
                    Authorization: token || "",
                },
            });
            const resData = await res.json();
            dispatch(notificationsSuccess(resData));
            if (resData.data) dispatch(authDataUpdateSuccess(resData.data));
        } catch (err) {
            console.log(err);
            dispatch(notificationsFail(err as Error));
        }
    };
