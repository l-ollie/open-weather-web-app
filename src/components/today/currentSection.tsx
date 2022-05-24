import { Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import '../../assets/css/shared.css'

import IWeatherColor from '../../models/IWeatherColor';
import { connect } from 'react-redux';
import MaxMin from '../shared/maxMin';
import MeasurementUnit from '../../models/MeasurementUnit';
import Capitalize from '../../services/script/capitalize';
import IWeather from '../../models/IWeather';
import { Current } from '../../models/ICurrentWeather';

interface CurrentSectionProps {
    measurementUnit: MeasurementUnit;
    weatherColors: IWeatherColor;
    weather: IWeather;
};

function CurrentSection(props: CurrentSectionProps) {
    const _weather: Current | null = props.weather.currentWeather;
    const dateToFormat = new Date();
    const temp: number = Math.round(_weather!.main.temp);
    const feelsLike: number = Math.round(_weather!.main.feels_like);
    const max: number = Math.round(props.weather.dailyWeather![0].temp.max);
    const min: number = Math.round(props.weather.dailyWeather![0].temp.min);
    const weatherIcon: string = `http://openweathermap.org/img/wn/${_weather!.weather[0].icon}.png`;
    const weatherDescription: string = new Capitalize(_weather!.weather[0].description).sentence;
    const gradientStep = 0.5;
    const backgroundGradient = `linear-gradient(rgba(${props.weatherColors.today.r}, ${props.weatherColors.today.g}, ${props.weatherColors.today.b},${gradientStep}),rgba(${props.weatherColors.today.r}, ${props.weatherColors.today.g}, ${props.weatherColors.today.b} ,255))`;

    return (
        <Container fluid
            style={{ backgroundImage: `${backgroundGradient}` }}
            className={`full-detail-page ${props.weatherColors.today.fontColor} `} >
            <Container className="mt-4">
                <Row>
                    <span className="CurrentSection_date fw-bold fs-5 "><Moment format="D MMMM HH:mm">{dateToFormat}</Moment></span>
                </Row>
                <Row>
                    <Col xs={6} className="pt-3  " >
                        <MaxMin min={min} max={max} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-column">
                        <span className={`CurrentSection_temp ${props.measurementUnit.cssUnit}`} >{temp}</span>
                        <span className={`${props.measurementUnit.cssUnit}`}>Feels like {feelsLike}</span>
                    </Col>
                    <Col className="icon-centered text-center d-flex flex-column ">
                        <img src={weatherIcon} alt="Weather icon" className="height-100" />
                        <span >{weatherDescription}</span>
                    </Col>
                </Row>
            </Container>
        </Container >
    );
}


const mapStateToProps = (state: any) => {
    return {
        weatherColors: state.weatherColors,
        sevenDaysWeather: state.sevenDaysWeather,
        measurementUnit: state.measurementUnit,
        weather: state.weather,
    };
};

export default connect(mapStateToProps)(CurrentSection);
