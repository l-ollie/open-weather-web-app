import MeasurementUnitSystem from "../../types/MeasurementUnitSystem";
import api from "./api";

import { AxiosResponse } from 'axios'
// api.openweathermap.org/data/2.5/weather?q={cityName}&appid={API key}&units={metric}

// http://api.openweathermap.org/data/2.5/weather?q=/leiden&appid=a2ed31ee07568e51c5901c4ea33082df&units=metric

// http://api.openweathermap.org/data/2.5/weather?q=Leiden&appid=a2ed31ee07568e51c5901c4ea33082df&units=metric
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=a2ed31ee07568e51c5901c4ea33082df

export interface IWeatherRepository {
    getCurrentWeather: (lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) => Promise<AxiosResponse<any, any>>;
    getForecasts: (lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) => Promise<AxiosResponse<any, any>>
}

export default class WeatherRepository implements IWeatherRepository {
    private _apiKey: string

    constructor(key: string) {
        this._apiKey = key;
    }

    async getCurrentWeather(lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) {
        return await api.get(`weather?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=${measurementUnitSystem}`)
    }

    async getForecasts(lat: number, lon: number, measurementUnitSystem: MeasurementUnitSystem) {
        return await api.get(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&appid=${this._apiKey}&units=${measurementUnitSystem}`)
    }

}
