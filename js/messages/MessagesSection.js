import { connect } from 'react-redux'
import MessageList from './MessageList'
import { clickMessage, deleteMessage, preEditMessage, doneEditingMessage, closeEditPopup } from './messageActions'

const mapStateToProps = (state) => {
	const { users, currentUser, messageReducer, messagesReducer } = state
	return {
		// threadID: users && users.currentActive ? users.currentActive.threadID : null,
		threadID: messagesReducer && messagesReducer.threadID ? messagesReducer.threadID : null,
		messages: messagesReducer && messagesReducer.messages ? messagesReducer.messages : [],
		editMessage: messageReducer,
		currentUser: currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onMessageClick: (threadID, message, position) => {
			dispatch(clickMessage(threadID, message, position))
		},
		onMessageDelete: (threadID, message) => {
			dispatch(deleteMessage(threadID, message))
		},
		onMessageEdit: (threadID, message) => {
			dispatch(preEditMessage(threadID, message))
			dispatch(closeEditPopup())
		}
	}
}

const MessagesSection = connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageList)

export default MessagesSection
