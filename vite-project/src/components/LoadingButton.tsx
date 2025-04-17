
import React from "react";
import { Button } from "./ui/button"; // Or wherever your Button component comes from

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const LoadingButton: React.FC<Props> = ({ loading = false, children, ...rest }) => {
  return (
    <Button disabled={loading} {...rest}>
      {loading ? "Loading..." : children}
    </Button>
  );
};

export default LoadingButton;
