import ActionType from '../actionTypes';
import { TimezoneR } from '../types';



// eslint-disable-next-line import/no-anonymous-default-export
export default (state: null | string = null, action: TimezoneR) => {
	switch (action.type) {
		case ActionType.saveTimezone:
			return action.payload;
		default:
			return state;
	}
};
