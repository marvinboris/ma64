import React, { PropsWithChildren } from "react";

import "./TitleWrapper.css";

export default ({
    children,
    dark = false,
}: PropsWithChildren<{ dark?: boolean }>) => (
    <div className="UI TitleWrapper py-2 py-md-3 py-xxl-4 px-3 px-md-4 px-xxl-5 bg-border-15 position-relative">
        {children}
    </div>
);
