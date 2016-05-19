import {
	FETCH_CURRENT_USER,
	REQUEST_CREATE_USER,
	RECEIVE_CREATED_USER,
	FIREBASE_URL,
	FIREBASE_REF,
	FIREPROOF
} from 'constants'

import { push } from 'react-router-redux'

// Firebase setup
// Fireproof is a promised base library wrapping around the actual Firebase API
const userRef = FIREPROOF.child('users')
// End of Firebase setup

export function fetchCurrentUser() {
	return dispatch => {
		let storageUser = JSON.parse(localStorage.getItem('currentUser'))

		if (!storageUser) {
			return dispatch(fetchUser(null))
		}

		userRef.child(storageUser.id).once('value', function(snapshot) {
			let currentUser = snapshot.val() ? snapshot.val().user : null
			dispatch(fetchUser(currentUser))
		}, function(error) {
			console.log(error.code)
		})
	}
}

function fetchUser(currentUser) {
	return {
		type: 'FETCH_CURRENT_USER',
		currentUser: currentUser
	}
}

function requestCreateUser() {
	return {
		type: REQUEST_CREATE_USER
	}
}

function receiveCreatedUser(user) {
	return {
		type: RECEIVE_CREATED_USER,
		currentUser: user
	}
}

export function createUser(name) {
	return dispatch => {
		dispatch(requestCreateUser())
		let userID = 'u_' + Date.now()
		const user = {
			id: userID,
			name: name
		}

		// Set currentUser
		localStorage.setItem('currentUser', JSON.stringify(user))
		dispatch(fetchUser(user))

		userRef.child(userID).set({user}).then(function() {
			dispatch(receiveCreatedUser(user))

		}, function(error) {
			console.log(error.code)
		})
	}
}

export function deleteUser(user) {
	return dispatch => {
		
		userRef.child(user.id).remove(function() {
			localStorage.setItem('currentUser', null)
			// dispatch(fetchCurrentUser())
			dispatch(gotoLogin())
		})
	}
}

export function gotoLogin() {
	return dispatch => {
		dispatch(push('/'))	
	}
}

export function gotoApp() {
	return dispatch => {
		dispatch(push('/app'))	
	}
}
