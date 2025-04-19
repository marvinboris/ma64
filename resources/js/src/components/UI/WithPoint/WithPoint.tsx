import React, { ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const withPoint = ({
    children,
    color,
    size,
    className,
}: ComponentProps<"div"> & { size: SizeProp }) => (
    <div className={"position-relative " + className}>
        <FontAwesomeIcon
            icon="circle"
            size={size}
            className={"position-absolute text-" + color}
            style={{ top: 8, left: -2, transform: "translate(-100%, -100%)" }}
        />
        <div>{children}</div>
    </div>
);

export default withPoint;
