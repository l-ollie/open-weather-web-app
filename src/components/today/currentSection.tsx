import { Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

import ICurrentWeather, { Current } from '../../models/ICurrentWeather';
import IWeatherColor from '../../models/IWeatherColor';
import { connect } from 'react-redux';
import MaxMin from '../shared/maxMin';

interface CurrentSectionProps {
    currentWeather: ICurrentWeather;
    measurementUnit: string;
    weatherColorToday: IWeatherColor;
};

function CurrentSection(props: CurrentSectionProps) {

    const _weather: Current = props.currentWeather?.current;
    const _measurementUnit = props.measurementUnit;

    const dateToFormat = new Date();
    const temp: number = Math.round(_weather?.main.temp);
    const feelsLike: number = Math.round(_weather?.main.feels_like);
    const max: number = Math.round(_weather?.main.temp_max);
    const min: number = Math.round(_weather?.main.temp_min);
    const weatherIcon: string = `http://openweathermap.org/img/wn/${_weather?.weather[0].icon}.png`;
    const weatherDescription: string = _weather?.weather[0].description;
    const gradientStep = 0.5;
    const backgroundGradient = `linear-gradient(rgba(${props.weatherColorToday.r}, ${props.weatherColorToday.g}, ${props.weatherColorToday.b},${gradientStep}),rgba(${props.weatherColorToday.r}, ${props.weatherColorToday.g}, ${props.weatherColorToday.b} ,255))`;
    const tempUnite: string = _measurementUnit === "imperial" ? "unite-fahrenheit" : "unite-celsius";

    return (
        <Container fluid
            style={{ backgroundImage: `${backgroundGradient}` }}
            className={`full-detail-page ${props.weatherColorToday.fontColor} `} >
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
                    <Col className="">
                        <span className={`CurrentSection_temp ${tempUnite}`} >{temp}</span>
                    </Col>
                    <Col className="icon-centered text-center d-flex flex-column ">
                        <img src={weatherIcon} alt="Weather icon" className="width-100" />
                        <span >{weatherDescription}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span className={`${tempUnite}`}>Feels like {feelsLike}</span>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
        </Container >
    );
}


const mapStateToProps = (state: any) => {
    return {
        weatherColorToday: state.weatherColorToday
    };
};

export default connect(mapStateToProps)(CurrentSection);
