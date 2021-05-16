import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

/* 
    This Component is use to replace
    Route from react-router-dom
    ---
    It authenticates and redirects based on
    the component passed as props to it.
*/
export default function PrivateRoute({
  isLogin,
  component: Component,
  redirectTo: redirectTo,
  ...rest //all other props
}) {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          !!currentUser ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect to={redirectTo} />
          )
        }
      />
    </>
  );
}
