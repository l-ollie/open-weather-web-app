
import { Row, Col, Container } from 'react-bootstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { IDailyWeather } from '../../models/IDailyWeather';
import MaxMin from '../shared/maxMin';
import '../../assets/css/shared.css';
interface ITomorrow {
    sevenDaysWeather: IDailyWeather;
}


function HourlyTomorrow(props: ITomorrow) {

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    let tomorrowMin, tomorrowMax: number = 0;
    let weatherIcon: string | undefined = undefined;
    let weatherDescription: string = "";

    if (props.sevenDaysWeather !== null) {
        tomorrowMin = props.sevenDaysWeather.daily[1].temp.min;
        tomorrowMax = props.sevenDaysWeather.daily[1].temp.max;
        weatherIcon = `http://openweathermap.org/img/wn/${props.sevenDaysWeather.daily[1].weather[0].icon}.png`;
        weatherDescription = props.sevenDaysWeather.daily[1].weather[0].description;
    }

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

function mapStateToProps(state: any) {
    return {
        sevenDaysWeather: state.sevenDaysWeather,
    };
}

export default connect(
    mapStateToProps,
)(HourlyTomorrow);