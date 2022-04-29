import moment from 'moment';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDailyWeather } from '../../models/IDailyWeather';
import { Hourly, IHourlyWeather } from '../../models/IHourlyWeather';
import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortScale from '../../services/script/beaufortScale';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import HourlyWindChart from '../shared/hourlyWindChart';

interface IHourlyWindSection {
    hourlyWeather: IHourlyWeather;
    measurementUnit: MeasurementUnit;
    sevenDaysWeather: IDailyWeather
}

function HourlyWindSection(props: IHourlyWindSection) {
    const windSpeed = Math.floor(props.sevenDaysWeather.daily[1].wind_speed);
    const windDescription = new BeaufortScale(windSpeed, props.measurementUnit.system).description;
    const findStartingHour = props.hourlyWeather.hourly.findIndex((element, index) => {
        const time = moment(element.dt * 1000).format('HH');
        if (Number(time) === 7)
            return index;
        return 0
    });
    const forecast = props.hourlyWeather.hourly.slice(findStartingHour, findStartingHour + 24)
    const maximumWindSpeed = Math.max(...forecast.map((e: Hourly) => e.wind_speed));
    const minimumWindSpeed = Math.min(...forecast.map((e: Hourly) => e.wind_speed));
    const maximumWindSpeedConverted = props.measurementUnit.system === MeasurementUnitSystem.metric ? Math.round(maximumWindSpeed * (18 / 5)) : Math.round(maximumWindSpeed);
    const minimumWindSpeedConverted = props.measurementUnit.system === MeasurementUnitSystem.metric ? Math.round(minimumWindSpeed * (18 / 5)) : Math.round(minimumWindSpeed);

    return (
        <>
            <Container className="mt-4">
                <h5>Wind</h5>
            </Container>
            <Container className="d-flex mt-4 flex-row">
                <div className=" d-flex flex-column justify-content-between">
                    <span className="today-wind-desc optical-font-alignments mb-3" >{windDescription}</span>
                    <span className="meta-text optical-font-alignments">{minimumWindSpeedConverted}-{maximumWindSpeedConverted} {props.measurementUnit.speedUnit}</span>
                </div>
            </Container>

            <Container fluid className=" d-flex p-0 mt-4 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.hourlyWeather !== null ? <HourlyWindChart
                        data={props.hourlyWeather}
                        height={100}
                        itemWidth={50}
                        fontColor="dark"
                        showToday={false}
                        measurementUnit={props.measurementUnit} /> : null}
                </div>
            </Container>
        </>
    );

}

function mapStateToProps(state: any) {
    return {
        hourlyWeather: state.hourlyWeather,
        measurementUnit: state.measurementUnit,
        sevenDaysWeather: state.sevenDaysWeather
    };
}
export default connect(
    mapStateToProps,
)(HourlyWindSection);