import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { Action } from "redux";
import { Message } from "@/src/types/message";
import { Admin } from "@/src/types/admin";
import { Cms, Content } from "@/src/types/content";
import { Language } from "@/src/types/language";
import { Feature } from "@/src/types/feature";
import { Role } from "@/src/types/role";
import { User } from "@/types";
import { Brand } from "@/src/types/brand";
import { Method } from "@/src/types/method";
import { PostCategory } from "@/src/types/post-category";
import { Post } from "@/src/types/post";
import { Product } from "@/src/types/product";

const resources = [
    "admins",
    "cms",
    "notifications",
    "dashboard",
    "features",
    "languages",
    "roles",
    "users",
    "methods",
    "settings",
    "post_categories",
    "posts",
    "brands",
    "products",
] as const;

export type BackendStateUnit = {
    loading: boolean;
    error: Error | null;
    message: Message | null;
    total?: number;
    admin?: Admin;
    admins?: Admin[];
    cms?: Cms;
    language?: Language;
    languages?: Language[];
    feature?: Feature;
    features?: Feature[];
    role?: Role[];
    roles?: Role[];
    user?: User;
    users?: User[];
    brand?: Brand;
    brands?: Brand[];
    method?: Method;
    methods?: Method[];
    post_category?: PostCategory;
    post_categories?: PostCategory[];
    post?: Post;
    posts?: Post[];
    product?: Product;
    products?: Product[];
    blocksData?: {
        totalRestaurants: number;
        totalPlans: number;
        totalPlansAmount: number;
        totalRecharges: number;
        totalCycles: number;
        totalYears: number;
        totalSubjects: number;
        totalStudents: number;
    };
    totalRestaurants?: { id: string; _id: string }[];
    totalPlans?: { id: string; _id: string }[];
    totalRecharges?: { id: string; _id: string }[];
    financeTrackerData?: [];
    totalCycles?: { id: string; _id: string }[];
    totalYears?: { id: string; _id: string }[];
    totalSubjects?: { id: string; _id: string }[];
    totalStudents?: { id: string; _id: string }[];
};

export type BackendState = Partial<
    Record<(typeof resources)[number], BackendStateUnit>
>;

const initialState: BackendState = {};

resources.forEach((resource) => {
    initialState[resource] = {
        loading: false,
        error: null,
        message: null,
    };
});

const reset = (root: (typeof resources)[number], state: BackendState) =>
    updateObject(state, { [root]: initialState[root] });
const start = (root: (typeof resources)[number], state: BackendState) =>
    updateObject(state, {
        [root]: updateObject(state[root] as object, {
            loading: true,
            message: null,
        }),
    });
const success = (
    root: (typeof resources)[number],
    state: BackendState,
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
    state: BackendState,
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
        case actionTypes.ADMINS_RESET:
            return reset("admins", state);
        case actionTypes.ADMINS_START:
            return start("admins", state);
        case actionTypes.ADMINS_SUCCESS:
            return success("admins", state, action);
        case actionTypes.ADMINS_FAIL:
            return fail("admins", state, action);

        case actionTypes.CMS_RESET:
            return reset("cms", state);
        case actionTypes.CMS_START:
            return start("cms", state);
        case actionTypes.CMS_SUCCESS:
            return success("cms", state, action);
        case actionTypes.CMS_FAIL:
            return fail("cms", state, action);

        case actionTypes.NOTIFICATIONS_RESET:
            return reset("notifications", state);
        case actionTypes.NOTIFICATIONS_START:
            return start("notifications", state);
        case actionTypes.NOTIFICATIONS_SUCCESS:
            return success("notifications", state, action);
        case actionTypes.NOTIFICATIONS_FAIL:
            return fail("notifications", state, action);

        case actionTypes.DASHBOARD_RESET:
            return reset("dashboard", state);
        case actionTypes.DASHBOARD_START:
            return start("dashboard", state);
        case actionTypes.DASHBOARD_SUCCESS:
            return success("dashboard", state, action);
        case actionTypes.DASHBOARD_FAIL:
            return fail("dashboard", state, action);

        case actionTypes.FEATURES_RESET:
            return reset("features", state);
        case actionTypes.FEATURES_START:
            return start("features", state);
        case actionTypes.FEATURES_SUCCESS:
            return success("features", state, action);
        case actionTypes.FEATURES_FAIL:
            return fail("features", state, action);

        case actionTypes.LANGUAGES_RESET:
            return reset("languages", state);
        case actionTypes.LANGUAGES_START:
            return start("languages", state);
        case actionTypes.LANGUAGES_SUCCESS:
            return success("languages", state, action);
        case actionTypes.LANGUAGES_FAIL:
            return fail("languages", state, action);

        case actionTypes.ROLES_RESET:
            return reset("roles", state);
        case actionTypes.ROLES_START:
            return start("roles", state);
        case actionTypes.ROLES_SUCCESS:
            return success("roles", state, action);
        case actionTypes.ROLES_FAIL:
            return fail("roles", state, action);

        case actionTypes.USERS_RESET:
            return reset("users", state);
        case actionTypes.USERS_START:
            return start("users", state);
        case actionTypes.USERS_SUCCESS:
            return success("users", state, action);
        case actionTypes.USERS_FAIL:
            return fail("users", state, action);

        case actionTypes.METHODS_RESET:
            return reset("methods", state);
        case actionTypes.METHODS_START:
            return start("methods", state);
        case actionTypes.METHODS_SUCCESS:
            return success("methods", state, action);
        case actionTypes.METHODS_FAIL:
            return fail("methods", state, action);

        case actionTypes.SETTINGS_RESET:
            return reset("settings", state);
        case actionTypes.SETTINGS_START:
            return start("settings", state);
        case actionTypes.SETTINGS_SUCCESS:
            return success("settings", state, action);
        case actionTypes.SETTINGS_FAIL:
            return fail("settings", state, action);

        case actionTypes.POST_CATEGORIES_RESET:
            return reset("post_categories", state);
        case actionTypes.POST_CATEGORIES_START:
            return start("post_categories", state);
        case actionTypes.POST_CATEGORIES_SUCCESS:
            return success("post_categories", state, action);
        case actionTypes.POST_CATEGORIES_FAIL:
            return fail("post_categories", state, action);

        case actionTypes.POSTS_RESET:
            return reset("posts", state);
        case actionTypes.POSTS_START:
            return start("posts", state);
        case actionTypes.POSTS_SUCCESS:
            return success("posts", state, action);
        case actionTypes.POSTS_FAIL:
            return fail("posts", state, action);

        case actionTypes.BRANDS_RESET:
            return reset("brands", state);
        case actionTypes.BRANDS_START:
            return start("brands", state);
        case actionTypes.BRANDS_SUCCESS:
            return success("brands", state, action);
        case actionTypes.BRANDS_FAIL:
            return fail("brands", state, action);

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
