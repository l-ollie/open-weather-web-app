import { combineReducers } from 'redux';
import measurementUnit from './measurementUniteReducer';
import weather from './weatherReducer';
import weatherColors from './weatherColors';
import selectedCity from './selectedCityReducer';
import timezone from './timezoneReducer';

export const allReducers = combineReducers({
	measurementUnit,
	weatherColors,
	selectedCity,
	timezone,
	weather
});

export default allReducers;
