import React, { FC } from "react";
import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  isLoggedIn: boolean;
  children?: React.ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  isLoggedIn,
  children,
}: PrivateRouteProps) => {

  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  return isLoggedIn ? children : <Navigate to={`${redirectUrl}`} replace />;
};

export default PrivateRoute;
