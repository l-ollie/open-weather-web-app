const tempUnitCssReducer = (state = 'unite-celsius', action) => {
	switch (action.type) {
		case 'SET_TEMP_UNIT_CSS':
			if (action.payload === 'metric') return 'unite-celsius';
			else if (action.payload === 'imperial') return 'unite-fahrenheit';
			return;
		default:
			return state;
	}
};

export default tempUnitCssReducer;
