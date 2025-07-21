import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const access = localStorage.getItem("naruto");
    if (access) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
