const selectedCityReducer = (state = { name: 'Leiden', lat: 52.1583, lon: 4.4931 }, action) => {
	switch (action.type) {
		case 'SET_SELECTED_CITY':
			return action.payload;
		default:
			return state;
	}
};

export default selectedCityReducer;
