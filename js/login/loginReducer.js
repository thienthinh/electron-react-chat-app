import {
	FETCH_CURRENT_USER,
	LOGOUT_USER,
	REQUEST_CREATE_USER,
	RECEIVE_CREATED_USER
} from 'constants'

// const initialState = {currentUser: null}

const currentUser = (state = null, action) => {
	switch (action.type) {
		case FETCH_CURRENT_USER:
			if (action.currentUser) {
				return Object.assign({}, state, action.currentUser)
			} else {
				return null
			}
			return Object.assign({}, state, action.currentUser)
		case LOGOUT_USER:
			return null
		case REQUEST_CREATE_USER:
			console.log("Creating User")
			return state
		case RECEIVE_CREATED_USER:
			if (action.currentUser) {
				return Object.assign({}, state, action.currentUser)	
			}
			return state
		default:
			return state
	}
}

export default currentUser
