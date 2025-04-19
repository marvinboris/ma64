import React, { ComponentProps } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const dropdownItem = ({
    icon,
    children,
    href,
    className,
    onClick,
}: ComponentProps<"a"> & {
    icon: IconDefinition;
    href: string;
}) => {
    return (
        <NavLink
            onClick={onClick}
            to={href}
            // exact
            className={"dropdown-item " + className}
        >
            <FontAwesomeIcon
                className="mr-1"
                style={{ width: "25px" }}
                icon={icon}
            />
            {children}
        </NavLink>
    );
};

export default dropdownItem;
