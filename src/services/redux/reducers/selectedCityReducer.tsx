import ActionType from "../actionTypes";
import { SelectedCityR } from "../types";

const selectedCityReducer = (state = { name: 'Leiden', lat: 52.1583, lon: 4.4931 }, action: SelectedCityR) => {
	switch (action.type) {
		case ActionType.setSelectedCity:
			return action.payload;
		default:
			return state;
	}
};

export default selectedCityReducer;
