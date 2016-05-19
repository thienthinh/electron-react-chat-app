import { connect } from 'react-redux'
import UserList from './UserList'
import { clickThread } from './usersActions'
import { deleteUser } from 'loginActions'

const mapStateToProps = (state) => {
	return {
		users: state.users.users || [],
		currentActive: state.users.currentActive || {},
		currentUser: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onUserClick: (currentUser, otherUser) => {
			dispatch(clickThread(currentUser, otherUser))
		},
		onLogout: (currentUser) => {
			dispatch(deleteUser(currentUser))
		}
	}
}

const UsersSection = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList)

export default UsersSection
