import moment from 'moment';
import { Hourly, IHourlyWeather } from '../../models/IHourlyWeather';


interface IHourlyWindChart {
    data: IHourlyWeather;
    height: number;
    itemWidth: number;
    fontColor: string;
    showAmountOfHours: number;
    startingHour: number;
    measurementUnit: string
}

function HourlyWindChart(props: IHourlyWindChart) {

    const findStartingHour = props.data?.hourly.findIndex((element, index) => {
        const time = moment(new Date(element.dt * 1000)).format('HH');
        if (Number(time) === props.startingHour)
            return index;
    });

    const forecast = props.data?.hourly.slice(findStartingHour, findStartingHour + props.showAmountOfHours)
    const maximumItems = forecast.length;
    const maximumYFromData = Math.max(...forecast.map((e: Hourly) => e.wind_speed));
    const minimumYFromData = Math.min(...forecast.map((e: Hourly) => e.wind_speed));
    const minMaxDifference = maximumYFromData - minimumYFromData;


    const infographicWidth = props.itemWidth * maximumItems;
    const infographicHeight = props.height;

    const fontSizeTime = 12;
    const fontSizeBar = 15;
    const fontHeight = fontSizeBar * 1.5;


    // const iconPadding = 10;
    const iconWidth = props.itemWidth;
    const iconHeight = props.itemWidth;
    const iconScale = 0.3;
    const iconMaxHeight = (props.itemWidth * 2 * iconScale) / Math.SQRT2;
    const iconBottomMargin = 10;

    const charBarSidePadding = 5;
    const charBarWidth = props.itemWidth - (charBarSidePadding * 2);
    const charBarBase = 10;
    const charBarNumberMargin = 5;
    const charBarMinHeight = 10;
    const charBarMaxHeight = infographicHeight - charBarBase - iconBottomMargin - charBarNumberMargin - charBarMinHeight - fontHeight - iconMaxHeight;
    const charBarSteps = charBarMaxHeight / minMaxDifference;

    const charBar = forecast.map((element: Hourly, index: number) => {
        const height = ((element.wind_speed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const x = index * props.itemWidth + charBarSidePadding;
        const y = (charBarMaxHeight - height) + iconBottomMargin + charBarNumberMargin + fontHeight + iconMaxHeight;
        return (
            <rect width={charBarWidth} height={height} x={x} y={y} fill="pink" />
        )
    })

    const charBarNum = forecast.map((element: Hourly, index: number) => {

        const windSpeedKilometerH = element.wind_speed * (18 / 5);
        const windSpeedMilesH = element.wind_speed * 2.236936;
        const windSpeed = props.measurementUnit === "metric" ? windSpeedKilometerH : windSpeedMilesH;

        const height = ((element.wind_speed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const x = index * props.itemWidth + (props.itemWidth * 0.5);
        const y = (charBarMaxHeight - height) + iconBottomMargin + fontHeight + iconMaxHeight;

        return (
            <text x={x} y={y} fill="black" textAnchor={'middle'}>
                {Math.round(windSpeed)}
            </text>
        )
    })

    const graphTime = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + props.itemWidth * 0.5;
        const y = infographicHeight;
        const forecastDate = moment(new Date(element.dt * 1000)).format('HH:mm');
        return (
            <text fontSize={fontSizeTime} x={x} y={y} key={index} textAnchor={'middle'}>
                {forecastDate}
            </text>
        );
    });

    const windDirection = forecast.map((element: Hourly, index: number) => {
        const x = ((index * props.itemWidth + (props.itemWidth * 0.5))) - (infographicWidth * 0.5);
        const y = -iconScale * iconHeight * 0.5;
        const deg = element.wind_deg + 180;

        return (
            <svg viewBox={`0 0 ${iconHeight} ${iconWidth}`} x={x} y={y} height={iconHeight}

            >

                <polygon points="25 0 50 50 25 34 0 50 25 0" fill="black"
                    transform={`
                     scale(${iconScale} ${iconScale})
                     rotate(${deg})`}
                    //  , ${iconHeight * 0.5}, ${iconHeight * 0.5}
                    transform-origin="50% 50%"
                />
            </svg >

        );
    });


    return (
        <svg className="m-auto" viewBox={`0 0 ${infographicWidth} ${props.height}`} height={props.height} width={infographicWidth} >
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="00%" stopColor={'#000'} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={'#000'} stopOpacity={0} />
                </linearGradient>
            </defs>
            {charBar}
            {graphTime}
            {charBarNum}
            {windDirection}
        </svg>

    );

}

export default HourlyWindChart;

