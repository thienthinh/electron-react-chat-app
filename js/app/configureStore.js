import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {devTools, persistState} from 'redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'

import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

// // Configure the dev tools when in DEV mode
// let createStoreWithMiddleware
// if (__DEV__) {
//   createStoreWithMiddleware = compose(
//     applyMiddleware(thunkMiddleware),
//     devTools(),
//     persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
//   )(createStore);
// } else {
//   createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
// }

// export default function configureStore(initialState) {
//   return createStoreWithMiddleware(reducer, initialState)
// }


const loggerMiddleware = createLogger()
const router = routerMiddleware(hashHistory)

export default function configureStore(initialState) {
	return createStore(
		reducer,
		applyMiddleware(
			thunkMiddleware,
			router,
			loggerMiddleware
		)
	)
}
