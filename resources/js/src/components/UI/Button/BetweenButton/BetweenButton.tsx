import { fa0, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button } from "reactstrap";

const betweenButton = ({
    children,
    color,
    icon,
    iconColor = "reset",
    className,
    size,
    pill,
}: React.PropsWithChildren<{
    color: string;
    icon: string | IconDefinition;
    iconColor?: string;
    className?: string;
    size?: string;
    pill?: boolean;
}>) => (
    <Button
        color={color}
        size={size}
        className={
            "d-inline-flex align-items-center " +
            (pill ? " rounded-pill " : "") +
            className
        }
    >
        <span className="text-300">{children}</span>
        <i className={"ml-3 fas fa-lg fa-" + icon + " text-" + iconColor} />
    </Button>
);

export default betweenButton;
