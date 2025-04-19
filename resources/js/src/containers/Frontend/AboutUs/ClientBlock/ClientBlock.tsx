import React from "react";
import { Col } from "reactstrap";

export default ({ src, height }: { src: string; height?: number }) => (
    <Col className="text-center">
        <img src={src} style={{ height }} />
    </Col>
);
