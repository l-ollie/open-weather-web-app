import { Hourly } from '../../models/IHourlyWeather';
import moment from 'moment-timezone';

interface IHourlyTempChart {
    data: Hourly[];
    height: number;
    itemWidth: number;
    fontColor: string;
    timezone: string;
}

function HourlyTempChart(props: IHourlyTempChart): JSX.Element {

    const findEightHourStart: number = props.data?.findIndex((element: Hourly) => {
        const time = moment(element.dt * 1000).tz(props.timezone).format('HH');
        if (Number(time) === 7)
            return true
        return false;
    });

    const STROKE: number = 1;
    const forecast: Hourly[] = props.data?.slice(findEightHourStart, findEightHourStart + 24)

    const maximumItems: number = forecast.length;
    const maximumYFromData: number = Math.max(...forecast.map((e: Hourly) => e.temp));
    const minimumYFromData: number = Math.min(...forecast.map((e: Hourly) => e.temp));

    const chartWidth: number = props.itemWidth * maximumItems;
    const chartHeight: number = props.height;

    const FONT_SIZE: number = 12;
    const fontMargin: number = FONT_SIZE * 1.2;
    const heightPadding: number = FONT_SIZE * 0.8;
    const gradientColor: string = props.fontColor === 'light' ? '#fff' : '#000';

    const iconYPos: number = 65;
    const iconOffset: number = chartHeight - iconYPos;
    const iconPadding: number = 5;
    const iconWidth: number = props.itemWidth - iconPadding * 2;
    const iconHeight: number = props.itemWidth - iconPadding * 2;

    const lineHeight: number = chartHeight - 20;
    const lineGraphBottomMargin: number = 20;
    const minMaxDifference: number = maximumYFromData - minimumYFromData;
    const lineGraphHeight: number = chartHeight - (heightPadding + fontMargin + iconYPos + lineGraphBottomMargin);
    const lineGraphSteps: number = lineGraphHeight / minMaxDifference

    const lineCharOffsetYLeft: number = chartHeight - ((forecast[0]?.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin;
    const lineCharOffsetYRight: number = chartHeight - ((forecast[forecast.length - 1]?.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin;

    const points: string[] = forecast.map((element: Hourly, index: number) => {
        const x = index * props.itemWidth + props.itemWidth / 2;
        const y = chartHeight - ((element.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin;
        return `${x},${y}`;
    });
    points.unshift(`0,${lineCharOffsetYLeft}`);
    points.push(`${chartWidth},${lineCharOffsetYRight} ${chartWidth},${chartHeight}  0,${chartHeight}`);
    const graph: string = points.join(' ');

    const accentuatedLine: string[] = forecast.map((element: Hourly, index: number) => {
        const x: number = index * props.itemWidth + props.itemWidth / 2;
        const y: number = chartHeight - ((element.temp - minimumYFromData) * lineGraphSteps) + heightPadding - iconYPos - lineGraphBottomMargin + (STROKE / 2);
        return `${x},${y}`;
    });
    accentuatedLine.unshift(`0,${lineCharOffsetYLeft + (STROKE / 2)}`);
    accentuatedLine.push(`${chartWidth},${lineCharOffsetYRight + (STROKE / 2)}`);
    const graphAccentuatedLine: string = accentuatedLine.join(' ');

    const addInfo: JSX.Element[] = forecast.map((element: Hourly, index: number) => {
        return (
            <svg key={index}>
                {graphTemperatureNum(element.temp, index)};
                {graphIcon(element.weather[0].icon, index)}
                {graphTime(element.dt, index)}
            </svg>
        )
    });

    function graphTemperatureNum(temp: number, index: number): JSX.Element {
        const x = index * props.itemWidth + props.itemWidth / 2;
        const y = chartHeight - ((temp - minimumYFromData) * lineGraphSteps) + heightPadding - fontMargin - iconYPos - lineGraphBottomMargin;
        return (
            <text fontSize={FONT_SIZE} fill={gradientColor} x={x} y={y} textAnchor={'middle'}>
                {Math.round(temp)}&#176;
            </text>
        );
    };

    function graphIcon(icon: string, index: number): JSX.Element {
        const x: number = index * props.itemWidth + iconPadding;
        const y: number = iconOffset;
        const _icon: string = `http://openweathermap.org/img/wn/${icon}.png`
        return (
            <image href={_icon} x={x} y={y} width={iconWidth} height={iconHeight} />
        );
    };

    function graphTime(time: number, index: number): JSX.Element {
        const x: number = index * props.itemWidth + props.itemWidth / 2;
        const y: number = chartHeight - 1;
        const forecastDate: string = moment(time * 1000).tz(props.timezone).format('HH:mm');
        return (
            <text fontSize={FONT_SIZE} fill={gradientColor} x={x} y={y} textAnchor={'middle'}>
                {forecastDate}
            </text>
        );
    };

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
            {addInfo}
        </svg>
    );
};

export default HourlyTempChart;
