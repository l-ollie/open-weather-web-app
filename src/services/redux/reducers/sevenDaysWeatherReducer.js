import ActionType from '../actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
	switch (action.type) {
		case ActionType.fetchSevenDaysWeather:
			return action.payload;
		default:
			return state;
	}
};
