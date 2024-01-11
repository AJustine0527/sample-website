export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const ROUTES_CHANGE = 'ROUTES_CHANGE';

export const HEADER_LOAD = 'HEADER_LOAD';
export const HEADER_LOAD_SUCCESS = 'HEADER_LOAD_SUCCESS';

export function routeChanged(path){
	return{
		type: ROUTES_CHANGE,
		path
	}
}

export function headerLoad(){
	return{
		type: HEADER_LOAD
	}
}

export function headerLoadSuccess(){
	return{
		type: HEADER_LOAD_SUCCESS
	}
}

export function loadHeader(){
	return async dispatch=>{
		dispatch(headerLoad())
		setTimeout(() => {
			dispatch(headerLoadSuccess())
		}, 0);
	}
}
