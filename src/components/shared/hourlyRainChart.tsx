import moment from 'moment-timezone';
import { Hourly } from '../../models/IHourlyWeather';
import '../../assets/css/shared.css'
import IMeasurementUnit from '../../models/MeasurementUnit';
import { Container } from 'react-bootstrap';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';

interface IHourlyRainChart {
    data: Hourly[];
    itemWidth: number;
    fontColor: string;
    measurementUnit: IMeasurementUnit;
    showToday: boolean;
    timezone: string;
}

function HourlyRainChart(props: IHourlyRainChart): JSX.Element {
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
        const findStartingHour: number = props.data?.findIndex((element: Hourly, index: number) => {
            const time: string = moment(element.dt * 1000).tz(props.timezone).format('HH');
            if (Number(time) === 7)
                return index;
            return 0
        });
        forecast = props.data?.slice(findStartingHour, findStartingHour + 24)
    }

    const maximumItems: number = forecast.length;
    const itemWidth: number = 40;
    const charBarSidePadding: number = 15;

    const infographicWidth: number = maximumItems * (itemWidth + charBarSidePadding);
    const infographicHeight: number = 120;

    const fontSizeTime: number = 12;

    const iconWidth: number = itemWidth;
    const iconHeight: number = 61;

    const rainfallCategory: number[] = [0, 0.40, 2.5, 7.6, 100];
    const rainfallStep: number = 100 / rainfallCategory.length;

    const sideAxeMM = () => {
        const volumeY = infographicHeight - 53;
        return (
            <>
                <text fontSize={fontSizeTime} x={0} y={15} className="meta-text-color">
                    Change
                </text>
                <text fontSize={fontSizeTime} x={0} y={volumeY} className="meta-text-color" alignmentBaseline="middle" >
                    <tspan x="0" dy="1.2em" alignmentBaseline="middle" >
                        Volume
                    </tspan>
                    <tspan x="0" dy="1.2em" alignmentBaseline="middle">
                        (mm)
                    </tspan>
                </text>
            </>
        )
    }

    const sideAxeIN = () => {
        const volumeY: number = infographicHeight - 48;
        return (
            <>
                <text fontSize={fontSizeTime} x={0} y={15} className="meta-text-color">
                    Change
                </text>
                <text fontSize={fontSizeTime} x={0} y={volumeY} className="meta-text-color" alignmentBaseline="middle" >
                    <tspan x="0" dy="1.2em" alignmentBaseline="middle" >
                        Volume
                    </tspan>
                </text>
            </>
        )
    }

    const makeChart = forecast.map((element: Hourly, index: number) => {
        const x: number = index * (itemWidth + charBarSidePadding);
        const amountRainfall: number = element.rain?.["1h"] !== undefined ? element.rain?.["1h"] : 0;

        return (
            <svg x={x} y={0} height={infographicHeight} width={itemWidth} key={index}>
                {rainDroplet(amountRainfall)}
                {graphVolume(amountRainfall)}
                {graphTime(element.dt)}
                {graphPercentage(element.pop)}
            </svg>
        )
    });


    function rainDroplet(amountRainfall: number) {
        const iconStrokeWidth = 6;
        let rainfallBar = 0;
        const iconY = -infographicHeight * .5 + 39 * 0.5 + 25;

        for (let i = 0; i < rainfallCategory.length; i++) {
            if (amountRainfall <= rainfallCategory[i]) {
                rainfallBar = i * rainfallStep - 100;
                break;
            }
        }

        return (
            <svg viewBox="0 0 40 49 " width="30" x="5" y={iconY} >
                <mask id="dropletMask">
                    <path d="M40,28.74a19.94,19.94,0,0,0-5.33-13.6C31,11.2,20,0,20,0S9,11.2,5.33,15.14A20,20,0,1,0,40,28.74Z" fill="white" />
                </mask>
                <rect
                    className="rain-blue"
                    width={iconWidth}
                    height={iconHeight}
                    y={`${-rainfallBar}%`}
                    mask="url(#dropletMask)" />
                <path d="M40,28.74a19.94,19.94,0,0,0-5.33-13.6C31,11.2,20,0,20,0S9,11.2,5.33,15.14A20,20,0,1,0,40,28.74Z"
                    stroke="black"
                    fill="none"
                    strokeOpacity={0.15}
                    strokeWidth={iconStrokeWidth}
                    x="40"
                    mask="url(#dropletMask)"
                />
            </svg>
        );
    };

    function graphTime(time: number): React.SVGProps<SVGTextElement> {
        const x: number = itemWidth * 0.5;
        const y: number = infographicHeight - 1;
        const forecastDate: string = moment(time * 1000).tz(props.timezone).format('HH:mm');
        return (
            <text fontSize={fontSizeTime} x={x} y={y} textAnchor={'middle'} className="meta-text-color">
                {forecastDate}
            </text>
        );
    };

    function graphVolume(volume: number): React.SVGProps<SVGTextElement> {
        const _volume = () => {
            if (props.measurementUnit.system === MeasurementUnitSystem.metric)
                return volume.toFixed(1)
            else if (volume / 25.4 < 0.01 && volume / 25.4 > 0.001)
                return '<0.01"';
            else {
                console.log(Number((volume / 25.4).toFixed(2)));
                return (volume / 25.4).toFixed(2);
            }
        };


        const blue: string | null = volume !== 0.000 ? "droplet-blue-text" : null;
        const x: number = itemWidth * 0.5;
        const y: number = infographicHeight - 30;
        return (
            <text fontSize={fontSizeTime} x={x} y={y} textAnchor={'middle'} className={`${blue} meta-text-color droplet-volume `}>
                {_volume()}
            </text>
        );
    };

    function graphPercentage(percentage: number): React.SVGProps<SVGTextElement> {
        const fontSize: number = 15;
        const _percentage: number = Math.round(percentage * 10) * 10;
        const x: number = itemWidth * 0.5;
        const y: number = fontSize;
        return (
            <text fontSize={fontSize} x={x} y={y} textAnchor={'middle'} color="black" >
                {_percentage}%
            </text>
        );
    };

    return (
        <Container>
            <svg className="m-auto" viewBox={`0 0 ${infographicWidth + 70} ${infographicHeight}`} height={infographicHeight}  >
                <svg x={70}>
                    {makeChart}
                </svg>
                {props.measurementUnit.system === MeasurementUnitSystem.metric ? sideAxeMM() : sideAxeIN()}
            </svg>
        </Container>
    );

}

export default HourlyRainChart;

