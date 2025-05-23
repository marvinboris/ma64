import React, { CSSProperties, PropsWithChildren } from "react";
import { Col } from "reactstrap";

const presentationalContainer = ({
    bg = "white",
    children,
    text = "dark",
    innerClassName = "",
    user,
    style,
    innerStyle,
}: PropsWithChildren<{
    bg?: string;
    text?: string;
    className?: string;
    innerClassName?: string;
    user?: boolean;
    style?: CSSProperties;
    innerStyle?: CSSProperties;
}>) => (
    <Col
        xs={12}
        className={
            (!user ? "py-5 " : "py-0 ") + ("bg-" + bg + " ") + ("text-" + text)
        }
        style={style}
    >
        <div
            className={
                (user ? "container-fluid" : "container") + " " + innerClassName
            }
            style={innerStyle}
        >
            {children}
        </div>
    </Col>
);

export default presentationalContainer;
