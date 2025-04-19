import { Dispatch } from "redux";
import * as actionTypes from "../actionTypes";
import { authDataUpdateSuccess } from "../auth";

export const resetSettings = () => ({ type: actionTypes.SETTINGS_RESET });
const settingsStart = () => ({ type: actionTypes.SETTINGS_START });
const settingsSuccess = (data: object) => ({
    type: actionTypes.SETTINGS_SUCCESS,
    ...data,
});
const settingsFail = (error: Error) => ({
    type: actionTypes.SETTINGS_FAIL,
    error,
});
export const getSettings =
    () => async (dispatch: Dispatch, getState: Function) => {
        dispatch(settingsStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const url = `${window.PREFIX + role}/settings`;
            const res = await fetch(url, {
                headers: {
                    Authorization: token || "",
                },
            });
            const resData = await res.json();
            dispatch(settingsSuccess(resData));
        } catch (error) {
            console.log(error);
            dispatch(settingsFail(error as Error));
        }
    };

export const restaurantSettings =
    (data: HTMLFormElement) =>
    async (dispatch: Dispatch, getState: Function) => {
        dispatch(settingsStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const form = new FormData(data);
            const res = await fetch(
                `${window.PREFIX + role}/settings/restaurant`,
                {
                    method: "POST",
                    body: form,
                    headers: {
                        Authorization: token || "",
                    },
                }
            );
            const resData = await res.json();
            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            dispatch(settingsSuccess(resData));
            if (resData.data) dispatch(authDataUpdateSuccess(resData.data));
        } catch (error) {
            console.log(error);
            dispatch(settingsFail(error as Error));
        }
    };

export const accountSettings =
    (data: HTMLFormElement) =>
    async (dispatch: Dispatch, getState: Function) => {
        dispatch(settingsStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const form = new FormData(data);
            const res = await fetch(
                `${window.PREFIX + role}/settings/account`,
                {
                    method: "POST",
                    body: form,
                    headers: {
                        Authorization: token || "",
                    },
                }
            );
            const resData = await res.json();
            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            dispatch(settingsSuccess(resData));
            if (resData.data) dispatch(authDataUpdateSuccess(resData.data));
        } catch (error) {
            console.log(error);
            dispatch(settingsFail(error as Error));
        }
    };

export const cmsSettings =
    (data: HTMLFormElement) =>
    async (dispatch: Dispatch, getState: Function) => {
        dispatch(settingsStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const form = new FormData(data);
            const res = await fetch(`${window.PREFIX + role}/settings/cms`, {
                method: "POST",
                body: form,
                headers: {
                    Authorization: token || "",
                },
            });
            const resData = await res.json();
            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            dispatch(settingsSuccess(resData));
            if (resData.data) dispatch(authDataUpdateSuccess(resData.data));
        } catch (error) {
            console.log(error);
            dispatch(settingsFail(error as Error));
        }
    };

export const translatableSettings =
    (data: HTMLFormElement) =>
    async (dispatch: Dispatch, getState: Function) => {
        dispatch(settingsStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const form = new FormData(data);
            const res = await fetch(
                `${window.PREFIX + role}/settings/translatable`,
                {
                    method: "POST",
                    body: form,
                    headers: {
                        Authorization: token || "",
                    },
                }
            );
            const resData = await res.json();
            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            dispatch(settingsSuccess(resData));
            if (resData.data) dispatch(authDataUpdateSuccess(resData.data));
        } catch (error) {
            console.log(error);
            dispatch(settingsFail(error as Error));
        }
    };

export const languageSettings =
    (data: HTMLFormElement) =>
    async (dispatch: Dispatch, getState: Function) => {
        dispatch(settingsStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const form = new FormData(data);
            const res = await fetch(
                `${window.PREFIX + role}/settings/language`,
                {
                    method: "POST",
                    body: form,
                    headers: {
                        Authorization: token || "",
                    },
                }
            );
            const resData = await res.json();
            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            dispatch(settingsSuccess(resData));
            if (resData.data) dispatch(authDataUpdateSuccess(resData.data));
        } catch (error) {
            console.log(error);
            dispatch(settingsFail(error as Error));
        }
    };
