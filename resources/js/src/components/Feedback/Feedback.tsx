import { Message } from "@/src/types/message";
import React, { useState } from "react";
import { Alert } from "reactstrap";

export default ({
    message,
    time,
}: {
    message?: Message | null;
    time?: number;
}) => {
    const [visible, setVisible] = useState(true);

    if (time)
        setTimeout(() => {
            setVisible(false);
        }, time);

    return message ? (
        <Alert
            className="text-10 text-md-12 text-xxl-14"
            color={message.type}
            isOpen={visible}
        >
            {message.content}
        </Alert>
    ) : null;
};
