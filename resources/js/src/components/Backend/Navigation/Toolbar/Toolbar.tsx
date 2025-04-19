import React from "react";
import { Link } from "react-router-dom";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../../UI/Logo/Logo";
import { Content } from "@/src/types/content";
import { Notification } from "@/src/types/notification";

export default ({
    data,
    role = "user",
    logoutHandler,
    logoWidth = 280,
    notifications,
    date,
    clock,
    toggle,
    cms,
    dark = false,
}: {
    dark?: boolean;
    cms: Content["cms"];
    toggle: () => void;
    clock: {
        hours: string;
        minutes: string;
        seconds: string;
    };
    date: {
        weekDay: string;
        day: string;
        month: string;
        year: string;
    };
    notifications: Notification[];
    logoWidth: number;
    logoutHandler: () => void;
    role: "user" | "admin";
    data: object;
}) => (
    <>
        <nav
            className={`navbar navbar-expand-lg sticky-top bg-${
                dark ? "grayblue" : "soft"
            } p-0`}
        >
            <Link
                to={`/${role}/dashboard`}
                className="navbar-brand text-center d-none d-sm-flex justify-content-center align-items-center p-0 px-4 m-0 align-middle"
                style={{ flex: `0 0 ${logoWidth}px`, height: 70 }}
            >
                <Logo sm />
            </Link>
            <NavigationItems
                logoutHandler={logoutHandler}
                notifications={notifications}
                clock={clock}
                date={date}
                sidedrawerToggle={toggle}
                cms={cms}
            />
        </nav>
    </>
);
