import React from "react";

const error = ({ err }: { err?: Error | string | null }) =>
    err ? (
        <div className="alert alert-danger text-10 text-md-12 text-xxl-14">
            {typeof err !== "string" ? err.message : err}
        </div>
    ) : null;

export default error;
