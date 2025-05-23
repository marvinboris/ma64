import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb as B, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";
import { State } from "@/src/store";
import { faIcons } from "@fortawesome/free-solid-svg-icons";

class Breadcrumb extends Component<
    State & {
        items?: { to: string; content: string }[];
        main: string;
        icon: typeof faIcons | string;
        dark?: boolean;
    }
> {
    render() {
        if (!this.props.content) return null;

        const {
            items,
            main,
            icon,
            content: {
                cms: {
                    pages: {
                        general: { home },
                    },
                },
            },
            dark = false,
        } = this.props;

        let itemsComponent = null;

        if (items)
            itemsComponent = items.map((item, i) => (
                <BreadcrumbItem key={i}>
                    <NavLink
                        className={`text-${dark ? "light" : "secondary"}`}
                        to={item.to}
                    >
                        {item.content}
                    </NavLink>
                </BreadcrumbItem>
            ));

        return (
            <B
                className="d-none d-sm-flex align-items-center"
                color={dark ? "light" : "secondary"}
                listClassName="bg-transparent rounded-0 justify-content-end text-large"
                style={{
                    top: "50%",
                    right: 0,
                    transform: "translateY(-10px)",
                    position: "absolute",
                    zIndex: 1000,
                }}
            >
                <BreadcrumbItem>
                    <NavLink
                        className={`text-${dark ? "light" : "secondary"}`}
                        to="/"
                    >
                        <i className={"fas fa-" + icon + " mr-1"} />{" "}
                        <strong>{home}</strong>
                    </NavLink>
                </BreadcrumbItem>
                {itemsComponent}
                <BreadcrumbItem
                    className={`text-${
                        dark ? "light" : "secondary"
                    } text-decoration-none`}
                    active
                >
                    {main}
                </BreadcrumbItem>
            </B>
        );
    }
}

const mapStateToProps = (state: State) => ({ ...state });

export default connect(mapStateToProps)(Breadcrumb);
