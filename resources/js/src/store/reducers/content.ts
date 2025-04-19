import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { Action } from "redux";
import { Language } from "@/src/types/language";

export type ContentState = {
    error: Error | null;
    loading: boolean;
    languages?: Language[];
};

const initialState: ContentState = {
    error: null,
    loading: false,
};

const start = (state: ContentState, action: Action) =>
    updateObject(state, { loading: true, message: null });
const success = (state: ContentState, action: Action) =>
    updateObject(state, { loading: false, error: null, ...action });
const fail = (state: ContentState, action: Action) =>
    updateObject(state, { loading: false, ...action });

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.CONTENT_START:
            return start(state, action);
        case actionTypes.CONTENT_SUCCESS:
            return success(state, action);
        case actionTypes.CONTENT_FAIL:
            return fail(state, action);

        default:
            return state;
    }
};
