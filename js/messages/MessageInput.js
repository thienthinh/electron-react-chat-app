import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ENTER_KEY_CODE } from 'constants'
import { sendMessage, editMessage } from './messageActions'

class MessageInput extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			const { dispatch } = nextProps
		}
	}

	render() {
		let input
		let { currentUser, currentActive, messageToEdit, dispatch } = this.props

		function onKeyDownInput(event) {
			if (event.keyCode === ENTER_KEY_CODE) {
				event.preventDefault()
				if (input && input.value.trim()) {
					console.log('thread: ', currentActive.threadID)
					console.log('message: ', input.value)

					let messageID = 'm_' + Date.now()
					let message = {
						id: messageID,
						text: input.value,
						authorName: currentUser.name,
						authorID: currentUser.id,
						date: Date.now(),
						isRead: false
					}

					dispatch(sendMessage(currentActive.threadID, message))
					input.value = ''
				}
			}
		}

		function onEditMessage(event) {
			if (event.keyCode === ENTER_KEY_CODE) {
				event.preventDefault()
				dispatch(editMessage(messageToEdit.threadID, messageToEdit.message, input.value))
				input.value = ''
			}
		}

		let inputComponent = currentActive && currentActive.threadID && !messageToEdit ? 
				<textarea 
					ref={node => {
						input = node
					}} 
					placeholder="Type a message here" 
					className="message-composer" 
					name="message"
					onKeyDown={onKeyDownInput}
				/> 
			: ''

		let editInputComponent = messageToEdit ? 
				<textarea 
					ref={node => {
						input = node
					}} 
					className="message-composer" 
					name="message"
					defaultValue={messageToEdit ? messageToEdit.message.text : ''}
					onKeyDown={onEditMessage}
				/>
			: ''

		return (
			<div>
				{inputComponent}
				{editInputComponent}
			</div>
		)
	}
	
}

const mapStateToProps = (state) => {
	const { users, currentUser, messageReducer } = state
	return {
		currentUser: currentUser,
		currentActive: users.currentActive,
		messageToEdit: messageReducer ? messageReducer.messageToComposer : null
	}
}

export default connect(mapStateToProps)(MessageInput)
