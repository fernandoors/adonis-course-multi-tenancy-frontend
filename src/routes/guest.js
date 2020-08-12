import React from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'


function Guest({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth)
  return <Route
    {...rest}
    render={
      props => !auth.signedIn
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
  />
}
Guest.propTypes = {
  component: PropTypes.func.isRequired
}
export default Guest;