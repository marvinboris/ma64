import React, { Component, PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import Logo from "../../../components/UI/Logo/Logo";

import Img from "../../../assets/images/Group 126@2x.png";
import { Content } from "@/src/types/content";
import { State } from "@/src/store";

class Auth extends Component<PropsWithChildren & State & { dark?: boolean }> {
    state: {
        date: { weekDay: null; day: null; month: null; year: null };
        clock: { hours: string; minutes: string; seconds: string };
        interval: number | null;
    } = {
        date: { weekDay: null, day: null, month: null, year: null },
        clock: { hours: "00", minutes: "00", seconds: "00" },

        interval: null,
    };

    componentDidMount() {
        if (!this.props.content) return null;

        const {
            content: {
                cms: {
                    pages: {
                        general: { days, months },
                    },
                },
            },
        } = this.props;

        const interval = setInterval(() => {
            const date = new Date();
            const twoDigits = (number: number) =>
                number < 10 ? "0" + number : number;

            const weekDay = days[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            const hours = twoDigits(date.getHours());
            const minutes = twoDigits(date.getMinutes());
            const seconds = twoDigits(date.getSeconds());

            this.setState({
                date: { weekDay, day, month, year },
                clock: { hours, minutes, seconds },
            });
        }, 1000);
        this.setState({ interval });
    }

    componentWillUnmount() {
        if (this.state.interval) clearInterval(this.state.interval);
    }

    render() {
        if (!this.props.content) return null;

        const {
            date: { weekDay, day, month, year },
            clock: { hours, minutes, seconds },
        } = this.state;
        const {
            children,
            content: {
                cms: {
                    global: { app_name, company_name },
                    pages: {
                        general: { date, time },
                        auth: {
                            footer: { copyright, all_rights },
                        },
                    },
                },
            },
            dark = false,
        } = this.props;
        let footerContent, headerContent;

        headerContent = (
            <>
                <div className="text-700 text-large text-right">
                    <div className="text-soft">
                        {(date || "").toUpperCase()} : {weekDay} {day} {month}{" "}
                        {year}
                    </div>

                    <div className={`text-${dark ? "white" : "white"}`}>
                        <FontAwesomeIcon
                            icon={faClock}
                            className={`text-${dark ? "white" : "dark"} mr-2`}
                        />
                        <div className="time d-inline-block">
                            {(time || "").toUpperCase()} : {hours} : {minutes} :{" "}
                            {seconds}
                        </div>
                    </div>
                </div>
            </>
        );

        footerContent = (
            <>
                <span className={"text-700 text-" + (dark ? "yellow" : "dark")}>
                    &copy;
                </span>{" "}
                {copyright} {new Date().getFullYear()}{" "}
                <span className={"text-700 text-" + (dark ? "yellow" : "dark")}>
                    {app_name}
                </span>
                . {all_rights}{" "}
                <span className={"text-700 text-" + (dark ? "blue" : "dark")}>
                    {company_name}
                </span>
                .
            </>
        );

        return (
            <div
                className={`vh-100 d-flex flex-column bg-${
                    dark ? "black" : "soft"
                }`}
            >
                <div
                    className={`border-bottom border-${
                        dark ? "yellow" : "dark"
                    }-50 bg-black py-4`}
                >
                    <Container className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link
                                to="/"
                                className="text-decoration-none text-reset"
                            >
                                <Logo />
                            </Link>
                        </div>

                        {headerContent}
                    </Container>
                </div>

                <div className="flex-fill overflow-hidden">
                    <div className="h-100">
                        <Container fluid className="h-100">
                            <Row className="justify-content-center h-100">
                                <Col
                                    xl={10}
                                    className="d-flex flex-column justify-content-center h-100"
                                >
                                    <Row className="justify-content-center">
                                        <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-9">
                                            <Outlet />
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>

                <div
                    className={`border-top ${
                        dark
                            ? "text-light border-yellow-50"
                            : "bg-black-10 text-black border-dark-50"
                    } pt-3 pb-3 d-flex justify-content-center`}
                >
                    <div>
                        <div>{footerContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: object) => ({ ...state });

export default connect(mapStateToProps)(Auth);
