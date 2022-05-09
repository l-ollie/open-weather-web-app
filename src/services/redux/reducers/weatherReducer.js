import ActionType from '../types';

const initialState = {
	loading: false,
	currentWeather: [],
	hourlyWeather: [],
	dailyWeather: [],
	error: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case ActionType.fetchWeather:
			return action.payload;
		case ActionType.fetchWeatherRequest:
			return {
				...state,
				loading: true
			};
		case ActionType.fetchWeatherSuccess:
			return {
				...state,
				loading: false,
				error: ''
			};
		case ActionType.fetchWeatherSave:
			return {
				...state,
				[action.name]: action.payload
			};
		case ActionType.fetchWeatherFailure:
			return {
				loading: false,
				currentWeather: [],
				hourlyWeather: [],
				dailyWeather: [],
				error: action.payload
			};
		default:
			return state;
	}
};
