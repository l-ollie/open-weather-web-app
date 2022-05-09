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

const initialState = {
	loading: false,
	currentWeather: [],
	error: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export const currentWeatherReducer2 = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.fetchCurrentWeather:
			return action.payload;
		case ActionType.fetchCurrentWeatherRequest:
			return {
				...state,
				loading: true
			};
		case ActionType.fetchCurrentWeatherSuccess:
			return {
				loading: false,
				currentWeather: action.payload,
				error: ''
			};
		case ActionType.fetchCurrentWeatherFailure:
			return {
				loading: false,
				currentWeather: [],
				error: action.payload
			};
		default:
			return state;
	}
};
