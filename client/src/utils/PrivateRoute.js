import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { LoadingPage } from "../pages";

export function PrivateRoute({ children, privacy, ...rest }) {
    const { authenticated, userAuthenticating, user } = useSelector(
        (state) => state.usersSlice
    );
    const adminRequired = privacy === "admin";
    let path = adminRequired ? "/" : "/login";

    if (userAuthenticating)
        return (
            <Route
                {...rest}
                render={(routeProps) => <LoadingPage {...routeProps} />}
            />
        );
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authenticated &&
                ((adminRequired && user.isAdmin) || !adminRequired) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: path,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
