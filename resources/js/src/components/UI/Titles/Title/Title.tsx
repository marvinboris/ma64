import React from "react";

const title = ({ children, className }: React.ComponentProps<"h2">) => (
    <h2 className={"mb-4 bg-dark-gradient bg-text text-700 " + className}>
        {children}
    </h2>
);

export default title;
