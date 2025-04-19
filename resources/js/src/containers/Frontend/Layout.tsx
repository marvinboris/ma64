import React, { Component, PropsWithChildren } from "react";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Footer from "../../components/Footer/Footer";
import { Content } from "@/src/types/content";
import { State } from "@/src/store";

class Layout extends Component<PropsWithChildren & State & { dark?: boolean }> {
    render() {
        if (!this.props.auth) return null;

        const {
            children,
            auth: { token, profile },
        } = this.props;
        const { sideDrawerToggleHandler, logoutHandler } = this as unknown as {
            sideDrawerToggleHandler: Function;
            logoutHandler: Function;
        };
        const { name, role, notifications, photo } = profile
            ? profile
            : { name: null, role: null, photo: null, notifications: null };

        return (
            <div className="Frontend">
                <Toolbar
                    isAuth={token !== null}
                    name={name}
                    notifications={notifications}
                    role={role}
                    logoutHandler={logoutHandler}
                    drawerToggleClicked={sideDrawerToggleHandler}
                />

                <main className="Content w-100 min-vh-100">{children}</main>

                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: object) => ({ ...state });

export default connect(mapStateToProps)(Layout);
