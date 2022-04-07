import WeatherRepository from '../../data/weatherRepository';
import { apiKey } from '../../data/data';
import getTempColorForLeds from '../../script/tempToColor';

const weatherRepository = new WeatherRepository(apiKey);

export const fetchCurrentWeather = (lat, lon, measurementUnit) => async (dispatch) => {
	const response = await weatherRepository.getCurrentWeather(lat, lon, measurementUnit);
	dispatch({ type: 'FETCH_CURRENT_WEATHER', payload: { current: response.data } });
	const tempToColor = getTempColorForLeds(response.data.main.feels_like, measurementUnit);
	dispatch({ type: 'WEATHER_COLOR_TODAY', payload: tempToColor });
};

export const fetchForecastsWeather = (lat, lon, measurementUnit) => async (dispatch) => {
	const response = await weatherRepository.getForcasts(lat, lon, measurementUnit);
	dispatch({ type: 'HOURLY_WEATHER', payload: { hourly: response.data.hourly } });
	dispatch({ type: 'FIVE_DAYS_WEATHER', payload: { daily: response.data.daily } });

	const tempToColorTomorrow = getTempColorForLeds(response.data.daily[1].feels_like.day, measurementUnit);
	dispatch({ type: 'WEATHER_COLOR_TOMORROW', payload: tempToColorTomorrow });

	const tempToColorFiveDaysTemp = response.data.daily.reduce(
		(previousValue, currentValue) => previousValue + currentValue.feels_like.day,
		0
	);
	const tempToColorFiveDaysAverage = tempToColorFiveDaysTemp / response.data.daily.length;
	const tempToColorFiveDays = getTempColorForLeds(tempToColorFiveDaysAverage, measurementUnit);
	dispatch({ type: 'WEATHER_COLOR_FIVE_DAYS', payload: tempToColorFiveDays });
};

export const setMeasurementUnit = (unit) => {
	return {
		type: 'SET_MEASUREMENT_UNIT',
		payload: unit
	};
};

export const setSelectedCity = (unite) => {
	return {
		type: 'SET_SELECTED_CITY',
		payload: unite
	};
};

export const setTempUnitCss = (unite) => {
	return {
		type: 'SET_TEMP_UNIT_CSS',
		payload: unite
	};
};
