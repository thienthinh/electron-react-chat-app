import {
	CLEAR_USERS_REDUCER,
	REQUEST_USERS,
	RECEIVE_USERS,
	REQUEST_THREADS,
	RECEIVE_THREADS,
	ACTIVE_THREAD,
	RECEIVE_THREAD,
	FIREBASE_URL,
	FIREBASE_REF,
	FIREPROOF
} from 'constants'

import { fetchCurrentMessages } from 'messageActions'
import { getCurrentThreadID } from 'usersReducer'

// Firebase setup
// Fireproof is a promised base library wrapping around the actual Firebase API
const userRef = FIREPROOF.child('users')
const threadRef = FIREPROOF.child('threads')
// End of Firebase setup

function requestUsers() {
	return {
		type: REQUEST_USERS
	}
}

function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users: users
	}
}

export function fetchUsers() {
	return dispatch => {
		dispatch(requestUsers())

		// Change userRef.then to userRef.on for tracking realtime users arrive
		return userRef.on("value", function(snapshot) {
			var users = []
			snapshot.forEach(function(rawUser) {
				users.push(rawUser.val().user)
			})

			dispatch(receiveUsers(users))
		}, function(error) {
			console.log(error.code)
		})

		// return userRef.then(function(snapshot) {
		// 	var users = []
		// 	snapshot.forEach(function(rawUser) {
		// 		users.push(rawUser.val().user)
		// 	})

		// 	dispatch(receiveUsers(users))
		// }, function(error) {
		// 	console.log(error.code)
		// })
	}
}

function requestThreads() {
	return {
		type: REQUEST_THREADS
	}
}

function receiveThreads(threads) {
	return {
		type: RECEIVE_THREADS,
		threads: threads
	}
}

function receiveThread(thread) {
	return {
		type: RECEIVE_THREAD,
		thread: thread
	}
}

export function fetchThreads() {

	return dispatch => {
		dispatch(requestThreads())

		// Change threadRef.then to threadRef.on for tracking realtime message arrive
		return threadRef.on("value", function(snapshot) {
			var threads = []
			snapshot.forEach(function(rawThread) {
				threads.push(rawThread.val())
			})

			dispatch(receiveThreads(threads))

			let currentThreadID = getCurrentThreadID()
			dispatch(fetchCurrentMessages(currentThreadID))
		}, function(error) {
			console.log(error.code)
		})

		// return threadRef.then(function(snapshot) {
		// 	console.log("receiveThreads: ", snapshot.val())
		// 	var threads = []
		// 	snapshot.forEach(function(rawThread) {
		// 		threads.push(rawThread.val())
		// 	})

		// 	dispatch(receiveThreads(threads))

		// }, function(error) {
		// 	console.log(error.code)
		// })
	}
}


export function activeThread(currentID, threadID) {
	return {
		type: ACTIVE_THREAD,
		currentID: currentID,
		threadID: threadID
	}
}

export function clickThread(currentUser, otherUser) {

	return dispatch => {
		if (!otherUser.threadID) {
			let threadID = 't_' + Date.now()
			let thread = {
				id: threadID,
				threadLink: [currentUser.id, otherUser.id].sort().join('and')
			}

			threadRef.child(threadID).set(thread).then(function() {
				// dispatch(receiveThread(thread))
				dispatch(activeThread(otherUser.id, threadID))
				dispatch(fetchCurrentMessages(threadID))
			}, function(error) {
				console.log(error.code)
			})

		} else {
			if (otherUser.messages && otherUser.messages[otherUser.messages.length - 1]) {
				let lastMessage = otherUser.messages[otherUser.messages.length - 1]
				
				threadRef.child(otherUser.threadID).child('messages').child(lastMessage.id).update({isRead: true})
			}
			dispatch(activeThread(otherUser.id, otherUser.threadID))
			dispatch(fetchCurrentMessages(otherUser.threadID))
		}
	}
}

export function activeThreadFromNotification(userID, threadID) {

	return dispatch => {
		threadRef.child(threadID).child('messages').limitToLast(1).once('child_added', function(snapshot) {
			snapshot.ref().update({isRead: true})
		})

		dispatch(activeThread(userID, threadID))
		dispatch(fetchCurrentMessages(threadID))
	}
}

export function clearUsersReducer() {
	return {
		type: CLEAR_USERS_REDUCER
	}
}
