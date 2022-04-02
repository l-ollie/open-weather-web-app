// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
	switch (action.type) {
		case 'HOURLY_WEATHER':
			return action.payload;
		default:
			return state;
	}
};
