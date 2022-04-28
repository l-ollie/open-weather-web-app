import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';
import measurementUnit from './measurementUniteReducer';
import hourlyWeather from './HourlyReducer';
import sevenDaysWeather from './sevenDaysWeatherReducer';

import weatherColors from './weatherColors';
import selectedCity from './selectedCityReducer';

const allReducers = combineReducers({
	currentWeather,
	measurementUnit,
	hourlyWeather,
	sevenDaysWeather,
	weatherColors,
	selectedCity
});

export default allReducers;
