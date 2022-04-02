// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { r: 0, g: 0, b: 0, fontColor: 'light' }, action) => {
	switch (action.type) {
		case 'WEATHER_COLOR':
			return action.payload;
		default:
			return state;
	}
};
