import React from 'react'
import { connect } from 'react-redux'

const LogoutButton = ({ currentUser, onLogout }) => {
	function logout(e) {
		e.preventDefault()
		onLogout(currentUser)
	}	

	return (
		<div className="logout-button-wrapper">
			<button onClick={logout}>Log Out {currentUser ? currentUser.name : ''}</button>
		</div>
	)
}

export default LogoutButton
