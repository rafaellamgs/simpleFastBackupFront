import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignIn from "./pages/SignIn/index";
import Dashboard from "./pages/Dashboard/index";
import GlobalStyle from "./styles/global";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                />
            )
        }
    />
);

const Routes = () => (
    <React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <PrivateRoute path="/app" component={Dashboard} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </BrowserRouter>
        <GlobalStyle />
    </React.Fragment>
);

export default Routes;
