import React from "react";
import { Spinner } from "react-bootstrap";

export function SpinnerComponent({ ...args }) {
    return (
        <>
            <Spinner animation={ args.animation }/> 
        </>
    );
};