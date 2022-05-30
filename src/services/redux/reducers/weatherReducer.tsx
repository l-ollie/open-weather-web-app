import IWeather from '../../../models/IWeather';
import ActionType from '../actionTypes';
import { WeatherR } from '../types';


const initialState = {
	loading: false,
	currentWeather: null,
	hourlyWeather: null,
	dailyWeather: null,
	error: null
};


// eslint-disable-next-line import/no-anonymous-default-export
export default (state: IWeather = initialState, action: WeatherR) => {
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
				error: null
			};
		case ActionType.fetchWeatherSave:
			return {
				...state,
				[action.name]: action.payload
			};
		case ActionType.fetchWeatherFailure:
			return {
				loading: false,
				currentWeather: null,
				hourlyWeather: null,
				dailyWeather: null,
				error: action.payload
			};
		default:
			return state;
	}
};
