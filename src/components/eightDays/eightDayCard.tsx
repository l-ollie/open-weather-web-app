import moment from 'moment-timezone';
import { useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import "../../assets/css/eightDays.css"
import "../../assets/css/shared.css"
import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortScale from '../../services/script/beaufortScale'
import Capitalize from '../../services/script/capitalize';
const Compass = require("cardinal-direction");

function mapStateToProps(state: IMapState) {
    return {
        timezone: state.timezone
    };
}

interface IMapState {
    timezone: string;
}

interface IProps extends IMapState {
    date: number;
    max: number;
    min: number;
    weatherDescription: string;
    icon: string;

    humidity: number;
    windSpeed: number;
    windDirection: number;
    changeOfRain: number;
    uvIndex: number;
    sunrise: number;
    sunset: number;
    measurementUnit: MeasurementUnit;
}
function EightDayCard(props: IProps): JSX.Element {
    const windDescription: string = new Capitalize(new BeaufortScale(props.windSpeed, props.measurementUnit.system).description).firstWord;
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const _date: string = moment(props.date * 1000).tz(props.timezone).format('dddd, D MMM');
    const _today: string = moment(new Date()).format('dddd, D MMM');
    const sunrise: string = moment(props.sunrise * 1000).tz(props.timezone).format('HH:mm');
    const sunset: string = moment(props.sunset * 1000).tz(props.timezone).format('HH:mm');
    const icon: string = `http://openweathermap.org/img/wn/${props.icon}.png`
    const windDirection: string = Compass.cardinalFromDegree(props.windDirection, Compass.CardinalSubset.Ordinal);
    const _changeOfRain: string | null = props.changeOfRain === 0 ? null : `${Math.round(props.changeOfRain * 10) * 10}%`;
    const _changeOfRainDetails: number = Math.round(props.changeOfRain * 10) * 10;
    const _weatherDescription: string = new Capitalize(props.weatherDescription).sentence;
    const fontWeight: string | null = showDetails === true ? "font-weight-500" : null;

    return (
        <div onClick={() => setShowDetails(!showDetails)}>
            <Container className="mt-3 mb-3" >
                <Row>
                    <Col xs={6} className="d-flex flex-column">
                        <ul>
                            <li className={`${fontWeight}`}>
                                {_date === _today ? "Today" : _date}
                            </li>
                            <li className="meta-text-color">
                                {_weatherDescription}
                            </li>
                        </ul>
                    </Col>
                    <Col className="d-flex flex-row justify-content-end">
                        <div className="d-flex flex-column justify-content-around">
                            <span className="droplet-volume droplet-blue-text">{_changeOfRain}</span>
                        </div>
                        <Image className="h-100 ms-2" alt="weather type icon" src={icon} />
                        <div className="d-flex flex-column ms-4">
                            <span className="text-end" >{Math.round(props.max)}&#176;</span>
                            <span className="meta-text-color text-end">{Math.round(props.min)}&#176;</span>
                        </div>
                    </Col>
                </Row>
            </Container >
            <Container className=" mt-2" style={{ display: `${showDetails === false ? "none" : ""}` }}>
                <Row>
                    <Col xs={5} className="meta-text-color">
                        <ul>
                            <li>Wind</li>
                            <li>Humidity</li>
                            <li>UV index</li>
                            <li>Change of rain</li>
                            <li>Sunrise/sunset</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li>{windDescription}, {Math.round(props.windSpeed)} {props.measurementUnit.speedUnit} {windDirection}  </li>
                            <li>{props.humidity}%</li>
                            <li>{props.uvIndex}</li>
                            <li>{_changeOfRainDetails}%</li>
                            <li>{sunrise}, {sunset}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <hr className="mt-3" />
        </div>
    );
}

export default connect(
    mapStateToProps,
)(EightDayCard);