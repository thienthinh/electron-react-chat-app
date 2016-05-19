import { combineReducers } from 'redux'
import users from 'usersReducer'
import currentUser from 'loginReducer'
import messageReducer from 'messageReducer'
import messagesReducer from 'messagesReducer'

import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
	users,
	currentUser,
	messageReducer,
	messagesReducer,
	routing: routerReducer
})

export default reducer
