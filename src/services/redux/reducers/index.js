import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';
import measurementUnit from './measurementUniteReducer';
import hourlyWeather from './HourlyReducer';
import fiveDaysWeather from './fiveDaysWeatherReducer';
import weatherColorToday from './weatherColorToday';
import weatherColorTomorrow from './weatherColorTomorrow';
import weatherColorFiveDays from './weatherColorFiveDays';
import selectedCity from './selectedCityReducer';
import tempUnitCss from './tempUnitCssReducer';

const allReducers = combineReducers({
	currentWeather,
	measurementUnit,
	hourlyWeather,
	fiveDaysWeather,
	weatherColorToday,
	weatherColorTomorrow,
	weatherColorFiveDays,
	selectedCity,
	tempUnitCss
});

export default allReducers;
