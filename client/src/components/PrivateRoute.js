import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

// Directs user to secured route if authenticated (signed in)
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser === null ? (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            ) : (
              <Component {...props} />
            )
          }
        />
    )}
    </Consumer>
  );
};

export default PrivateRoute;