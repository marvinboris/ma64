import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { Action } from "redux";
import { Brand } from "@/src/types/brand";
import { Message } from "@/src/types/message";
import { Post } from "@/src/types/post";
import { Product } from "@/src/types/product";

const resources = ["home", "posts", "products"] as const;

export type FrontendState = Partial<
    Record<
        (typeof resources)[number],
        {
            loading: boolean;
            message?: Message;
            error: Error | null;
            post?: Post;
            posts?: Post[];
            product?: Product;
            products?: Product[];
            brand?: Brand;
            brands?: Brand[];
        }
    >
>;

const initialState: FrontendState = {};

resources.forEach((resource) => {
    initialState[resource] = {
        loading: false,
        error: null,
    };
});

const reset = (root: (typeof resources)[number], state: FrontendState) =>
    updateObject(state, { [root]: initialState[root] });
const start = (root: (typeof resources)[number], state: FrontendState) =>
    updateObject(state, {
        [root]: updateObject(state[root] as object, {
            loading: true,
            message: null,
        }),
    });
const success = (
    root: (typeof resources)[number],
    state: FrontendState,
    action: Action
) =>
    updateObject(state, {
        [root]: updateObject(state[root] as object, {
            loading: false,
            error: null,
            ...action,
        }),
    });
const fail = (
    root: (typeof resources)[number],
    state: FrontendState,
    action: Action
) =>
    updateObject(state, {
        [root]: updateObject(state[root] as object, {
            loading: false,
            ...action,
        }),
    });

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.HOME_RESET:
            return reset("home", state);
        case actionTypes.HOME_START:
            return start("home", state);
        case actionTypes.HOME_SUCCESS:
            return success("home", state, action);
        case actionTypes.HOME_FAIL:
            return fail("home", state, action);

        case actionTypes.POSTS_RESET:
            return reset("posts", state);
        case actionTypes.POSTS_START:
            return start("posts", state);
        case actionTypes.POSTS_SUCCESS:
            return success("posts", state, action);
        case actionTypes.POSTS_FAIL:
            return fail("posts", state, action);

        case actionTypes.PRODUCTS_RESET:
            return reset("products", state);
        case actionTypes.PRODUCTS_START:
            return start("products", state);
        case actionTypes.PRODUCTS_SUCCESS:
            return success("products", state, action);
        case actionTypes.PRODUCTS_FAIL:
            return fail("products", state, action);

        default:
            return state;
    }
};
