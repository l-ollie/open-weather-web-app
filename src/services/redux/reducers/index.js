import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';
import measurementUnit from './measurementUniteReducer';
import hourlyWeather from './HourlyReducer';
import sevenDaysWeather from './sevenDaysWeatherReducer';

import weatherColors from './weatherColors';
import selectedCity from './selectedCityReducer';
import timezone from './timezoneReducer';

const allReducers = combineReducers({
	currentWeather,
	measurementUnit,
	hourlyWeather,
	sevenDaysWeather,
	weatherColors,
	selectedCity,
	timezone
});

export default allReducers;
