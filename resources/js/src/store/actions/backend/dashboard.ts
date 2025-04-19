import { Dispatch } from "redux";
import * as actionTypes from "../actionTypes";

export const resetDashboard = () => ({ type: actionTypes.DASHBOARD_RESET });
const dashboardStart = () => ({ type: actionTypes.DASHBOARD_START });
const dashboardSuccess = (data: object) => ({
    type: actionTypes.DASHBOARD_SUCCESS,
    ...data,
});
const dashboardFail = (error: Error) => ({
    type: actionTypes.DASHBOARD_FAIL,
    error,
});
export const getDashboard =
    () => async (dispatch: Dispatch, getState: Function) => {
        dispatch(dashboardStart());
        const { role } = getState().auth;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${window.PREFIX + role}/dashboard`, {
                headers: {
                    Authorization: token || "",
                },
            });
            const resData = await res.json();
            dispatch(dashboardSuccess(resData));
        } catch (error) {
            console.log(error);
            dispatch(dashboardFail(error as Error));
        }
    };
