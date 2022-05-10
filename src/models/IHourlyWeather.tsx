export default interface IHourlyWeather {
    hourly: Hourly[];
}

export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
    rain?: Rain;
    snow?: number;
}

export interface Rain {
    "1h": number;

}
export interface Weather {
    id: number;
    main: Main;
    description: Description;
    icon: Icon;
}

export enum Description {
    ClearSky = "clear sky",
    FewClouds = "few clouds",
}

export enum Icon {
    The01D = "01d",
    The01N = "01n",
    The02D = "02d",
}

export enum Main {
    Clear = "Clear",
    Clouds = "Clouds",
}
