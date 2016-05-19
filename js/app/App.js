import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, fetchThreads, clearUsersReducer } from 'usersActions'
import { fetchCurrentUser } from 'loginActions'
import { clearMessagesReducer } from 'messageActions'
import UsersSection from 'UsersSection'
import MessagesSection from 'MessagesSection'
import MessageInput from 'MessageInput'
import LoginSection from 'LoginSection'

class App extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearUsersReducer())
    dispatch(clearMessagesReducer())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUsers())
    dispatch(fetchThreads())
    dispatch(fetchCurrentUser())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { dispatch } = nextProps
    }
  }

  render() {
    const { users, currentUser } = this.props

    const chatSection = <div className="chat-section">
                          <UsersSection />
                          <div className="message-section-wrapper">
                            <MessagesSection />
                            <MessageInput />
                          </div>
                        </div>

    return (
      <div>
        {chatSection}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users, currentUser } = state
  return {
    users,
    currentUser
  }
}

export default connect(mapStateToProps)(App)
