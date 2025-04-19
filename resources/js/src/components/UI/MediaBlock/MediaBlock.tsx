import React, { PropsWithChildren } from "react";
import { Col, Media } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const mediaBlock = ({
    icon,
    heading,
    children,
    lg,
}: PropsWithChildren & {
    icon: IconDefinition;
    heading?: string;
    lg?: number;
}) => (
    <Col lg={lg}>
        <Media>
            <Media left className="mr-3">
                <div className="bg-info-danger text-white p-2 rounded">
                    <FontAwesomeIcon icon={icon} size="3x" />
                </div>
            </Media>
            <Media body>
                <Media heading>{heading}</Media>
                {children}
            </Media>
        </Media>
    </Col>
);

export default mediaBlock;
