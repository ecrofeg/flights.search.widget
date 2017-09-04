import { createStore } from 'redux';
import rootReducer from 'reducers';

/**
 * Create Redux-store.
 * 
 * @param defaultState
 * @returns {Store}
 */
export function getStore(defaultState) {
	const store = createStore(rootReducer, defaultState);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer)
		})
	}
	
	return store;
}