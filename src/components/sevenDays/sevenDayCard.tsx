import moment from 'moment-timezone';
import { Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

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

    windDescription: string;
    windSpeed: number;
    windDirection: number;
    uvIndex: number;
    sunrise: number;
    sunset: number;
    showDetails: boolean;
}
function SevenDayCard(props: IProps) {
    let showDetails = false;
    const _date = moment(props.date * 1000).tz(props.timezone).format('dddd, D MMM');
    const _today = moment(new Date()).format('dddd, D MMM');
    return (
        <>
            <Container onClick={() => showDetails = !showDetails}>
                <Col xs={6}>
                    <div className="d-flex flex-column">
                        {_date === _today ? "Today" : _date}
                    </div>
                </Col>
            </Container>
            <hr />
        </>
    );
}

export default connect(
    mapStateToProps,
)(SevenDayCard);