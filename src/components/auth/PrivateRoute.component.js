
import React from "react";
import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route
        {...rest}
        render={props =>

        {
            return isAuth === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            );
        }

        }
    />
);

const mapStateToProps = state => {
    return {
        isAuth: state.users.isAuthenticated
    }
};
export default connect(mapStateToProps)(PrivateRoute);
