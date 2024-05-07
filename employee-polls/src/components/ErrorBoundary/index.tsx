import React, { useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    hasError && (
      <Box textAlign="center" mt={4}>
        <h2>Something went wrong.</h2>
        <p>Please try again later.</p>
      </Box>
    )
  );

  return <>{children}</>;
};

export default ErrorBoundary;
