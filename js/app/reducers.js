import { combineReducers } from 'redux'
import users from 'usersReducer'
import currentUser from 'loginReducer'
import messageReducer from 'messageReducer'
import messagesReducer from 'messagesReducer'
import { routerReducer } from 'react-router-redux'

import {
	REQUEST_CURRENT_USER,
	FETCH_CURRENT_USER,
} from 'constants'

const fetching = (state = { isFetching: true}, action) => {
	switch (action.type) {
		case REQUEST_CURRENT_USER:
			return Object.assign({}, state, { isFetching: true})
		case FETCH_CURRENT_USER:
			return Object.assign({}, state, { isFetching: false})
		default:
			return state
	}
}

const reducer = combineReducers({
	fetching,
	users,
	currentUser,
	messageReducer,
	messagesReducer,
	routing: routerReducer
})

export default reducer
