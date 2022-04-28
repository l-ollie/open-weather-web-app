import ActionType from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
	switch (action.type) {
		case ActionType.fetchCurrentWeather:
			return action.payload;
		default:
			return state;
	}
};
