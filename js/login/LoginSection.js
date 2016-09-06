import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ENTER_KEY_CODE } from 'constants'
import { createUser, gotoApp } from './loginActions'
import { fetchUsers, fetchThreads } from 'usersActions'
import { fetchCurrentUser } from 'loginActions'

class LoginSection extends Component {

	componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchCurrentUser())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { currentUser, dispatch } = nextProps
      if (currentUser) {
  			dispatch(gotoApp())
  		}
    }
  }

	render() {
		let { dispatch } = this.props

		let input

		function onKeyDownInput(event) {

			if (event.keyCode === ENTER_KEY_CODE) {
				event.preventDefault()
				if (input && input.value.trim()) {
					console.log("create user: ", input.value)
					dispatch(createUser(input.value))
					input.value = ''
				}
			}
		}

		return (
			<div className="input-section">
				<label>
					Enter your name:
				</label>
				<input 
					placeholder="Display Name" 
					ref={node => {
						input = node
					}} 
					onKeyDown={onKeyDownInput}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { currentUser } = state
  return {
    currentUser
  }
}

LoginSection = connect(mapStateToProps)(LoginSection)

export default LoginSection
