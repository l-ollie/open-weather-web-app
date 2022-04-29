import WeatherRepository from '../../data/weatherRepository';
import { apiKey } from '../../data/data';
import getTempColorForLeds from '../../script/tempToColor';
import ActionType from '../types';

const weatherRepository = new WeatherRepository(apiKey);

export const fetchWeather = (lat, lon, measurementUnitSystem) => async (dispatch) => {
	const response = await weatherRepository.getCurrentWeather(lat, lon, measurementUnitSystem);
	dispatch({ type: ActionType.fetchCurrentWeather, payload: { current: response.data } });

	const response2 = await weatherRepository.getForcasts(lat, lon, measurementUnitSystem);
	dispatch({ type: ActionType.fetchHourlyWeather, payload: { hourly: response2.data.hourly } });
	dispatch({ type: ActionType.fetchSevenDaysWeather, payload: { daily: response2.data.daily } });

	const tempToColorToday = getTempColorForLeds(response.data.main.feels_like, measurementUnitSystem);
	const tempToColorTomorrow = getTempColorForLeds(response2.data.daily[1].feels_like.day, measurementUnitSystem);
	const tempToColorSevenDaysTemp = response2.data.daily.reduce(
		(previousValue, currentValue) => previousValue + currentValue.feels_like.day,
		0
	);
	const tempToColorSevenDaysAverage = tempToColorSevenDaysTemp / response2.data.daily.length;
	const tempToColorSevenDays = getTempColorForLeds(tempToColorSevenDaysAverage, measurementUnitSystem);

	dispatch({
		type: ActionType.weatherColors,
		payload: { today: tempToColorToday, tomorrow: tempToColorTomorrow, sevenDays: tempToColorSevenDays }
	});
};

export const setMeasurementUnit = (unit) => {
	return {
		type: ActionType.setMeasurementUnit,
		payload: unit
	};
};

export const setSelectedCity = (city) => {
	return {
		type: ActionType.setSelectedCity,
		payload: city
	};
};
