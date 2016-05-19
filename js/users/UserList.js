import React, { PropTypes } from 'react'
import Thread from './Thread'
import LogoutButton from 'LogoutButton'

const UserList = ({ users, currentActive, currentUser, onUserClick, onLogout }) => (
	<div className="user-section">
		<ul className="user-list">
			{users.map(user => 
				<Thread key={user.id}
							user={user} 
							currentActive={currentActive} 
							onClick={() => onUserClick(currentUser, user)}
				/>
			)}
		</ul>

		<LogoutButton currentUser={currentUser} onLogout={onLogout} />
	</div>
)

UserList.propTypes = {
	users: PropTypes.array.isRequired,
	currentActive: PropTypes.object.isRequired,
	onUserClick: PropTypes.func.isRequired
}

export default UserList
