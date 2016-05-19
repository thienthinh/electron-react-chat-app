import React, { Component, PropTypes } from 'react'
import Message from './Message'
import EditMessagePopup from './EditMessagePopup'

// const MessageList = ({ messages, currentUser }) => (
// 	<div className="message-section">
// 		<ul className="message-list">
// 			{messages.map((message) =>
// 				<Message key={message.id}
// 					message={message}
// 					currentUser={currentUser}
// 				/>
// 			)}
// 		</ul>
// 	</div>
// )

const electron = require('electron')
const remote = electron.remote
const Menu = remote.Menu
const MenuItem = remote.MenuItem

let menu
let selectedMessage
let selectedThreadID

class MessageList extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			const { dispatch } = nextProps
		}
	}

	componentWillMount() {
		let { onMessageDelete, onMessageEdit } = this.props

		menu = new Menu()
		menu.append(new MenuItem({ label: 'Edit Message', click: function() {
		 onMessageEdit(selectedThreadID, selectedMessage)
		} }))
		// menu.append(new MenuItem({ type: 'separator' }))
		menu.append(new MenuItem({ label: 'Delete Message', click: function() {
			onMessageDelete(selectedThreadID, selectedMessage)
		} }))
	}

	componentDidUpdate() {
		this._scrollToBottom()
	}

	render() {
		let { threadID, messages, currentUser, editMessage, onMessageClick, onMessageDelete, onMessageEdit } = this.props

		return (
			<div className="message-section">
				<ul className="message-list" ref="messageList">
					{messages.map((message) => 
						<Message key={message.id}
									message={message} 
									currentUser={currentUser} 
									onClick={(e) => { 
										if (message.authorID == currentUser.id) {
											let rects = e.target.getClientRects()
											let rect = rects[0]
											let position = {
												x: rect.left,
												y: rect.top
											}

											onMessageClick(threadID, message, position)
										}
									}} 
									onContextMenu={(e) => {
										e.preventDefault()
										if (currentUser.id !== message.authorID) {
											return
										}
										return this.contextMenu(threadID, message)
									}}
						/>
					)}
				</ul>
				{editMessage && editMessage.isShowPopup ? <EditMessagePopup 
													editMessage={editMessage} 
													onDeleteMessage={(threadID, message) => onMessageDelete(threadID, message)} 
													onEditMessage={(threadID, message) => onMessageEdit(threadID, message)}
											 /> 
										 : null}
			</div>
		)
	}

	_scrollToBottom() {
		// var ul = this.refs.messageList.getDOMNode()
		var ul = this.refs.messageList
		ul.scrollTop = ul.scrollHeight
	}

	contextMenu(threadID, message) {
		selectedThreadID = threadID
		selectedMessage = message
		menu.popup(remote.getCurrentWindow())
	}
}

MessageList.propTypes = {
	messages: PropTypes.array.isRequired,
	// currentUser: PropTypes.object.isRequired
}

export default MessageList
