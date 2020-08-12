import { connect } from 'react-redux'

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  if (checkRole && !roles.includes(checkRole)) {
    return false
  }
  if (checkPermission && !permissions.includes(checkPermission)) {
    return false
  }
  return true
}

const Can = ({ children, auth, checkRole, checkPermission }) => {
  if (typeof children === 'function') { 
    return children(checkAuth(auth, checkRole, checkPermission))
  }
  if (checkAuth(auth, checkRole, checkPermission)) return children
  return null
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Can)