import WeatherRepository from '../../data/weatherRepository';
import { apiKey } from '../../data/data';
import getTempColorForLeds from '../../script/tempToColor';
import ActionType from '../actionTypes';

import { AppThunk } from '../store';
import { Hourly } from '../../../models/IHourlyWeather';

import { Daily } from '../../../models/IDailyWeather';
import MeasurementUnitSystem from '../../../types/MeasurementUnitSystem';
import { Current } from '../../../models/ICurrentWeather';
import IWeatherColors from '../../../models/IWeatherColor';
import ISelectedCity from '../../../models/ISelectedCity';
import IMeasurementUnit from '../../../models/MeasurementUnit';
import IWeather from '../../../models/IWeather';
import * as R from '../types';

const weatherRepository = new WeatherRepository(apiKey);

export const setMeasurementUnit = (unit: IMeasurementUnit): R.SetMeasurementUnitR => {
	return {
		type: ActionType.setMeasurementUnit,
		payload: unit
	};
};

export const setSelectedCity = (city: ISelectedCity): R.SelectedCityR => {
	return {
		type: ActionType.setSelectedCity,
		payload: city
	};
};

export const saveBackgroundColors = (colors: IWeatherColors): R.SaveBackgroundColorR => {
	return {
		type: ActionType.saveBackgroundColor,
		payload: colors
	};
};
export const calculateBackgroundColors = (): R.CalculateBackgroundColorR => {
	return {
		type: ActionType.calculateBackgroundColor
	};
};

export const generateBackgroundColor = (): AppThunk => {
	return async (dispatch, getState) => {
		dispatch(calculateBackgroundColors());

		const weather: IWeather = getState().weather;
		const measurementUnit = getState().measurementUnit;

		const tempToColorToday = getTempColorForLeds(weather.currentWeather!.main.feels_like, measurementUnit.system);
		const tempToColorTomorrow = getTempColorForLeds(weather.dailyWeather![1].feels_like.day, measurementUnit.system);
		const tempToColorSevenDaysTemp = weather.dailyWeather!.reduce(
			(previousValue: number, currentValue: Daily) => previousValue + currentValue.feels_like.day,
			0
		);
		const tempToColorSevenDaysAverage = tempToColorSevenDaysTemp / weather.dailyWeather!.length;
		const tempToColorSevenDays = getTempColorForLeds(tempToColorSevenDaysAverage, measurementUnit.system);

		dispatch(
			saveBackgroundColors({
				today: tempToColorToday,
				tomorrow: tempToColorTomorrow,
				sevenDays: tempToColorSevenDays
			})
		);
	};
};

export const fetchWeatherRequest = (): R.FetchWeatherRequestR => {
	return {
		type: ActionType.fetchWeatherRequest
	};
};

export const fetchWeatherSuccess = (): AppThunk => {
	return (dispatch) => {
		dispatch({ type: ActionType.fetchWeatherSuccess });
		dispatch(generateBackgroundColor());
	};
};

export const saveTimezone = (timezone: string): R.TimezoneR => {
	return {
		type: ActionType.saveTimezone,
		payload: timezone
	};
};

export const fetchWeatherSave = (weather: Current | Hourly[] | Daily[], name: string): R.FetchWeatherSaveR => {
	return {
		type: ActionType.fetchWeatherSave,
		payload: weather,
		name: name
	};
};

export const fetchWeatherFailure = (error: string): R.FetchWeatherFailureR => {
	return {
		type: ActionType.fetchWeatherFailure,
		payload: error
	};
};

export const fetchWeather = (lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem): AppThunk => {
	return async function (dispatch) {
		dispatch(fetchWeatherRequest());
		try {
			await weatherRepository.getCurrentWeather(lat, lon, measurementUnitSystem).then((response) => {
				const currentWeather = response.data;

				dispatch(fetchWeatherSave(currentWeather, 'currentWeather'));
			});

			await weatherRepository
				.getForecasts(lat, lon, measurementUnitSystem)
				.then((response) => {
					const hourlyWeather = response.data.hourly;

					dispatch(fetchWeatherSave(hourlyWeather, 'hourlyWeather'));
					const dailyWeather = response.data.daily;

					dispatch(fetchWeatherSave(dailyWeather, 'dailyWeather'));

					dispatch(saveTimezone(response.data.timezone));
				})
				.then(() => {
					dispatch(fetchWeatherSuccess());
				});
		} catch (error: any) {
			dispatch(fetchWeatherFailure(error));
		}
	};
};