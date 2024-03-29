import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../types';

export const isRouteChanged = (state = '', action) => {
	switch (action.type) {
		case types.ROUTES_CHANGE:
			return action.path;
		default:
			return state;
	}

}

const isFetching = (state = false, action) => {
	switch (action.type) {
		case types.CREATE_REQUEST:
			return true;
		case types.REQUEST_SUCCESS:
		case types.REQUEST_FAILURE:
			return false;
		default:
			return state;
	}
};

const isHeaderLoad = (state = false, action) => {
	switch (action.type) {
		case types.HEADER_LOAD:
			return  true
		case types.HEADER_LOAD_SUCCESS:
			return  false
		default:
			return state;
	}
};

// Combine reducers with routeReducer which keeps track of
// router state

const rootReducer = combineReducers({
	isFetching,
	headerLoaded: isHeaderLoad,
	currentRoute: isRouteChanged,
	routing
});

export default rootReducer;
