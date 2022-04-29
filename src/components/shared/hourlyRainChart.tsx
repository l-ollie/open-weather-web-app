import moment from 'moment';
import { Hourly, IHourlyWeather } from '../../models/IHourlyWeather';
import BeaufortScale from '../../services/script/beaufortScale';
import '../../assets/css/shared.css'
import IMeasurementUnit from '../../models/MeasurementUnit';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import { Container } from 'react-bootstrap';

interface IHourlyRainChart {
    data: IHourlyWeather;
    height: number;
    itemWidth: number;
    fontColor: string;
    measurementUnit: IMeasurementUnit;
    showToday: boolean;
}

function HourlyRainChart(props: IHourlyRainChart) {
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
    const iconStrokeWidth = 8;
    const iconWidth = props.itemWidth;
    const iconY = 20;
    const iconHeight = 61;
    const iconScale = 0.6;
    const iconMaxHeight = (props.itemWidth * 2 * iconScale) / Math.SQRT2;
    const iconBottomMargin = 10;

    const charBarSidePadding = 5;
    const charBarWidth = props.itemWidth - (charBarSidePadding * 2);
    const charBarBase = 10;
    const charBarNumberMargin = 5;
    const charBarMinHeight = 10;
    const charBarMaxHeight = infographicHeight - charBarBase - iconBottomMargin - charBarNumberMargin - charBarMinHeight - fontHeight - iconMaxHeight;
    const charBarSteps = charBarMaxHeight / minMaxDifference;

    const volumeYPos = infographicHeight - 20;

    const rainfallCategory = [0, 0.40, 2.5, 7.6, 100];
    const rainfallStep = 100 / rainfallCategory.length;

    const rainDroplet = forecast.map((element: Hourly, index: number) => {
        const x = ((index * props.itemWidth));

        const amountRainfall: number = element.rain?.["1h"] !== undefined ? element.rain?.["1h"] : 0;
        let rainfallBar = 0;

        for (let i = 0; i < rainfallCategory.length; i++) {
            if (amountRainfall <= rainfallCategory[i]) {
                rainfallBar = i * rainfallStep - 100;
                break;
            }
        }


        return (
            <svg x={x} y={iconY} width={iconWidth} height={iconHeight} key={index} >
                <g transform={`scale(${iconScale} ${iconScale})`} transform-origin="50% 0%" >
                    <mask id="dropletMask">
                        <path d="M50,35.92a24.92,24.92,0,0,0-6.67-17C38.77,14,25,0,25,0S11.23,14,6.67,18.92A25,25,0,1,0,50,35.92Z" fill="white" />
                    </mask>
                    <rect
                        width={iconWidth}
                        height={iconHeight}
                        x={0}
                        y={`${-rainfallBar}%`}
                        fill="#0DE3FB"
                        mask="url(#dropletMask)" />

                    <path d="M50,35.92a24.92,24.92,0,0,0-6.67-17C38.77,14,25,0,25,0S11.23,14,6.67,18.92A25,25,0,1,0,50,35.92Z"
                        stroke="black"
                        fill="none"
                        stroke-opacity={0.2}
                        stroke-width={iconStrokeWidth}
                        mask="url(#dropletMask)" />
                </g>
            </svg>
        );
    });

    const graphTime = forecast.map((element: Hourly, index: number) => {
        const x = (index * props.itemWidth + props.itemWidth * 0.5);
        const y = infographicHeight;
        const forecastDate = moment(element.dt * 1000).format('HH:mm');
        return (
            <text fontSize={fontSizeTime} x={x} y={y} key={index} textAnchor={'middle'} className="meta-text">
                {forecastDate}
            </text>
        );
    });

    const graphVolume = forecast.map((element: Hourly, index: number) => {
        const x = (index * props.itemWidth + props.itemWidth * 0.5);
        const y = volumeYPos;
        const volume = element.rain !== undefined ? element.rain?.["1h"] : 0;
        return (
            <text fontSize={fontSizeTime} x={x} y={y} key={index} textAnchor={'middle'} className="meta-text">
                {volume}
            </text>
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
                {graphTime}
                {rainDroplet}
                {graphVolume}
            </svg>
        </Container>
    );

}

export default HourlyRainChart;

