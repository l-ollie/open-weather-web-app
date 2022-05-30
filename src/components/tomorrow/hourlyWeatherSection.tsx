import { Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import '../../assets/css/hourly.css';
import HourlyTomorrow from './hourlyTomorrow';
import HourlyTempChart from './hourlyTempChart';
import IWeatherColors from '../../models/IWeatherColor';
import IWeather from '../../models/IWeather';

function Hourly(props: IMapStateToProps) {
    const gradientStep = 0.5;
    const backgroundGradient = `linear-gradient(rgba(${props.weatherColors.tomorrow.r}, ${props.weatherColors.tomorrow.g}, ${props.weatherColors.tomorrow.b},${gradientStep}),rgba(${props.weatherColors.tomorrow.r}, ${props.weatherColors.tomorrow.g}, ${props.weatherColors.tomorrow.b} ,255))`;

    return (
        <Container fluid style={{ backgroundImage: `${backgroundGradient}` }} className="full-detail-page d-flex flex-column" >
            <div className="mt-4">
                <HourlyTomorrow />
            </div>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.weather.hourlyWeather !== null ? <HourlyTempChart timezone={props.timezone} data={props.weather.hourlyWeather} itemWidth={50} fontColor={props.weatherColors.tomorrow.fontColor} height={200} /> : null}
                </div>
            </Container>
        </Container>
    );
}

export interface IMapStateToProps {
    weather: IWeather
    weatherColors: IWeatherColors;
    timezone: string;
}

const mapStateToProps = (state: IMapStateToProps) => {
    return {
        weather: state.weather,
        weatherColors: state.weatherColors,
        timezone: state.timezone,
    };
}

export default connect(mapStateToProps)(Hourly);
