export interface IWeatherColor {
    r: number;
    g: number;
    b: number;
    fontColor: string;
}


export default interface IWeatherColors {
    today: IWeatherColor;
    tomorrow: IWeatherColor;
    sevenDays: IWeatherColor;
}