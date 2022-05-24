import { Current } from "../../../models/ICurrentWeather";
import { Daily } from "../../../models/IDailyWeather";
import { Hourly } from "../../../models/IHourlyWeather";
import ISelectedCity from "../../../models/ISelectedCity";
import IWeather from "../../../models/IWeather";
import IWeatherColors from "../../../models/IWeatherColor";
import MeasurementUnit from "../../../models/MeasurementUnit";
import MeasurementUnitSystem from "../../../types/MeasurementUnitSystem";
import ActionType from "../actionTypes";

export interface SetMeasurementUnitR {
    type: ActionType.setMeasurementUnit;
    payload: MeasurementUnit
}

export interface TimezoneR {
    type: ActionType.saveTimezone;
    payload: string
}

export interface MeasurementUnitR {
    type: ActionType.setMeasurementUnit;
    payload: MeasurementUnitSystem
}

export interface SelectedCityR {
    type: ActionType.setSelectedCity,
    payload: ISelectedCity
}

export interface CalculateBackgroundColorR {
    type: ActionType.calculateBackgroundColor
}
export interface SaveBackgroundColorR {
    type: ActionType.saveBackgroundColor;
    payload: IWeatherColors
}
export type WeatherColorsR = CalculateBackgroundColorR | SaveBackgroundColorR;



export interface FetchWeatherR {
    type: ActionType.fetchWeather;
    payload: IWeather
}
export interface FetchWeatherRequestR {
    type: ActionType.fetchWeatherRequest;
    // payload: IWeather
}
export interface FetchWeatherSuccessR {
    type: ActionType.fetchWeatherSuccess;
    payload: IWeather
}
export interface FetchWeatherSaveR {
    type: ActionType.fetchWeatherSave;
    name: string
    payload: Daily[] | Hourly[] | Current
}
export interface FetchWeatherFailureR {
    type: ActionType.fetchWeatherFailure;
    payload: string
}

export type WeatherR = FetchWeatherR | FetchWeatherRequestR | FetchWeatherSuccessR | FetchWeatherSaveR | FetchWeatherFailureR;
