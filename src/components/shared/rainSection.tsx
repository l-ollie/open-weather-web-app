
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDailyWeather } from '../../models/IDailyWeather';
import { IHourlyWeather } from '../../models/IHourlyWeather';
import IMeasurementUnit from '../../models/MeasurementUnit';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import HourlyRainChart from './hourlyRainChart';


interface props {
    hourlyWeather: IHourlyWeather;
    sevenDaysWeather: IDailyWeather;
    measurementUnit: IMeasurementUnit;
    showToday: boolean;
    timezone: string;
}
function mapStateToProps(state: any) {
    return {
        sevenDaysWeather: state.sevenDaysWeather,
        hourlyWeather: state.hourlyWeather,
        measurementUnit: state.measurementUnit,
        timezone: state.timezone,
    };
}

function RainSection(props: props) {
    const selectDay = props.showToday === true ? 0 : 1;
    const dailyVolume: number = props.sevenDaysWeather.daily[selectDay].rain === undefined ? 0 : props.sevenDaysWeather.daily[selectDay].rain;
    const convertedDailyVolume = () => props.measurementUnit.system === MeasurementUnitSystem.metric ? dailyVolume.toFixed(1) : (dailyVolume / 25.4).toFixed(2);
    const unitAcronym = props.measurementUnit.system === MeasurementUnitSystem.metric ? "mm" : "in."
    return (
        <>
            <Container className="mt-4">
                <h5>Precipitation</h5>
            </Container>

            <Container fluid className=" d-flex p-0 mb-4 mt-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.hourlyWeather !== null ? <HourlyRainChart
                        data={props.hourlyWeather}
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

export default connect(
    mapStateToProps,
)(RainSection); 