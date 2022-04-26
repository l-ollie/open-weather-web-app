import { Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import { IHourlyWeather } from '../../models/IHourlyWeather';
import '../../assets/css/hourly.css';
import Tomorrow from './tomorrow';
import HourlyTempChart from './hourlyTempChart';
import IWeatherColor from '../../models/IWeatherColor';



export interface IHourlyProps {
    hourlyWeather: IHourlyWeather;
    weatherColorTomorrow: IWeatherColor;

}

function Hourly(props: IHourlyProps) {
    // let twentyFourHourForecast = [];

    // let humidity, uvI = 0;

    const gradientStep = 0.5;
    const backgroundGradient = `linear-gradient(rgba(${props.weatherColorTomorrow.r}, ${props.weatherColorTomorrow.g}, ${props.weatherColorTomorrow.b},${gradientStep}),rgba(${props.weatherColorTomorrow.r}, ${props.weatherColorTomorrow.g}, ${props.weatherColorTomorrow.b} ,255))`;


    return (
        <Container fluid style={{ backgroundImage: `${backgroundGradient}` }} className="full-detail-page d-flex flex-column" >
            <div className="mt-4">
                <Tomorrow />
            </div>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.hourlyWeather !== null ? <HourlyTempChart data={props.hourlyWeather} showUnitHour={24} itemWidth={50} fontColor={props.weatherColorTomorrow.fontColor} height={200} /> : null}
                </div>
            </Container>
        </Container>

    );
}


const mapState2Props = (state: any) => {
    return {
        hourlyWeather: state.hourlyWeather,
        forecast: state.forecast,
        weatherColorTomorrow: state.weatherColorTomorrow

    };
}

export default connect(mapState2Props)(Hourly);
