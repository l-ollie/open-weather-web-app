import ActionType from '../types';

const weatherColor = { r: 255, g: 255, b: 255, fontColor: 'light' };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { today: weatherColor, tomorrow: weatherColor, sevenDays: weatherColor }, action) => {
	switch (action.type) {
		case ActionType.weatherColors:
			return action.payload;
		default:
			return state;
	}
};
