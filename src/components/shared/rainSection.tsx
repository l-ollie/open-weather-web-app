
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import IWeather from '../../models/IWeather';
import IMeasurementUnit from '../../models/MeasurementUnit';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import HourlyRainChart from './hourlyRainChart';


interface IProps extends IMapStateToProps {
    showToday: boolean;
}

function RainSection(props: IProps): JSX.Element {
    const selectDay: number = props.showToday === true ? 0 : 1;
    const dailyVolume: number = props.weather.dailyWeather![selectDay].rain === undefined ? 0 : props.weather.dailyWeather![selectDay].rain;
    const convertedDailyVolume = () => {
        const _amount: number = props.measurementUnit.system === MeasurementUnitSystem.metric ? Number(dailyVolume.toFixed(1)) : Number((dailyVolume / 25.4).toFixed(2))
        const roundUp: number = _amount === 0.0 || 0.00 ? 0 : _amount;
        return roundUp;
    };
    const unitAcronym: string = props.measurementUnit.system === MeasurementUnitSystem.metric ? "mm" : "in."
    return (
        <>
            <Container className="mt-4">
                <h5>Precipitation</h5>
            </Container>

            <Container fluid className=" d-flex p-0 mb-4 mt-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.weather.hourlyWeather !== null ? <HourlyRainChart
                        data={props.weather.hourlyWeather}
                        itemWidth={50}
                        fontColor="dark"
                        showToday={props.showToday}
                        measurementUnit={props.measurementUnit}
                        timezone={props.timezone} /> : null}
                </div>
            </Container>
            <Container >
                <span className="meta-text-color">Total daily volume</span> {convertedDailyVolume()} {unitAcronym}
            </Container>
        </>
    );

}

interface IMapStateToProps {
    weather: IWeather;
    measurementUnit: IMeasurementUnit;
    timezone: string;
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
)(RainSection); 