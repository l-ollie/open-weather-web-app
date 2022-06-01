import moment from 'moment-timezone';
import { Hourly } from '../../models/IHourlyWeather';
import BeaufortScale from '../../services/script/beaufortScale';
import '../../assets/css/shared.css'
import IMeasurementUnit from '../../models/MeasurementUnit';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import { Container } from 'react-bootstrap';

interface IHourlyWindChart {
    data: Hourly[];
    height: number;
    fontColor: string;
    measurementUnit: IMeasurementUnit;
    showToday: boolean;
    timezone: string;
}

function HourlyWindChart(props: IHourlyWindChart): JSX.Element {

    let forecast: Hourly[];

    if (props.showToday) {
        const findEndingHour = props.data?.findIndex((element: Hourly, index: number) => {
            const time: string = moment(element.dt * 1000).tz(props.timezone).format('HH');
            if (Number(time) === 7)
                return index;
            return 0
        });
        forecast = props.data?.slice(0, findEndingHour)
    } else {
        const findStartingHour = props.data?.findIndex((element, index) => {
            const time: string = moment(element.dt * 1000).tz(props.timezone).format('HH');
            if (Number(time) === 7)
                return index;
            return 0
        });
        forecast = props.data?.slice(findStartingHour, findStartingHour + 24)
    }


    const maximumItems: number = forecast.length;
    const maximumYFromData: number = Math.max(...forecast.map((e: Hourly) => e.wind_speed));
    const minimumYFromData: number = Math.min(...forecast.map((e: Hourly) => e.wind_speed));
    const minMaxDifference: number = maximumYFromData - minimumYFromData;

    const charBarSidePadding: number = 15;
    const itemWidth: number = 40;

    const infographicWidth: number = (itemWidth + charBarSidePadding) * maximumItems;
    const infographicHeight: number = props.height;

    const fontSizeTime: number = 12;
    const fontSizeBar: number = 15;
    const fontHeight: number = fontSizeBar * 1.5;

    const iconHeight: number = itemWidth;
    const iconScale: number = 0.4;
    const iconMaxHeight: number = (itemWidth * 2 * iconScale) / Math.SQRT2;
    const iconBottomMargin: number = 5;

    const charBarBase: number = 10;
    const charBarNumberMargin: number = 5;
    const charBarMinHeight: number = 10;
    const charBarMaxHeight: number = infographicHeight - charBarBase - iconBottomMargin - charBarNumberMargin - charBarMinHeight - fontHeight - iconMaxHeight;
    const charBarSteps: number = charBarMaxHeight / minMaxDifference;


    const makeChart: JSX.Element[] = forecast.map((element: Hourly, index: number) => {
        const x: number = index * (itemWidth + charBarSidePadding);

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
        const height: number = ((windSpeed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const y: number = (charBarMaxHeight - height) + iconBottomMargin + charBarNumberMargin + fontHeight + iconMaxHeight;
        const beaufortScale: BeaufortScale = new BeaufortScale(windSpeed, props.measurementUnit.system);

        return (
            <rect width={itemWidth} height={height} x="0" y={y} fill={`${beaufortScale.color}`} />
        )
    };

    function charBarNum(windSpeed: number) {
        const windSpeedKilometerH: number = windSpeed * (18 / 5);
        const _windSpeed: number = props.measurementUnit.system === MeasurementUnitSystem.metric ? windSpeedKilometerH : windSpeed;
        const height: number = ((windSpeed - minimumYFromData) * charBarSteps) + charBarMinHeight;
        const x: number = itemWidth * 0.5;
        const y: number = (charBarMaxHeight - height) + iconBottomMargin + fontHeight + iconMaxHeight;

        return (
            <text x={x} y={y} fill="black" textAnchor={'middle'}>
                {Math.round(_windSpeed)}
            </text>
        )
    };

    function graphTime(time: number) {
        const x: number = itemWidth * 0.5;
        const y: number = infographicHeight - 1;
        const forecastDate: string = moment(time * 1000).tz(props.timezone).format('HH:mm');
        return (
            <text fontSize={fontSizeTime} x={x} y={y} textAnchor={'middle'} className="meta-text-color">
                {forecastDate}
            </text>
        );
    };

    function windDirection(windDeg: number) {
        const y: number = -iconScale * iconHeight * 0.5;
        const deg: number = windDeg + 180;

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

