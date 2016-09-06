import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUser } from 'loginActions'
import { push } from 'react-router-redux';
import App from 'app'
import Login from 'LoginSection'
import Spinner from 'Spinner'
import { createUser, gotoApp } from 'loginActions'

class AppContainer extends Component {
	static propTypes = {
		// children: PropTypes.element.isRequired
	}

	componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCurrentUser())
  }

	render() {
		let { fetching, currentUser } = this.props
		let rendered = fetching.isFetching ? <Spinner /> : (currentUser ? <App /> : <Login />)

		return (
			<div>
				{rendered}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { fetching, currentUser } = state
  return {
    fetching,
    currentUser
  }
}

AppContainer = connect(mapStateToProps)(AppContainer)

export default AppContainer
