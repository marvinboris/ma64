import React from "react";

import "../../../assets/css/star-rating-svg.css";

const stars = ({
    mark,
    readOnly,
}: {
    mark?: number | string;
    readOnly?: boolean;
}) => (
    <div
        className={readOnly ? "read-only-stars" : "ranking-stars"}
        data-rating={mark}
    />
);

export default stars;
