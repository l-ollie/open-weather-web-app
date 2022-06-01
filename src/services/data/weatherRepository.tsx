import MeasurementUnitSystem from "../../types/MeasurementUnitSystem";
import api from "./api";

import { AxiosResponse } from 'axios'
import { Current } from "../../models/ICurrentWeather";

import { Daily } from "../../models/IDailyWeather";
import { Hourly } from "../../models/IHourlyWeather";

interface IWeatherRepository {
    getCurrentWeather: (lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) => Promise<AxiosResponse<Current>>;
    getForecasts: (lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) => Promise<AxiosResponse<IForecastResponse>>
}

interface IForecastResponse {
    daily: Daily[],
    hourly: Hourly[],
    lat: number;
    lon: number
    timezone: string
    timezone_offset: number
}

export default class WeatherRepository implements IWeatherRepository {
    private _apiKey: string

    constructor(key: string) {
        this._apiKey = key;
    }

    async getCurrentWeather(lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) {
        return await api.get<Current>(`weather?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=${measurementUnitSystem}`)
    }

    async getForecasts(lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) {
        return await api.get<IForecastResponse>(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&appid=${this._apiKey}&units=${measurementUnitSystem}`)
    }

}
