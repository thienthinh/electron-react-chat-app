import React, { PropTypes } from 'react'
import classNames from 'classnames'
// import styles from '../../css/app.css'

const Message = ({message, currentUser, onClick, onContextMenu}) => (

	<li className={classNames({
				'message-list-item': true,
				'clearfix': true,
				'owner': message.authorID == currentUser.id
			})}>
		<h5 className="message-author-name">{message.authorName}</h5>
		<div className="message-time">{(new Date(message.date)).toLocaleTimeString()}</div>
		<div className="message-text" onContextMenu={onContextMenu}>{message.text}</div>
	</li>
)

Message.propTypes = {
	// message: PropTypes.object.isRequired
	currentUser: PropTypes.object.isRequired
}

export default Message
