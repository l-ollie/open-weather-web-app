import WeatherRepository from '../../data/weatherRepository';
import { apiKey } from '../../data/data';
import getTempColorForLeds from '../../script/tempToColor';
import ActionType from '../types';

const weatherRepository = new WeatherRepository(apiKey);

export const fetchWeather = (lat, lon, measurementUnitSystem) => async (dispatch) => {
	const response = await weatherRepository.getCurrentWeather(lat, lon, measurementUnitSystem);
	dispatch({ type: ActionType.fetchCurrentWeather, payload: { current: response.data } });

	const response2 = await weatherRepository.getForcasts(lat, lon, measurementUnitSystem);
	dispatch({ type: ActionType.timeZone, payload: response2.data.timezone });
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

// =============================================

export const fetchCurrentWeatherRequest = () => {
	return {
		type: ActionType.fetchCurrentWeatherRequest
	};
};

export const fetchCurrentWeatherSuccess = (currentWeather) => {
	return {
		type: ActionType.fetchCurrentWeatherSuccess,
		payload: currentWeather
	};
};

export const fetchCurrentWeatherFailure = (error) => {
	return {
		type: ActionType.fetchCurrentWeatherFailure,
		payload: error
	};
};

export const fetchCurrentWeather = (lat, lon, measurementUnitSystem) => {
	return function(dispatch) {
		dispatch(fetchCurrentWeatherRequest());
		weatherRepository
			.getCurrentWeather(lat, lon, measurementUnitSystem)
			.then((response) => {
				const currentWeather = response.data;
				dispatch(fetchCurrentWeatherSuccess(currentWeather));
			})
			.catch((error) => {
				dispatch(fetchCurrentWeatherFailure(error));
			});
	};
};
// =============================================

export const fetchWeatherRequest = () => {
	return {
		type: ActionType.fetchWeatherRequest
	};
};

export const fetchWeatherSuccess = (weather) => {
	return {
		type: ActionType.fetchWeatherSuccess,
		payload: weather
	};
};

export const fetchWeatherSave = (weather, name) => {
	return {
		type: ActionType.fetchWeatherSave,
		payload: weather,
		name: name
	};
};

export const fetchWeatherFailure = (error) => {
	return {
		type: ActionType.fetchWeatherFailure,
		payload: error
	};
};

export const fetchWeather2 = (lat, lon, measurementUnitSystem) => {
	return function(dispatch) {
		dispatch(fetchWeatherRequest());
		try {
			weatherRepository.getCurrentWeather(lat, lon, measurementUnitSystem).then((response) => {
				const currentWeather = response.data;
				dispatch(fetchWeatherSave(currentWeather, 'currentWeather'));
			});
			// .catch((error) => {
			// 	dispatch(fetchWeatherFailure(error));
			// });

			weatherRepository
				.getForcasts(lat, lon, measurementUnitSystem)
				.then((response) => {
					const hourlyWeather = response.data.hourly;

					dispatch(fetchWeatherSave(hourlyWeather, 'hourlyWeather'));
					const dailyWeather = response.data.daily;

					dispatch(fetchWeatherSave(dailyWeather, 'dailyWeather'));
				})
				.then(() => {
					dispatch(fetchWeatherSuccess());
				})
				.catch((error) => {
					dispatch(fetchWeatherFailure(error));
				});
		} catch (error) {
			dispatch(fetchWeatherFailure(error));
		}
	};
};

function handelError(error) {
	alert(error);
}
