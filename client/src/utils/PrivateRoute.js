import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = true;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
