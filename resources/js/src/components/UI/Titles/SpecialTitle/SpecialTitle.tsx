import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React, { PropsWithChildren } from "react";

export default ({
    icon,
    children,
    className,
    user,
}: PropsWithChildren<{
    icon?: string | IconDefinition;
    className?: string;
    user?: boolean;
}>) => (
    <h2 className={(user ? "h4 " : "") + "mb-2 " + className}>
        {<i className={"mr-2 fas fa-fw fa-" + icon} />}
        {children}
    </h2>
);
