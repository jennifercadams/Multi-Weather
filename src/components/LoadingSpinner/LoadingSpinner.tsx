import * as React from "react";
import "./LoadingSpinner.css";

export type LoadingSpinnerProps = {
    isLoading: boolean
};

const LoadingSpinner = ({isLoading}: LoadingSpinnerProps) => {
    return (
        <div className={isLoading ? "loading-spinner show" : "loading-spinner"} />
    );
};

export default LoadingSpinner;
