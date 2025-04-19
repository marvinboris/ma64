import { Dispatch, UnknownAction } from "redux";
import * as actionTypes from "./actionTypes";
import { Message } from "@/src/types/message";

const authStart = () => ({ type: actionTypes.AUTH_START });
const authMessage = (message: Message) => ({
    type: actionTypes.AUTH_MESSAGE,
    message,
});
const authFail = (error: Error) => ({ type: actionTypes.AUTH_FAIL, error });

export const authDataUpdateSuccess = (data: object) => ({
    type: actionTypes.AUTH_DATA_UPDATE_SUCCESS,
    data: { ...data },
});

const authUserLoginSuccess = (token: string, data: object) => ({
    type: actionTypes.AUTH_USER_LOGIN_SUCCESS,
    token,
    data: { ...data },
    role: "user",
});

const authPhotoSuccess = (photo: string) => ({
    type: actionTypes.AUTH_PHOTO_SUCCESS,
    photo,
});
const authSignupSuccess = (email: string) => ({
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
    signup: { status: true, email },
});
export const clearSignup = () => ({
    type: actionTypes.CLEAR_SIGNUP,
    signup: { status: false, email: null },
});

const authAdminLoginSuccess = (hash: string) => ({
    type: actionTypes.AUTH_ADMIN_LOGIN_SUCCESS,
    hash,
});
const authAdminVerifySuccess = (token: string, data: object) => ({
    type: actionTypes.AUTH_ADMIN_VERIFY_SUCCESS,
    token,
    data: { ...data },
    role: "admin",
});
const resendCodeSuccess = (hash: string, message: Message) => ({
    type: actionTypes.RESEND_CODE_SUCCESS,
    hash,
    message,
});

const authLogoutSuccess = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS,
    };
};

const checkAuthTimeout = (expirationTime: number) => (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(authLogout() as unknown as UnknownAction);
    }, expirationTime);
};

export const authUserLogin =
    (data: HTMLFormElement) => async (dispatch: Dispatch) => {
        dispatch(authStart());

        try {
            const form = new FormData(data);

            const res = await fetch(window.PREFIX + "user/login", {
                method: "POST",
                body: form,
            });

            const resData = await res.json();

            let { access_token, token_type, expires_at, userData } = resData;
            const token = token_type + " " + access_token;
            expires_at = new Date(expires_at).getTime();

            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            else if (res.status === 403 || res.status === 401)
                return dispatch(authMessage(resData.message));
            else if (res.status !== 200 && res.status !== 201)
                throw new Error(resData.error.message);

            const expirationDate = new Date(expires_at);
            localStorage.setItem("token", token);
            localStorage.setItem("lang", userData.language);
            localStorage.setItem(
                "expirationDate",
                expirationDate.toISOString()
            );
            dispatch(authUserLoginSuccess(token, userData));
            dispatch(
                checkAuthTimeout(
                    expires_at - new Date().getTime()
                ) as unknown as UnknownAction
            );
        } catch (error) {
            dispatch(authFail(error as Error));
        }
    };

export const authSignup =
    (data: HTMLFormElement) => async (dispatch: Dispatch) => {
        dispatch(authStart());

        try {
            const form = new FormData(data);

            const res = await fetch(`${window.PREFIX}restaurant/signup`, {
                method: "POST",
                mode: "cors",
                body: form,
            });

            const resData = await res.json();
            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            else if (res.status === 403 || res.status === 401)
                return dispatch(authMessage(resData.message));
            if (res.status !== 200 && res.status !== 201)
                throw new Error(resData.error.message);

            dispatch(authSignupSuccess(resData.email));
        } catch (error) {
            console.log(error);
            dispatch(authFail(error as Error));
        }
    };

export const forgotPassword =
    (data: HTMLFormElement) => async (dispatch: Dispatch) => {
        dispatch(authStart());

        try {
            const form = new FormData(data);

            const res = await fetch(`${window.PREFIX}restaurant/forgot`, {
                method: "POST",
                mode: "cors",
                body: form,
            });

            const resData = await res.json();

            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            else if (res.status === 403 || res.status === 401)
                return dispatch(authMessage(resData.message));
            else if (res.status !== 200 && res.status !== 201)
                throw new Error(resData);

            dispatch(authMessage(resData.message));
        } catch (error) {
            dispatch(authFail(error as Error));
        }
    };

export const resetPassword =
    (id: string, code: string, data: HTMLFormElement) =>
    async (dispatch: Dispatch) => {
        dispatch(authStart());

        try {
            const form = new FormData(data);

            const res = await fetch(
                `${window.PREFIX}restaurant/reset/${id}/${code}`,
                {
                    method: "POST",
                    mode: "cors",
                    body: form,
                }
            );

            const resData = await res.json();

            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            else if (res.status === 403 || res.status === 401)
                return dispatch(authMessage(resData.message));
            else if (res.status !== 200 && res.status !== 201)
                throw new Error(resData);

            dispatch(authMessage(resData.message));
        } catch (error) {
            dispatch(authFail(error as Error));
        }
    };

export const authAdminLogin =
    (data: HTMLFormElement) => async (dispatch: Dispatch) => {
        dispatch(authStart());

        try {
            const form = new FormData(data);

            const res = await fetch(`${window.PREFIX}admin/login`, {
                method: "POST",
                body: form,
            });

            const resData = await res.json();

            let { hash } = resData;

            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            else if (res.status === 403 || res.status === 401)
                return dispatch(authMessage(resData.message));
            else if (res.status !== 200 && res.status !== 201)
                throw new Error(resData.error.message);

            dispatch(authAdminLoginSuccess(hash));
        } catch (error) {
            dispatch(authFail(error as Error));
        }
    };

export const authAdminVerify =
    (data: HTMLFormElement) => async (dispatch: Dispatch) => {
        dispatch(authStart());

        try {
            const form = new FormData(data);

            const res = await fetch(`${window.PREFIX}admin/verify`, {
                method: "POST",
                body: form,
            });

            const resData = await res.json();

            let { access_token, token_type, expires_at, userData } = resData;
            const token = token_type + " " + access_token;
            expires_at = new Date(expires_at).getTime();

            if (res.status === 422)
                throw new Error(Object.values(resData.errors).join("\n"));
            else if (res.status === 403 || res.status === 401)
                return dispatch(authMessage(resData.message));
            else if (res.status !== 200 && res.status !== 201)
                throw new Error(resData.error.message);

            const expirationDate = new Date(expires_at);
            localStorage.setItem("token", token);
            localStorage.setItem("lang", userData.language);
            localStorage.setItem(
                "expirationDate",
                expirationDate.toISOString()
            );
            dispatch(authAdminVerifySuccess(token, userData));
            dispatch(
                checkAuthTimeout(
                    expires_at - new Date().getTime()
                ) as unknown as UnknownAction
            );
        } catch (error) {
            dispatch(authFail(error as Error));
        }
    };

export const resendCode = (hash: string) => async (dispatch: Dispatch) => {
    dispatch(authStart());

    try {
        const formData = new FormData();
        formData.append("hash", hash);

        const res = await fetch(`${window.PREFIX}resend`, {
            method: "POST",
            body: formData,
        });

        const resData = await res.json();

        dispatch(resendCodeSuccess(resData.hash, resData.message));
    } catch (error) {
        dispatch(authFail(error as Error));
    }
};

export const authPhoto = (photo: string) => async (dispatch: Dispatch) => {
    dispatch(authStart());
    const token = localStorage.getItem("token");

    try {
        const formData = new FormData();
        formData.append("photo", photo);

        const res = await fetch(`${window.PREFIX}photo`, {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: {
                Authorization: token as string,
            },
        });

        const resData = await res.json();

        dispatch(authPhotoSuccess(resData.photo));
    } catch (error) {
        dispatch(authFail(error as Error));
    }
};

export const authLogout = () => async (dispatch: Dispatch) => {
    dispatch(authStart());
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(window.PREFIX + "logout", {
            method: "GET",
            headers: {
                Authorization: token as string,
            },
        });

        if (res.status !== 200)
            throw new Error("Erreur lors de la récupération des informations.");

        const resData = await res.json();

        dispatch(authLogoutSuccess());
    } catch (error) {
        dispatch(authFail(error as Error));
    }
};

export const setAuthRedirectPath = (path: string) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
});
export const setHash = (hash: string) => ({ type: actionTypes.SET_HASH, hash });

export const authCheckState = () => async (dispatch: Dispatch) => {
    dispatch(authStart());
    const token = localStorage.getItem("token");
    if (!token) dispatch(authLogoutSuccess());
    else {
        try {
            const res = await fetch(window.PREFIX + "user", {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });

            const resData = await res.json();

            if (res.status === 521) await dispatch(authLogoutSuccess());
            else if (res.status !== 200 && res.status !== 201)
                throw new Error(resData.error.message);

            const { data, role } = resData;

            const expirationDate = new Date(
                localStorage.getItem("expirationDate") || ""
            );
            if (expirationDate > new Date()) {
                if (role === "admin")
                    dispatch(authAdminVerifySuccess(token, data));
                else if (role === "user")
                    dispatch(authUserLoginSuccess(token, data));
                localStorage.setItem("lang", data.language);
                dispatch(
                    checkAuthTimeout(
                        expirationDate.getTime() - new Date().getTime()
                    ) as unknown as UnknownAction
                );
            } else dispatch(authLogoutSuccess());
        } catch (error) {
            console.log(error);
            dispatch(authFail(error as Error));
        }
    }
};
