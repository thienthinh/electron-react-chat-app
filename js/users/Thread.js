import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Thread = ({ user, currentActive, onClick }) => {
	var unReadMark = (user.messages && user.messages[user.messages.length - 1] && user.messages[user.messages.length - 1].isRead === false && user.messages[user.messages.length - 1].authorID === user.id) ? <span className="unread-mark"></span> : ''

	return (
		<li className={classNames({
					'thread-list-item': true,
					'active': currentActive && user.id == currentActive.id
				})} 
				onClick={onClick}>
			<div>{unReadMark}</div>
			<h5 className="thread-name">{user.name}</h5>
		</li>
	)
}

Thread.propTypes = {
	onClick: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default Thread
