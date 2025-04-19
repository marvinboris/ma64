import React, { Component } from "react";
import { connect } from "react-redux";

import "./Logo.css";
import { State } from "@/src/store";
import { Content } from "@/src/types/content";

class Logo extends Component<{
    content?: Content;
    big?: boolean;
    dark?: boolean;
    sm?: boolean;
}> {
    render() {
        if (!this.props.content) return null;

        const {
            content: {
                cms: {
                    global: { logo },
                },
            },
            big,
            dark,
        } = this.props;

        return (
            <div className="Logo mb-0 text-white">
                <img
                    src={!dark ? logo.light : logo.dark}
                    style={big ? { height: 120 } : { height: 80 }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

export default connect(mapStateToProps)(Logo);
