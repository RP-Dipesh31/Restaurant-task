<<<<<<< HEAD
// import { Loader2 } from "lucide-react";
// import { Button } from "./ui/button";

// const LoadingButton = () => {
//     return(
//         <Button disabled>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//             Loading
//         </Button>
//     )
// }

// export default LoadingButton;

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
=======
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
    return(
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Loading
        </Button>
    )
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
}

export default LoadingButton;