import {
	CLICK_MESSAGE,
	PRE_EDIT_MESSAGE,
	CLOSE_EDIT_POPUP,
	DONE_EDITING_MESSAGE
} from 'constants'

const messageReducer = (state = null, action) => {
	switch (action.type) {
		case CLICK_MESSAGE:
			if (state && state.isShowPopup) {
				return Object.assign({}, state, {
					isShowPopup: false
				})
			} else {
				return Object.assign({}, state, {
					threadID: action.threadID,
					message: action.message,
					position: action.position,
					isShowPopup: true
				})
			}
		case CLOSE_EDIT_POPUP:
			return Object.assign({}, state, {
				isShowPopup: false
			})
		case PRE_EDIT_MESSAGE:
			return Object.assign({}, state, {
				messageToComposer: {
					threadID: action.threadID,
					message: action.message
				}
			})
		case DONE_EDITING_MESSAGE:
			return Object.assign({}, state, {
				messageToComposer: null
			})
		default:
			return state
	}
}

export default messageReducer
