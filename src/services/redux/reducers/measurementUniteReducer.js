// eslint-disable-next-line import/no-anonymous-default-export
const measurementUnitReducer = (state = 'metric', action) => {
	switch (action.type) {
		case 'SET_MEASUREMENT_UNIT':
			return action.payload;
		default:
			return state;
	}
};

export default measurementUnitReducer;
