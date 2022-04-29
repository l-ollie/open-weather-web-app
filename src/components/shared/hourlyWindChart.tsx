import moment from 'moment';
import { Hourly, IHourlyWeather } from '../../models/IHourlyWeather';
import BeaufortScale from '../../services/script/beaufortScale';
import '../../assets/css/shared.css'
import IMeasurementUnit from '../../models/MeasurementUnit';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import { Container } from 'react-bootstrap';

interface IHourlyWindChart {
    data: IHourlyWeather;
    height: number;
    itemWidth: number;
    fontColor: string;
    measurementUnit: IMeasurementUnit;
    showToday: boolean;
}

function HourlyWindChart(props: IHourlyWindChart) {

    let forecast;

    if (props.showToday) {
        const findEndingHour = props.data?.hourly.findIndex((element, index) => {
            const time = moment(element.dt * 1000).format('HH');
            if (Number(time) === 7)
                return index;
            return 0
        });
        forecast = props.data?.hourly.slice(0, findEndingHour)
    } else {
        const findStartingHour = props.data?.hourly.findIndex((element, index) => {
            const time = moment(element.dt * 1000).format('HH');
            if (Number(time) === 7)
                return index;
            return 0
        });
        forecast = props.data?.hourly.slice(findStartingHour, findStartingHour + 24)
    }


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
        const x = index * props.itemWidth + charBarSidePadding - charBarSidePadding;
        const y = (charBarMaxHeight - height) + iconBottomMargin + charBarNumberMargin + fontHeight + iconMaxHeight;
        const beaufortScale = new BeaufortScale(element.wind_speed, props.measurementUnit.system)
        return (
            <rect width={charBarWidth} height={height} x={x} y={y} key={index} fill={`${beaufortScale.color}`} />
        )
    })

    const charBarNum = forecast.map((element: Hourly, index: number) => {

        const windSpeedKilometerH = element.wind_speed * (18 / 5);
        const windSpeedMilesH = element.wind_speed * 2.236936;
        const windSpeed = props.measurementUnit.system === MeasurementUnitSystem.metric ? windSpeedKilometerH : windSpeedMilesH;

        const height = ((element.wind_speed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const x = index * props.itemWidth + (props.itemWidth * 0.5) - charBarSidePadding;
        const y = (charBarMaxHeight - height) + iconBottomMargin + fontHeight + iconMaxHeight;

        return (
            <text x={x} y={y} key={index} fill="black" textAnchor={'middle'}>
                {Math.round(windSpeed)}
            </text>
        )
    })

    const graphTime = forecast.map((element: Hourly, index: number) => {
        const x = (index * props.itemWidth + props.itemWidth * 0.5) - charBarSidePadding;
        const y = infographicHeight;
        const forecastDate = moment(element.dt * 1000).format('HH:mm');
        return (
            <text fontSize={fontSizeTime} x={x} y={y} key={index} textAnchor={'middle'} className="meta-text">
                {forecastDate}
            </text>
        );
    });

    const windDirection = forecast.map((element: Hourly, index: number) => {
        const x = ((index * props.itemWidth + (props.itemWidth * 0.5))) - (infographicWidth * 0.5) - charBarSidePadding;
        const y = -iconScale * iconHeight * 0.5;
        const deg = element.wind_deg + 180;

        return (
            <svg viewBox={`0 0 ${iconHeight} ${iconWidth}`} x={x} y={y} key={index} height={iconHeight}>
                <polygon points="25 0 50 50 25 34 0 50 25 0" fill="gray" className="arrow-color"
                    transform={`
                     scale(${iconScale} ${iconScale})
                     rotate(${deg})`}
                    transform-origin="50% 50%" />
            </svg >

        );
    });


    return (
        <Container>
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
        </Container>
    );

}

export default HourlyWindChart;

