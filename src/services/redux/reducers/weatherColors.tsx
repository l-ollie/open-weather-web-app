import ActionType from '../actionTypes';
import { WeatherColorsR } from '../types';

const weatherColor = { r: 255, g: 255, b: 255, fontColor: 'dark' };
const initialState = { today: weatherColor, tomorrow: weatherColor, eightDays: weatherColor };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: WeatherColorsR) => {
	switch (action.type) {
		case ActionType.calculateBackgroundColor:
			return { ...state };
		case ActionType.saveBackgroundColor:
			return action.payload;
		default:
			return { ...state };
	}
};
