import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';
import measurementUnit from './measurementUniteReducer';
import hourlyWeather from './HourlyReducer';
import fiveDaysWeather from './fiveDaysWeatherReducer';
import weatherColor from './weatherColor';
import selectedCity from './selectedCityReducer';
import tempUnitCss from './tempUnitCssReducer';

const allReducers = combineReducers({
	currentWeather,
	measurementUnit,
	hourlyWeather,
	fiveDaysWeather,
	weatherColor,
	selectedCity,
	tempUnitCss
});

export default allReducers;
