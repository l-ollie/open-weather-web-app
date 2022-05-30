import { Row, Col, Container } from 'react-bootstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import MaxMin from '../shared/maxMin';
import '../../assets/css/shared.css';
import Capitalize from '../../services/script/capitalize';
import IWeather from '../../models/IWeather';

function HourlyTomorrow(props: IMapStateToProps) {
    const tomorrowDate: number = new Date().setDate(new Date().getDate() + 1);
    const tomorrowMin: number = props.weather.dailyWeather![1].temp.min;
    const tomorrowMax: number = props.weather.dailyWeather![1].temp.max;
    const weatherIcon: string = `http://openweathermap.org/img/wn/${props.weather.dailyWeather![1].weather[0].icon}.png`;
    const weatherDescription: string = new Capitalize(props.weather.dailyWeather![1].weather[0].description).sentence;

    return (
        <Container >
            <Row>
                <Col>
                    <Col >
                        <span className="CurrentSection_date fw-bold fs-6 mt-3"> <Moment format="D MMMM YYYY">{tomorrowDate}</Moment></span>
                    </Col>
                    <Col xs={12} className="d-flex align-items-end">
                        <MaxMin
                            min={tomorrowMin}
                            max={tomorrowMax} />
                    </Col>
                    <Col xs={12} >
                        <h3>{weatherDescription}</h3>
                    </Col>
                </Col>
                <Col xs={4} className="icon-centered text-center d-flex flex-column ">
                    <img src={weatherIcon} alt="Weather icon" className="height-100" />
                </Col>
            </Row>
        </Container>
    );
}

interface IMapStateToProps {
    weather: IWeather;
}

function mapStateToProps(state: IMapStateToProps) {
    return {
        weather: state.weather
    };
}

export default connect(
    mapStateToProps,
)(HourlyTomorrow);