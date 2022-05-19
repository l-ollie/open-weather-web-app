import ICurrentWeather, { Current } from "./ICurrentWeather";
import { Daily } from "./IDailyWeather";
import IHourlyWeather, { Hourly } from "./IHourlyWeather";

export default interface IWeather {
    loading: boolean;
    currentWeather: Current;
    hourlyWeather: Hourly[];
    dailyWeather: Daily[];
    error: string;
}