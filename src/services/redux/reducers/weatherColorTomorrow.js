// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { r: 255, g: 255, b: 255, fontColor: 'light' }, action) => {
	switch (action.type) {
		case 'WEATHER_COLOR_TOMORROW':
			return action.payload;
		default:
			return state;
	}
};
