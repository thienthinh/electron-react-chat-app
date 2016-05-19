import {
	CLEAR_MESSAGES_REDUCER,
	REQUEST_MESSAGES,
	RECEIVE_MESSAGES,
	RECEIVE_MESSAGE,
	CLICK_MESSAGE,
	DONE_EDITING_MESSAGE,
	CLOSE_EDIT_POPUP,
	PRE_EDIT_MESSAGE,
	FIREBASE_URL,
	FIREBASE_REF,
	FIREPROOF
} from 'constants'

// Firebase setup
// Fireproof is a promised base library wrapping around the actual Firebase API
const threadRef = FIREPROOF.child('threads')
// End of Firebase setup


// Messages
function requestMessages() {
	return {
		type: REQUEST_MESSAGES
	}
}

function receiveMessages(messages, threadID) {
	return {
		type: RECEIVE_MESSAGES,
		messages: messages,
		threadID: threadID
	}
}

export function fetchCurrentMessages(threadID) {
	return dispatch => {
		dispatch(requestMessages())

		if (!threadID) {
			return
		}

		return threadRef.child(threadID).child('messages').on("value", function(snapshot) {
			let messages = []
			snapshot.forEach(function(rawMessage) {
				messages.push(rawMessage.val())
			})

			dispatch(receiveMessages(messages, threadID))
		}, function(error) {
			console.log(error.code)
		})
	}
}


// Message
function receiveMessage(threadID, message) {
	return {
		type: RECEIVE_MESSAGE,
		threadID: threadID,
		message: message
	}
}

export function sendMessage(threadID, message) {
	return dispatch => {

		threadRef.child(threadID).child('messages').child(message.id).set(message).then(function() {
			dispatch(receiveMessage(threadID, message))
		}, function(error) {
			console.log(error.code)
		})
	}
}

export function clickMessage(threadID, message, position) {
	return {
		type: CLICK_MESSAGE,
		threadID: threadID,
		message: message,
		position: position
	}
}

export function closeEditPopup() {
	return {
		type: CLOSE_EDIT_POPUP,
	}
}

export function doneEditingMessage() {
	return {
		type: DONE_EDITING_MESSAGE,
	}
}

export function deleteMessage(threadID, message) {
	return dispatch => {
		let messageRef = threadRef.child(threadID).child('messages').child(message.id)
		messageRef.remove()

		dispatch(closeEditPopup())
	}
}

export function preEditMessage(threadID, message) {
	return {
		type: PRE_EDIT_MESSAGE,
		threadID: threadID,
		message: message
	}
}

export function editMessage(threadID, message, newText) {
	let messageRef = threadRef.child(threadID).child('messages').child(message.id)
	messageRef.update({text: newText})
	return {
		type: DONE_EDITING_MESSAGE
	}
}

export function clearMessagesReducer() {
	return {
		type: CLEAR_MESSAGES_REDUCER
	}
}
