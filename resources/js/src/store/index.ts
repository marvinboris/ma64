import {
    legacy_createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";

import authReducer, { AuthState } from "./reducers/auth";
import contentReducer, { ContentState } from "./reducers/content";
import backendReducer, { BackendState } from "./reducers/backend";
import frontendReducer, { FrontendState } from "./reducers/frontend";
import { Content } from "../types/content";

export type State = {
    auth?: AuthState;
    content?: Content & ContentState;
    backend?: BackendState;
    frontend?: FrontendState;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    content: contentReducer,
    backend: backendReducer,
    frontend: frontendReducer,
});

export default legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
