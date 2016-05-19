import 'babel-polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { renderDevTools } from './utils/devTools'
import configureStore from 'configureStore'
import App from 'app'
import { activeThreadFromNotification } from 'usersActions'

import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'


const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

// Check env: is Electron app if (!!window.require), else: browser
let ipcRenderer
if (!!window.require) {
  const electron = require('electron')
  ipcRenderer = electron.ipcRenderer

  ipcRenderer.on('asynchronous-reply', function(event, arg) {
    console.log(arg)
    store.dispatch(activeThreadFromNotification(arg.userID, arg.threadID))
  })
}

render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('root')
)
