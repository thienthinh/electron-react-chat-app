import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from 'AppContainer'
import App from 'app'
import Login from 'LoginSection'

export default (
	<Route path="/" component={AppContainer}>
		<IndexRoute component={Login} />
		<Route path="/app" component={App} />
	</Route>
)
