import api from "./api";


// api.openweathermap.org/data/2.5/weather?q={cityName}&appid={API key}&units={metric}

// http://api.openweathermap.org/data/2.5/weather?q=/leiden&appid=a2ed31ee07568e51c5901c4ea33082df&units=metric

// http://api.openweathermap.org/data/2.5/weather?q=Leiden&appid=a2ed31ee07568e51c5901c4ea33082df&units=metric

export default class WeatherRepository {
    private _apiKey: string

    constructor(key: string) {
        this._apiKey = key;
    }

    async getCurrentWeather(cityName: string = "Leiden", measurementUnit: string = "metric") {
        return await api.get(`weather?q=${cityName}&appid=${this._apiKey}&units=${measurementUnit}`)
    }


}
