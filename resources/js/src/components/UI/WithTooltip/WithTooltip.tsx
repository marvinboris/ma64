import React, { PropsWithChildren, useState } from "react";
import { Tooltip } from "reactstrap";

export default ({
    content,
    id,
    children,
}: PropsWithChildren & { content?: React.ReactNode; id: string }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return content ? (
        <>
            <span id={id}>{children}</span>
            <Tooltip isOpen={tooltipOpen} target={id} toggle={toggle}>
                {content}
            </Tooltip>
        </>
    ) : (
        children
    );
};
