import React, { PropTypes } from 'react'

const EditMessagePopup = ({editMessage, onDeleteMessage, onEditMessage}) => {
	let divStyle = {
		top: editMessage.position.y
	}

	return (
		<div className="edit-message-popup" style={divStyle}>
			<ul className="edit-options">
				<li onClick={() => {
							console.log("edit message")
							onEditMessage(editMessage.threadID, editMessage.message)
				}}>
					Edit
				</li>
				<li onClick={() => {
							console.log("delete message")
							onDeleteMessage(editMessage.threadID, editMessage.message)
				}}>
					Delete
				</li>
			</ul>
		</div>
	)
}

export default EditMessagePopup
