
import React from "react";

type LoadingButtonProps = React.ComponentProps<"button"> & {
    type: "submit" | "button" | "reset";
    disabled: boolean;
};

function LoadingButton({ type, disabled, children, ...props }: LoadingButtonProps) {
    return (
        <button type={type} disabled={disabled} {...props}>
            {children}
        </button>
    );
}

export default LoadingButton;