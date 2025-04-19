import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { Action } from "redux";
import { Message } from "@/src/types/message";
import { User } from "@/types";

export type AuthState = {
    token: string | null;
    error: Error | null;
    data: User | null;
    hash: string | null;
    role?: string;
    signup: { status: boolean; email: string | null };
    loading: boolean;
    message?: Message | null;
    authRedirectPath: string;
    profile?: {
        name: string | null;
        role: string | null;
        photo: string | null;
        notifications: string | null;
    };
};

const initialState = {
    token: null,
    error: null,
    data: null,
    hash: null,
    signup: { status: false, email: null },
    loading: false,
    message: null,
    authRedirectPath: "/",
};

const authStart = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: true, message: null });
const authDataUpdateSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const authUserLoginSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const authRestaurantLoginSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const authAutoRenewSuccess = (
    state: AuthState,
    action: { auto_renew: boolean }
) =>
    updateObject(state, {
        error: null,
        loading: false,
        data: updateObject(state.data as object, {
            auto_renew: action.auto_renew,
        }),
    });
const authPhotoSuccess = (state: AuthState, action: { photo: string }) =>
    updateObject(state, {
        error: null,
        loading: false,
        data: updateObject(state.data as object, { photo: action.photo }),
    });
const authSignupSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const authAdminLoginSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const authAdminVerifySuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const resendCodeSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, ...action });
const authLogoutSuccess = (state: AuthState, action: object) =>
    updateObject(state, { error: null, loading: false, token: null });
const authFail = (state: AuthState, action: object) =>
    updateObject(state, { loading: false, ...action });
const authMessage = (state: AuthState, action: object) =>
    updateObject(state, { loading: false, ...action });
const setAuthRedirectPath = (state: AuthState, action: { path: string }) =>
    updateObject(state, { authRedirectPath: action.path });
const setHash = (state: AuthState, action: { hash: string }) =>
    updateObject(state, { hash: action.hash });

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_DATA_UPDATE_SUCCESS:
            return authDataUpdateSuccess(state, action);
        case actionTypes.AUTH_USER_LOGIN_SUCCESS:
            return authUserLoginSuccess(state, action);
        case actionTypes.AUTH_RESTAURANT_LOGIN_SUCCESS:
            return authRestaurantLoginSuccess(state, action);
        case actionTypes.AUTH_AUTO_RENEW_SUCCESS:
            return authAutoRenewSuccess(
                state,
                action as Action & { auto_renew: boolean }
            );
        case actionTypes.AUTH_PHOTO_SUCCESS:
            return authPhotoSuccess(
                state,
                action as Action & { photo: string }
            );
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            return authSignupSuccess(state, action);
        case actionTypes.AUTH_ADMIN_LOGIN_SUCCESS:
            return authAdminLoginSuccess(state, action);
        case actionTypes.AUTH_ADMIN_VERIFY_SUCCESS:
            return authAdminVerifySuccess(state, action);
        case actionTypes.RESEND_CODE_SUCCESS:
            return resendCodeSuccess(state, action);
        case actionTypes.AUTH_LOGOUT_SUCCESS:
            return authLogoutSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_MESSAGE:
            return authMessage(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(
                state,
                action as Action & { path: string }
            );
        case actionTypes.SET_HASH:
            return setHash(state, action as Action & { hash: string });

        default:
            return state;
    }
};
