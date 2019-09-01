import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import AuthActions from 'Redux/AuthRedux'
import { bindActionCreators } from 'redux'

class LogoutPage extends Component {
  componentWillMount() {
    this.props.logout()
    this.props.history.replace('/login')
  }

  render() {
    return null
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: AuthActions.logout
    },
    dispatch
  )

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LogoutPage)
)
