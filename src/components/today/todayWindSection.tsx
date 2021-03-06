import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/today.css';
import '../../assets/css/shared.css';
import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortScale from '../../services/script/beaufortScale';
import HourlyWindChart from '../shared/hourlyWindChart';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import IWeather from '../../models/IWeather';
import Capitalize from '../../services/script/capitalize';
const Compass = require("cardinal-direction");

function TodayWindSection(props: IMapStateToProps): JSX.Element {
    const windSpeed: number = Math.floor(props.measurementUnit.system === MeasurementUnitSystem.metric ? props.weather.dailyWeather![0].wind_speed * (18 / 5) : props.weather.dailyWeather![0].wind_speed);
    const beaufortScale: BeaufortScale = new BeaufortScale(props.weather.dailyWeather![0].wind_speed, props.measurementUnit.system)
    const windDescription: string = new Capitalize(beaufortScale.description).firstWord;
    const deg: number = props.weather.dailyWeather![0].wind_deg + 180;
    const windDirection: string = Compass.cardinalConverter(Compass.cardinalFromDegree(deg - 180, Compass.CardinalSubset.Ordinal));

    const arrow = () => {
        return (
            <svg viewBox={`0 0 ${50} ${50}`} height="36px" >
                <polygon points="25 0 50 50 25 34 0 50 25 0" fill="gray" className="arrow-color"
                    transform={`
                        scale(${0.45} ${0.45})
                        rotate(${deg})`}
                    transform-origin="50% 50%" />
            </svg >
        )
    }

    return (
        <>
            <Container className="mt-4">
                <h5>Wind</h5>
            </Container>
            <Container className="d-flex mt-4 mb-4 ">
                <div className="" style={{ color: `${beaufortScale.color}` }}>
                    <h1 className='today-wind-speed optical-font-alignments mb-0'>{windSpeed}</h1>
                </div>
                <div className="ms-2 d-flex flex-column justify-content-between">
                    {arrow()}
                    <span className="meta-text-color optical-font-alignments">{props.measurementUnit.speedUnit}</span>
                </div>
                <div className="ms-4 d-flex flex-column justify-content-between">
                    <span className="today-wind-desc optical-font-alignments" >{windDescription}</span>
                    <span className="meta-text-color optical-font-alignments">Now from {windDirection}</span>
                </div>
            </Container>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.weather.hourlyWeather !== null ? <HourlyWindChart
                        data={props.weather.hourlyWeather}
                        height={100}
                        fontColor="dark"
                        showToday={true}
                        timezone={props.timezone}
                        measurementUnit={props.measurementUnit} /> : null}
                </div>
            </Container>
            <hr />
        </>
    );
}

interface IMapStateToProps {
    measurementUnit: MeasurementUnit;
    timezone: string;
    weather: IWeather
}

const mapStateToProps = (state: IMapStateToProps) => {
    return {
        weather: state.weather,
        measurementUnit: state.measurementUnit,
        timezone: state.timezone,
    };
}
export default connect(
    mapStateToProps,
)(TodayWindSection);