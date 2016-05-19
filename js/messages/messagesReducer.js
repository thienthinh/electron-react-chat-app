import {
	CLEAR_MESSAGES_REDUCER,
	FETCH_CURRENT_USER,
	REQUEST_MESSAGES,
	RECEIVE_MESSAGES,
	ACTIVE_THREAD
} from 'constants'

const electron = require('electron')
const remote = electron.remote
const win = remote.getCurrentWindow()
let ipcRenderer
// Check env: is Electron app if (!!window.require), else: browser
if (!!window.require) {
  const electron = require('electron')
  ipcRenderer = electron.ipcRenderer
}

function pushMessageNotification(newMessage, threadID) {
	let currentUser = JSON.parse(localStorage.getItem('currentUser'))
	if (newMessage.authorID === currentUser.id) {
		return
	}

	if (win.isFocused()) {
		console.log("isFocused")
		return
	}

	let arg = {
		userID: newMessage.authorID,
		threadID: threadID
	}

	// Send notification
	let myNotification = new Notification(newMessage.authorName, {
	  body: newMessage.text
	})
	myNotification.onclick = function () {
	  console.log('Notification clicked')
	  if (ipcRenderer) {
	  	ipcRenderer.send('notification-clicked', arg)
	  }
	}
}

let initialState = {
	messages: [],
	threadID: null
}

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_MESSAGES:
			console.log("requesting messages")
			return state
		case RECEIVE_MESSAGES:
			// if (action.messages && state.messages && action.messages.length > 0 && action.messages.length > state.messages.length && action.threadID !== state.threadID) {
			if (action.messages && action.messages.length > 0) {
				let lastMessage = action.messages[action.messages.length - 1]
				pushMessageNotification(lastMessage, action.threadID)
			}

			return Object.assign({}, state, {
				messages: action.messages,
				threadID: action.threadID
			})
		case CLEAR_MESSAGES_REDUCER:
			return Object.assign({}, state, initialState)
		default:
			return state
	}
}

export default messagesReducer
