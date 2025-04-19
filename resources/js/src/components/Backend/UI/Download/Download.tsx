import React, { PropsWithChildren } from "react";

export default ({
    link,
    name,
    children,
}: PropsWithChildren & { link: string; name: string }) => {
    const onClick = () => {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = link;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(link);
    };

    return (
        <div style={{ cursor: "pointer" }} onClick={onClick}>
            {children}
        </div>
    );
};
