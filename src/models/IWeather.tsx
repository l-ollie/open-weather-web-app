import { Current } from "./ICurrentWeather";
import { Daily } from "./IDailyWeather";
import { Hourly } from "./IHourlyWeather";

export default interface IWeather {
    loading: boolean;
    currentWeather: Current | null;
    hourlyWeather: Hourly[] | null;
    dailyWeather: Daily[] | null;
    error: IError | null;
}

interface IError {
    message: string;
    name: string;
    stack: string;
}