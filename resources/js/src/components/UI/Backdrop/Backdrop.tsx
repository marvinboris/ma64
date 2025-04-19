import React from "react";

import "./Backdrop.css";

const backdrop = ({
    show,
    clicked,
}: {
    show?: boolean;
    clicked?: () => void;
}) => (show ? <div className="Backdrop" onClick={clicked}></div> : null);

export default backdrop;
