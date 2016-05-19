import { 
	CLEAR_USERS_REDUCER,
	FETCH_CURRENT_USER,
	REQUEST_USERS, 
	RECEIVE_USERS,
	REQUEST_THREADS,
	RECEIVE_THREADS,
	RECEIVE_THREAD,
	RECEIVE_MESSAGE,
	ACTIVE_THREAD
} from 'constants'

let currentUser = JSON.parse(localStorage.getItem('currentUser'))
let _currentUserID = currentUser ? currentUser.id : null

let _currentID = null
let _users = {}

function initUsers(users) {
	_users = {}

	if (!users || users.length == 0) {
		return
	}

	users.forEach(function(rawUser) {
		if (rawUser.id == _currentUserID) {
			return
		}

		var userID = rawUser.id
		var user = _users[userID]
		_users[userID] = {
			id: userID,
			name: rawUser.name
		}
	}, this)

	// return _users
	return getAllChrono()
}

function getCurrentID() {
	if (!_currentID) {
		var allChrono = getAllChrono()
		if (allChrono.length == 0) {
			return
		}
		_currentID = allChrono[0].id
	}
	// console.log('_currentID: ', _currentID)
	return _currentID
}

function getAllChrono() {
	var orderredThreads = []
	for (var id in _users) {
		var thread = _users[id]
		orderredThreads.push(thread)
	}

	orderredThreads.sort(function(a, b) {

		if (a.messages && a.messages.length > 0 && b.messages && b.messages.length > 0) {
			if (a.messages[a.messages.length - 1].date < b.messages[b.messages.length - 1].date) {
				return 1
			} else if (a.messages[a.messages.length - 1].date > b.messages[b.messages.length - 1].date) {
				return -1
			}
			return 0
		} else if (a.messages && !b.messages) {
			return -1
		} else if (!a.messages && b.messages) {
			return 1
		}
		return 0
	})

	return orderredThreads
}

function concatThreads(threads) {

	if (!threads || threads.length == 0) {
		return getAllChrono()
	}

	threads.forEach(function(rawThread) {
		// var rawThread = rawThread.thread
		var threadID = rawThread.id
		var userIDs = rawThread.threadLink.split(/and/)

		// Return if thread does not belong to currentUser (threadLink does not contain currentUserID)
    if (rawThread.threadLink.indexOf(_currentUserID) < 0) {
      return getAllChrono()
    }

    var otherUserID = userIDs.filter(function(x) { return x !== _currentUserID })[0]
    var otherUser = _users[otherUserID]

    if (!otherUser) {
    	return getAllChrono()	
    }
    
    var messages = getArrayMessages(rawThread.messages) || []
    if (otherUserID == _currentID && messages && messages[messages.length - 1]) {
    	messages[messages.length - 1].isRead = true
    }

    _users[otherUserID] = {
    	id: otherUser.id,
    	threadID: threadID,
    	threadLink: rawThread.threadLink,
    	name: otherUser.name,
    	messages: messages
    }
	}, this)

	// return _users
	return getAllChrono()
}

function concatThread(thread) {

	var threadID = thread.id
	var userIDs = thread.threadLink.split(/and/)

	// Return if thread does not belong to currentUser (threadLink does not contain currentUserID)
  if (thread.threadLink.indexOf(_currentUserID) < 0) {
    return getAllChrono()
  }

  var otherUserID = userIDs.filter(function(x) { return x !== _currentUserID })[0]

  var otherUser = _users[otherUserID]
  _users[otherUserID] = {
  	id: otherUser.id,
  	threadID: threadID,
  	threadLink: thread.threadLink,
  	name: otherUser.name
  }

	// return _users
	return getAllChrono()
}

function getArrayMessages(messages) {
	let arrayMessages = []
	for (var id in messages) {
		var message = messages[id]
		arrayMessages.push(message)
	}
	return arrayMessages
}

function getCurrentActive(userID) {
	return _users[userID]
}

export function getCurrentThreadID() {
	if (_users[getCurrentID()]) {
		return _users[getCurrentID()].threadID
	}
}

const users = (state = {users: []}, action) => {
	switch (action.type) {
		case FETCH_CURRENT_USER:
			_currentUserID = action.currentUser ? action.currentUser.id : null
			return state
		case REQUEST_USERS:
			console.log('requesting users')
			return state
		case RECEIVE_USERS:
			return Object.assign({}, state, {
				users: initUsers(action.users),
				currentActive: getCurrentActive(getCurrentID())
			})
		case REQUEST_THREADS:
			console.log('requesting threads')
		case RECEIVE_THREADS:
			let newThreads = concatThreads(action.threads)
			return Object.assign({}, state, {
				users: newThreads,
				currentActive: getCurrentActive(getCurrentID())
			})
		case ACTIVE_THREAD:
			_currentID = action.currentID
			return Object.assign({}, state, {
				currentActive: getCurrentActive(action.currentID)
			})
		case CLEAR_USERS_REDUCER:
			return Object.assign({}, state, {users: []})
		default:
			return state
	}
}

export default users
