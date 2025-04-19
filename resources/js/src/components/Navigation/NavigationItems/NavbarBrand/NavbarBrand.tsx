import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

const navbarBrand = ({
    href,
    children,
}: PropsWithChildren & { href: string }) => (
    <NavLink className="navbar-brand" to={href}>
        {children}
    </NavLink>
);

export default navbarBrand;
