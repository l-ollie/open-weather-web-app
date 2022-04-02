export interface IHourlyItem {
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
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export default IHourlyItem;
