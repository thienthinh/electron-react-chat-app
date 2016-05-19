export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const REQUEST_THREADS = 'REQUEST_THREADS'
export const RECEIVE_THREADS = 'RECEIVE_THREADS'
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER'
export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER'
export const RECEIVE_CREATED_USER = 'RECEIVE_CREATED_USER'
export const ACTIVE_THREAD = 'ACTIVE_THREAD'
export const RECEIVE_THREAD = 'RECEIVE_THREAD'
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const CLICK_MESSAGE = 'CLICK_MESSAGE'
export const DONE_EDITING_MESSAGE = 'DONE_EDITING_MESSAGE'
export const PRE_EDIT_MESSAGE = 'PRE_EDIT_MESSAGE'
export const CLOSE_EDIT_POPUP = 'CLOSE_EDIT_POPUP'
export const CLEAR_USERS_REDUCER = 'CLEAR_USERS_REDUCER'
export const CLEAR_MESSAGES_REDUCER = 'CLEAR_MESSAGES_REDUCER'

import Firebase from 'firebase'
export const FIREBASE_URL = 'https://thinhle-redux-chat.firebaseio.com/'
export const FIREBASE_REF = new Firebase(FIREBASE_URL)
import Fireproof from 'fireproof'
export const FIREPROOF = new Fireproof(FIREBASE_REF)

export const ENTER_KEY_CODE = 13
