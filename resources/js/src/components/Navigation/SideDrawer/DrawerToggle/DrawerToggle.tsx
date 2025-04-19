import React from "react";

import "./DrawerToggle.css";

const drawerToggle = ({ clicked }: { clicked?: () => void }) => (
    <div className="DrawerToggle" onClick={clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
