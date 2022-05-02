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

    const charBarSidePadding = 15;
    const itemWidth = 40;

    const infographicWidth = (itemWidth + charBarSidePadding) * maximumItems;
    const infographicHeight = props.height;

    const fontSizeTime = 12;
    const fontSizeBar = 15;
    const fontHeight = fontSizeBar * 1.5;

    const iconHeight = itemWidth;
    const iconScale = 0.4;
    const iconMaxHeight = (itemWidth * 2 * iconScale) / Math.SQRT2;
    const iconBottomMargin = 5;

    const charBarBase = 10;
    const charBarNumberMargin = 5;
    const charBarMinHeight = 10;
    const charBarMaxHeight = infographicHeight - charBarBase - iconBottomMargin - charBarNumberMargin - charBarMinHeight - fontHeight - iconMaxHeight;
    const charBarSteps = charBarMaxHeight / minMaxDifference;


    const makeChart = forecast.map((element: Hourly, index: number) => {
        const x = index * (itemWidth + charBarSidePadding);

        return (
            <svg x={x} y={0} height={props.height} width={itemWidth} key={index}>
                {charBar(element.wind_speed)}
                {charBarNum(element.wind_speed)}
                {graphTime(element.dt)}
                {windDirection(element.wind_deg)}
            </svg>
        )
    })


    function charBar(windSpeed: number): React.SVGProps<SVGRectElement> {
        const height = ((windSpeed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const y = (charBarMaxHeight - height) + iconBottomMargin + charBarNumberMargin + fontHeight + iconMaxHeight;
        const beaufortScale = new BeaufortScale(windSpeed, props.measurementUnit.system);

        return (
            <rect width={itemWidth} height={height} x="0" y={y} fill={`${beaufortScale.color}`} />
        )
    };

    function charBarNum(windSpeed: number) {
        const windSpeedKilometerH = windSpeed * (18 / 5);
        const _windSpeed = props.measurementUnit.system === MeasurementUnitSystem.metric ? windSpeedKilometerH : windSpeed;
        const height = ((windSpeed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const x = itemWidth * 0.5;
        const y = (charBarMaxHeight - height) + iconBottomMargin + fontHeight + iconMaxHeight;

        return (
            <text x={x} y={y} fill="black" textAnchor={'middle'}>
                {Math.round(_windSpeed)}
            </text>
        )
    };

    function graphTime(time: number) {
        const x = itemWidth * 0.5;
        const y = infographicHeight;
        const forecastDate = moment(time * 1000).format('HH:mm');
        return (
            <text fontSize={fontSizeTime} x={x} y={y} textAnchor={'middle'} className="meta-text-color">
                {forecastDate}
            </text>
        );
    };

    function windDirection(windDeg: number) {
        const y = -iconScale * iconHeight * 0.5;
        const deg = windDeg + 180;

        return (
            <svg viewBox={`0 0 50 50`} x="0" y={y} height={iconHeight}>
                <polygon points="25 0 50 50 25 34 0 50 25 0" fill="gray" className="arrow-color"
                    transform={`
                     scale(${iconScale})
                     rotate(${deg})`}
                    transform-origin="50% 50%" />
            </svg >
        );
    };

    return (
        <Container>
            <svg className="m-auto" viewBox={`0 0 ${infographicWidth} ${props.height}`} height={props.height}  >
                {makeChart}
            </svg>
        </Container>
    );

}

export default HourlyWindChart;

