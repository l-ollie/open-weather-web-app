import { Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import { IHourlyWeather } from '../../models/IHourlyWeather';
import '../../assets/css/hourly.css';
import HourlyTomorrow from './hourlyTomorrow';
import HourlyTempChart from './hourlyTempChart';
import IWeatherColors from '../../models/IWeatherColor';

export interface IHourlyProps {
    hourlyWeather: IHourlyWeather;
    weatherColors: IWeatherColors;
}

function Hourly(props: IHourlyProps) {
    const gradientStep = 0.5;
    const backgroundGradient = `linear-gradient(rgba(${props.weatherColors.tomorrow.r}, ${props.weatherColors.tomorrow.g}, ${props.weatherColors.tomorrow.b},${gradientStep}),rgba(${props.weatherColors.tomorrow.r}, ${props.weatherColors.tomorrow.g}, ${props.weatherColors.tomorrow.b} ,255))`;

    return (
        <Container fluid style={{ backgroundImage: `${backgroundGradient}` }} className="full-detail-page d-flex flex-column" >
            <div className="mt-4">
                <HourlyTomorrow />
            </div>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.hourlyWeather !== null ? <HourlyTempChart data={props.hourlyWeather} itemWidth={50} fontColor={props.weatherColors.tomorrow.fontColor} height={200} /> : null}
                </div>
            </Container>
        </Container>
    );
}

const mapState2Props = (state: any) => {
    return {
        hourlyWeather: state.hourlyWeather,
        forecast: state.forecast,
        weatherColors: state.weatherColors
    };
}

export default connect(mapState2Props)(Hourly);
