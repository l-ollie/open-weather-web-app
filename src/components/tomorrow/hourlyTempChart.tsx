
import { Hourly, IHourlyWeather } from '../../models/IHourlyWeather';
import moment from 'moment';

const STROKE = 1;

interface IHourlyTempChart {
    data: IHourlyWeather;
    height: number;
    itemWidth: number;
    fontColor: string;
    showUnitHour: number;
}

function HourlyTempChart(props: IHourlyTempChart) {

    const findSevenHourStart = props.data?.hourly.findIndex((element, index) => {
        const time = moment(new Date(element.dt * 1000)).format('HH');
        if (Number(time) === 7)
            return index;
    });

    const forecast = props.data?.hourly.slice(findSevenHourStart, findSevenHourStart + props.showUnitHour)

    const maximumItems = forecast.length;
    const maximumYFromData = Math.max(...forecast.map((e: Hourly) => e.temp));
    const minimumYFromData = Math.min(...forecast.map((e: Hourly) => e.temp));

    const chartWidth = props.itemWidth * maximumItems;
    const chartHeight = props.height;

    const FONT_SIZE = 12;
    const fontMargin = FONT_SIZE * 1.2;
    const heightPadding = FONT_SIZE * 0.8;
    const gradientColor = props.fontColor === 'light' ? '#fff' : '#000';

    const iconYPos = 65;
    const iconOffset = chartHeight - iconYPos;
    const iconPadding = 5;
    const iconWidth = props.itemWidth - iconPadding * 2;
    const iconHeight = props.itemWidth - iconPadding * 2;


    const lineHeight = chartHeight - 20;
    const lineGraphBottomMargin = 20;
    const minMaxDifference = maximumYFromData - minimumYFromData;
    const lineGraphHeight = chartHeight - (heightPadding + fontMargin + iconYPos + lineGraphBottomMargin);
    const lineGraphSteps = lineGraphHeight / minMaxDifference


    const lineCharOffsetYLeft = chartHeight - ((forecast[0]?.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin;
    const lineCharOffsetYRight = chartHeight - ((forecast[forecast.length - 1]?.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin;

    const points = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + props.itemWidth / 2;
        const y = chartHeight - ((element.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin;
        return `${x},${y}`;
    });
    points.unshift(`0,${lineCharOffsetYLeft}`);
    points.push(`${chartWidth},${lineCharOffsetYRight} ${chartWidth},${chartHeight}  0,${chartHeight}`);
    const graph = points.join(' ');

    const accentuatedLine = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + props.itemWidth / 2;
        const y = chartHeight - ((element.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin + (STROKE / 2);
        return `${x},${y}`;
    });
    accentuatedLine.unshift(`0,${lineCharOffsetYLeft + (STROKE / 2)}`);
    accentuatedLine.push(`${chartWidth},${lineCharOffsetYRight + (STROKE / 2)}`);
    const graphAccentuatedLine = accentuatedLine.join(' ');

    const graphTemperatureNum = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + props.itemWidth / 2;

        const y = chartHeight - ((element.temp - minimumYFromData) * lineGraphSteps) + heightPadding - fontMargin - iconYPos - lineGraphBottomMargin;
        return (
            <text fontSize={FONT_SIZE} fill={gradientColor} x={x} y={y} key={index} textAnchor={'middle'}>
                {Math.round(element.temp)}°
            </text>
        );
    });

    const graphIcon = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + iconPadding;
        const y = iconOffset;
        const icon = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`
        return (
            <image href={icon} x={x} y={y} key={index} width={iconWidth} height={iconHeight} />
        );
    });

    const graphTime = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + props.itemWidth / 2;
        const y = chartHeight;
        const forecastDate = moment(new Date(element.dt * 1000)).format('HH:mm');
        return (
            <text fontSize={FONT_SIZE} fill={gradientColor} x={x} y={y} key={index} textAnchor={'middle'}>
                {forecastDate}
            </text>
        );
    });

    return (
        <svg className="m-auto" viewBox={`0 0 ${chartWidth} ${props.height}`} height={props.height} >
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="00%" stopColor={gradientColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={gradientColor} stopOpacity={0} />
                </linearGradient>

            </defs>
            <polygon fill="url(#linear)" points={graph} />
            <polyline fill="none" strokeWidth={STROKE} stroke={gradientColor} strokeOpacity={0.1} points={graphAccentuatedLine} />
            <line x1="0" y1={lineHeight} x2={chartWidth} y2={lineHeight} stroke={gradientColor} strokeOpacity={0.2} strokeWidth={STROKE} />
            {graphIcon}
            {graphTemperatureNum}
            {graphTime}
        </svg>
    );
};


export default HourlyTempChart;