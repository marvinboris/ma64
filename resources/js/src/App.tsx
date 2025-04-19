import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { init } from "aos";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import AuthUser from "./containers/Auth/User/Layout";
import AuthAdmin from "./containers/Auth/Admin/Layout";
import Frontend from "./containers/Frontend/Layout";
import Backend from "./containers/Backend/Layout";

import Spinner from "./components/UI/Spinner";

import { authCheckState } from "./store/actions/auth";
import { getContent } from "./store/actions/content";

import "aos/dist/aos.css";
import { State } from "./store";
import { Dispatch, UnknownAction } from "redux";

// User routes
const asyncUserCmsGlobal = asyncComponent(
    () => import("./containers/Backend/User/Cms/Global")
);
const asyncUserCmsGeneral = asyncComponent(
    () => import("./containers/Backend/User/Cms/General")
);
const asyncUserCmsMessages = asyncComponent(
    () => import("./containers/Backend/User/Cms/Messages")
);
const asyncUserCmsComponents = asyncComponent(
    () => import("./containers/Backend/User/Cms/Components")
);
const asyncUserCmsAuth = asyncComponent(
    () => import("./containers/Backend/User/Cms/Auth")
);
const asyncUserCmsBackend = asyncComponent(
    () => import("./containers/Backend/User/Cms/Backend")
);
const asyncUserCmsFrontend = asyncComponent(
    () => import("./containers/Backend/User/Cms/Frontend")
);

const asyncUserDashboard = asyncComponent(
    () => import("./containers/Backend/User/Dashboard/Dashboard")
);

const asyncUserFeatures = asyncComponent(
    () => import("./containers/Backend/User/Features")
);
const asyncUserFeaturesAdd = asyncComponent(
    () => import("./containers/Backend/User/Features/Add")
);
const asyncUserFeaturesEdit = asyncComponent(
    () => import("./containers/Backend/User/Features/Edit")
);

const asyncUserLanguages = asyncComponent(
    () => import("./containers/Backend/User/Languages")
);
const asyncUserLanguagesAdd = asyncComponent(
    () => import("./containers/Backend/User/Languages/Add")
);
const asyncUserLanguagesEdit = asyncComponent(
    () => import("./containers/Backend/User/Languages/Edit")
);

const asyncUserRoles = asyncComponent(
    () => import("./containers/Backend/User/Roles")
);
const asyncUserRolesAdd = asyncComponent(
    () => import("./containers/Backend/User/Roles/Add")
);
const asyncUserRolesEdit = asyncComponent(
    () => import("./containers/Backend/User/Roles/Edit")
);

const asyncUserSettingsLanguage = asyncComponent(
    () => import("./containers/Backend/User/Settings/Language")
);

const asyncUserUsers = asyncComponent(
    () => import("./containers/Backend/User/Users")
);
const asyncUserUsersAdd = asyncComponent(
    () => import("./containers/Backend/User/Users/Add")
);
const asyncUserUsersEdit = asyncComponent(
    () => import("./containers/Backend/User/Users/Edit")
);

const asyncUserPostCategories = asyncComponent(
    () => import("./containers/Backend/User/PostCategories")
);
const asyncUserPostCategoriesAdd = asyncComponent(
    () => import("./containers/Backend/User/PostCategories/Add")
);
const asyncUserPostCategoriesEdit = asyncComponent(
    () => import("./containers/Backend/User/PostCategories/Edit")
);

const asyncUserPosts = asyncComponent(
    () => import("./containers/Backend/User/Posts")
);
const asyncUserPostsAdd = asyncComponent(
    () => import("./containers/Backend/User/Posts/Add")
);
const asyncUserPostsEdit = asyncComponent(
    () => import("./containers/Backend/User/Posts/Edit")
);

const asyncUserBrands = asyncComponent(
    () => import("./containers/Backend/User/Brands")
);
const asyncUserBrandsAdd = asyncComponent(
    () => import("./containers/Backend/User/Brands/Add")
);
const asyncUserBrandsEdit = asyncComponent(
    () => import("./containers/Backend/User/Brands/Edit")
);

const asyncUserProducts = asyncComponent(
    () => import("./containers/Backend/User/Products")
);
const asyncUserProductsAdd = asyncComponent(
    () => import("./containers/Backend/User/Products/Add")
);
const asyncUserProductsEdit = asyncComponent(
    () => import("./containers/Backend/User/Products/Edit")
);

const asyncUserMethods = asyncComponent(
    () => import("./containers/Backend/User/Methods")
);
const asyncUserMethodsAdd = asyncComponent(
    () => import("./containers/Backend/User/Methods/Add")
);
const asyncUserMethodsEdit = asyncComponent(
    () => import("./containers/Backend/User/Methods/Edit")
);

// Admin routes
const asyncAdminAdmins = asyncComponent(
    () => import("./containers/Backend/Admin/Admins")
);
const asyncAdminAdminsAdd = asyncComponent(
    () => import("./containers/Backend/Admin/Admins/Add")
);
const asyncAdminAdminsEdit = asyncComponent(
    () => import("./containers/Backend/Admin/Admins/Edit")
);

const asyncAdminCmsGlobal = asyncComponent(
    () => import("./containers/Backend/Admin/Cms/Global")
);
const asyncAdminCmsGeneral = asyncComponent(
    () => import("./containers/Backend/Admin/Cms/General")
);
const asyncAdminCmsMessages = asyncComponent(
    () => import("./containers/Backend/Admin/Cms/Messages")
);
const asyncAdminCmsComponents = asyncComponent(
    () => import("./containers/Backend/Admin/Cms/Components")
);
const asyncAdminCmsAuth = asyncComponent(
    () => import("./containers/Backend/Admin/Cms/Auth")
);
const asyncAdminCmsBackend = asyncComponent(
    () => import("./containers/Backend/Admin/Cms/Backend")
);

const asyncAdminDashboard = asyncComponent(
    () => import("./containers/Backend/Admin/Dashboard/Dashboard")
);

const asyncAdminFeatures = asyncComponent(
    () => import("./containers/Backend/Admin/Features")
);
const asyncAdminFeaturesAdd = asyncComponent(
    () => import("./containers/Backend/Admin/Features/Add")
);
const asyncAdminFeaturesEdit = asyncComponent(
    () => import("./containers/Backend/Admin/Features/Edit")
);

const asyncAdminLanguages = asyncComponent(
    () => import("./containers/Backend/Admin/Languages")
);
const asyncAdminLanguagesAdd = asyncComponent(
    () => import("./containers/Backend/Admin/Languages/Add")
);
const asyncAdminLanguagesEdit = asyncComponent(
    () => import("./containers/Backend/Admin/Languages/Edit")
);

const asyncAdminRoles = asyncComponent(
    () => import("./containers/Backend/Admin/Roles")
);
const asyncAdminRolesAdd = asyncComponent(
    () => import("./containers/Backend/Admin/Roles/Add")
);
const asyncAdminRolesEdit = asyncComponent(
    () => import("./containers/Backend/Admin/Roles/Edit")
);

const asyncAdminSettingsLanguage = asyncComponent(
    () => import("./containers/Backend/Admin/Settings/Language")
);

const asyncAdminUsers = asyncComponent(
    () => import("./containers/Backend/Admin/Users")
);
const asyncAdminUsersAdd = asyncComponent(
    () => import("./containers/Backend/Admin/Users/Add")
);
const asyncAdminUsersEdit = asyncComponent(
    () => import("./containers/Backend/Admin/Users/Edit")
);

// Auth routes
const asyncUserLogin = asyncComponent(
    () => import("./containers/Auth/User/Login/Login")
);

const asyncAdminLogin = asyncComponent(
    () => import("./containers/Auth/Admin/Login/Login")
);
const asyncAdminVerify = asyncComponent(
    () => import("./containers/Auth/Admin/Verify/Verify")
);

// Frontend routes
const asyncProductsShow = asyncComponent(
    () => import("./containers/Frontend/Products/Show")
);
const asyncProducts = asyncComponent(
    () => import("./containers/Frontend/Products")
);

const asyncPostsShow = asyncComponent(
    () => import("./containers/Frontend/Posts/Show")
);
const asyncPosts = asyncComponent(() => import("./containers/Frontend/Posts"));

const asyncContact = asyncComponent(
    () => import("./containers/Frontend/Contact")
);
const asyncAboutUs = asyncComponent(
    () => import("./containers/Frontend/AboutUs")
);
const asyncHome = asyncComponent(() => import("./containers/Frontend/Home"));

class App extends Component<
    State & { onTryAuthSignup?: () => void; onGetContent?: () => void }
> {
    componentDidMount() {
        const { onTryAuthSignup, onGetContent } = this.props;
        onTryAuthSignup?.();
        onGetContent?.();
        init();
    }

    render() {
        if (!this.props.content || !this.props.auth) return;
        const {
            content: { cms, currencies, countries },
            auth: { role },
        } = this.props;
        const isAuthenticated = localStorage.getItem("token") !== null;

        let routes = (
            <Routes>
                <Route path="/auth/admin" element={<AuthAdmin />}>
                    <Route
                        path="/auth/admin/verify"
                        Component={asyncAdminVerify}
                    />

                    <Route
                        path="/auth/admin/login"
                        Component={asyncAdminLogin}
                    />
                </Route>

                <Route
                    path="/admin"
                    element={<Navigate to="/auth/admin/login" />}
                />

                <Route path="/auth/user" element={<AuthUser />}>
                    <Route path="/auth/user/login" Component={asyncUserLogin} />
                </Route>

                <Route
                    path="/user"
                    element={<Navigate to="/auth/user/login" />}
                />

                <Route
                    path="/auth"
                    element={<Navigate to="/auth/user/login" />}
                />

                <Route path="/" element={<Frontend />}>
                    <Route
                        path="/post-categories/:postCategorySlug/posts/:slug"
                        Component={asyncPostsShow}
                    />
                    <Route
                        path="/post-categories/:postCategorySlug/posts"
                        Component={asyncPosts}
                    />
                    <Route path="/posts/:slug" Component={asyncPostsShow} />

                    <Route path="/posts" Component={asyncPosts} />

                    <Route
                        path="/products/:slug"
                        Component={asyncProductsShow}
                    />

                    <Route path="/products" Component={asyncProducts} />

                    <Route path="/contact" Component={asyncContact} />

                    <Route path="/about-us" Component={asyncAboutUs} />

                    <Route path="/" Component={asyncHome} />
                </Route>
            </Routes>
        );

        if (isAuthenticated) {
            routes = (
                <Routes>
                    <Route path="/user" element={<Backend />}>
                        <Route
                            path="/user/cms/global"
                            Component={asyncUserCmsGlobal}
                        />
                        <Route
                            path="/user/cms/general"
                            Component={asyncUserCmsGeneral}
                        />
                        <Route
                            path="/user/cms/messages"
                            Component={asyncUserCmsMessages}
                        />
                        <Route
                            path="/user/cms/components"
                            Component={asyncUserCmsComponents}
                        />
                        <Route
                            path="/user/cms/auth"
                            Component={asyncUserCmsAuth}
                        />
                        <Route
                            path="/user/cms/backend"
                            Component={asyncUserCmsBackend}
                        />
                        <Route
                            path="/user/cms/frontend"
                            Component={asyncUserCmsFrontend}
                        />

                        <Route
                            path="/user/dashboard"
                            Component={asyncUserDashboard}
                        />

                        <Route
                            path="/user/features/:id/edit"
                            Component={asyncUserFeaturesEdit}
                        />
                        <Route
                            path="/user/features/add"
                            Component={asyncUserFeaturesAdd}
                        />
                        <Route
                            path="/user/features"
                            Component={asyncUserFeatures}
                        />

                        <Route
                            path="/user/languages/:id/edit"
                            Component={asyncUserLanguagesEdit}
                        />
                        <Route
                            path="/user/languages/add"
                            Component={asyncUserLanguagesAdd}
                        />
                        <Route
                            path="/user/languages"
                            Component={asyncUserLanguages}
                        />

                        <Route
                            path="/user/roles/:id/edit"
                            Component={asyncUserRolesEdit}
                        />
                        <Route
                            path="/user/roles/add"
                            Component={asyncUserRolesAdd}
                        />
                        <Route path="/user/roles" Component={asyncUserRoles} />

                        <Route
                            path="/user/settings/language"
                            Component={asyncUserSettingsLanguage}
                        />

                        <Route
                            path="/user/users/:id/edit"
                            Component={asyncUserUsersEdit}
                        />
                        <Route
                            path="/user/users/add"
                            Component={asyncUserUsersAdd}
                        />
                        <Route path="/user/users" Component={asyncUserUsers} />

                        <Route
                            path="/user/methods/:id/edit"
                            Component={asyncUserMethodsEdit}
                        />
                        <Route
                            path="/user/methods/add"
                            Component={asyncUserMethodsAdd}
                        />
                        <Route
                            path="/user/methods"
                            Component={asyncUserMethods}
                        />

                        <Route
                            path="/user/post-categories/:id/edit"
                            Component={asyncUserPostCategoriesEdit}
                        />
                        <Route
                            path="/user/post-categories/add"
                            Component={asyncUserPostCategoriesAdd}
                        />
                        <Route
                            path="/user/post-categories"
                            Component={asyncUserPostCategories}
                        />

                        <Route
                            path="/user/posts/:id/edit"
                            Component={asyncUserPostsEdit}
                        />
                        <Route
                            path="/user/posts/add"
                            Component={asyncUserPostsAdd}
                        />
                        <Route path="/user/posts" Component={asyncUserPosts} />

                        <Route
                            path="/user/brands/:id/edit"
                            Component={asyncUserBrandsEdit}
                        />
                        <Route
                            path="/user/brands/add"
                            Component={asyncUserBrandsAdd}
                        />
                        <Route
                            path="/user/brands"
                            Component={asyncUserBrands}
                        />

                        <Route
                            path="/user/products/:id/edit"
                            Component={asyncUserProductsEdit}
                        />
                        <Route
                            path="/user/products/add"
                            Component={asyncUserProductsAdd}
                        />
                        <Route
                            path="/user/products"
                            Component={asyncUserProducts}
                        />
                    </Route>

                    <Route path="/admin" element={<Backend />}>
                        <Route
                            path="/admin/admins/:id/edit"
                            Component={asyncAdminAdminsEdit}
                        />
                        <Route
                            path="/admin/admins/add"
                            Component={asyncAdminAdminsAdd}
                        />
                        <Route
                            path="/admin/admins"
                            Component={asyncAdminAdmins}
                        />

                        <Route
                            path="/admin/cms/global"
                            Component={asyncAdminCmsGlobal}
                        />
                        <Route
                            path="/admin/cms/general"
                            Component={asyncAdminCmsGeneral}
                        />
                        <Route
                            path="/admin/cms/messages"
                            Component={asyncAdminCmsMessages}
                        />
                        <Route
                            path="/admin/cms/components"
                            Component={asyncAdminCmsComponents}
                        />
                        <Route
                            path="/admin/cms/auth"
                            Component={asyncAdminCmsAuth}
                        />
                        <Route
                            path="/admin/cms/backend"
                            Component={asyncAdminCmsBackend}
                        />

                        <Route
                            path="/admin/dashboard"
                            Component={asyncAdminDashboard}
                        />

                        <Route
                            path="/admin/features/:id/edit"
                            Component={asyncAdminFeaturesEdit}
                        />
                        <Route
                            path="/admin/features/add"
                            Component={asyncAdminFeaturesAdd}
                        />
                        <Route
                            path="/admin/features"
                            Component={asyncAdminFeatures}
                        />

                        <Route
                            path="/admin/languages/:id/edit"
                            Component={asyncAdminLanguagesEdit}
                        />
                        <Route
                            path="/admin/languages/add"
                            Component={asyncAdminLanguagesAdd}
                        />
                        <Route
                            path="/admin/languages"
                            Component={asyncAdminLanguages}
                        />

                        <Route
                            path="/admin/roles/:id/edit"
                            Component={asyncAdminRolesEdit}
                        />
                        <Route
                            path="/admin/roles/add"
                            Component={asyncAdminRolesAdd}
                        />
                        <Route
                            path="/admin/roles"
                            Component={asyncAdminRoles}
                        />

                        <Route
                            path="/admin/settings/language"
                            Component={asyncAdminSettingsLanguage}
                        />

                        <Route
                            path="/admin/users/:id/edit"
                            Component={asyncAdminUsersEdit}
                        />
                        <Route
                            path="/admin/users/add"
                            Component={asyncAdminUsersAdd}
                        />
                        <Route
                            path="/admin/users"
                            Component={asyncAdminUsers}
                        />
                    </Route>

                    <Route
                        path="/dashboard"
                        element={<Navigate to={`/${role}/dashboard`} />}
                    />

                    <Route
                        path="/auth"
                        element={<Navigate to={`/${role}/dashboard`} />}
                    />

                    <Route path="/" element={<Frontend />}>
                        <Route
                            path="/post-categories/:postCategorySlug/posts/:slug"
                            Component={asyncPostsShow}
                        />
                        <Route
                            path="/post-categories/:postCategorySlug/posts"
                            Component={asyncPosts}
                        />
                        <Route path="/posts/:slug" Component={asyncPostsShow} />
                        <Route path="/posts" Component={asyncPosts} />

                        <Route
                            path="/products/:slug"
                            Component={asyncProductsShow}
                        />
                        <Route path="/products" Component={asyncProducts} />

                        <Route path="/contact" Component={asyncContact} />
                        <Route path="/about-us" Component={asyncAboutUs} />
                        <Route path="/" Component={asyncHome} />
                    </Route>
                </Routes>
            );
        }

        const dataReady =
            cms !== undefined &&
            currencies !== undefined &&
            countries !== undefined &&
            ((isAuthenticated && role !== undefined) || !isAuthenticated);

        return dataReady ? routes : <Spinner />;
    }
}

const mapStateToProps = (state: State) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onTryAuthSignup: () => dispatch(authCheckState() as unknown as UnknownAction),
    onGetContent: () => dispatch(getContent() as unknown as UnknownAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
