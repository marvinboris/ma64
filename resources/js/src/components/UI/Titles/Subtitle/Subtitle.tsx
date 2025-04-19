import React, { PropsWithChildren } from "react";

export default ({
    children,
    className,
    dark = false,
}: PropsWithChildren<{
    className?: string;
    dark?: boolean;
    user?: boolean;
}>) => (
    <div>
        <div
            className={`text-${
                dark ? "light" : "secondary"
            } text-14 text-md-16 text-xxl-18 text-300 ${className}`}
        >
            {children}
        </div>
    </div>
);
