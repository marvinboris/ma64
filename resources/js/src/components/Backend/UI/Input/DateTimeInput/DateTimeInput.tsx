import React from "react";
import { Input } from "reactstrap";

export default (props: React.ComponentProps<"input">) => {
    return (
        <div className="h-100 position-relative" style={{ minHeight: 57 }}>
            <Input
                type="datetime"
                className="h-100"
                defaultValue={props.value}
            />
        </div>
    );
};
