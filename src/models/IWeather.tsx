import ICurrentWeather from "./ICurrentWeather";
import IDailyWeather from "./IDailyWeather";
import IHourlyWeather from "./IHourlyWeather";

export default interface IWeather {
    loading: boolean;
    currentWeather: ICurrentWeather;
    hourlyWeather: IHourlyWeather;
    dailyWeather: IDailyWeather;
    error: string;
}