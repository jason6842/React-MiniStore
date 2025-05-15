import { ComponentType, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// P extends object - generic prop
export function withAuth<P extends object>(WrappedComponent: ComponentType<P>, redirectPath="/login") {
    return function WithAuthComponent(props: P) {
        const auth = useAuth();
        const navigate = useNavigate();

        // navigate after on mount
        useEffect(() => {
            if (!auth.token) {
                console.log("navigating to login");
                navigate(redirectPath);
            }
        }, []);

        // can add loading spinner
        if (!auth.token) return null;

        return <WrappedComponent {...props} />
    }
}