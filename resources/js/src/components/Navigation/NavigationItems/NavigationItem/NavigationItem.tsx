import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

export default ({
    icon,
    children,
    href,
    className,
    different,
    exact = true,
}: PropsWithChildren & {
    icon: string;
    href: string;
    className?: string;
    different?: boolean;
    exact?: boolean;
}) => (
    <NavItem>
        {href.includes("//") || href.includes("#") ? (
            <a
                className={className + " nav-link"}
                href={href}
                target={href.includes("//") ? "_blank" : ""}
            >
                {icon && <i className={"mr-1 fas fa-" + icon} />}
                {children}
            </a>
        ) : (
            <NavLink
                className={className + " nav-link"}
                to={href}
                // exact={exact}
                // activeClassName={!different ? "text-white text-large" : ""}
            >
                {icon && <i className={"mr-1 fas fa-" + icon} />}
                {children}
            </NavLink>
        )}
    </NavItem>
);
