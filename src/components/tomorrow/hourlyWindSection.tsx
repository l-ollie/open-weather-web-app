import moment from 'moment-timezone';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Hourly } from '../../models/IHourlyWeather';
import IWeather from '../../models/IWeather';
import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortScale from '../../services/script/beaufortScale';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import HourlyWindChart from '../shared/hourlyWindChart';

interface IHourlyWindSection {
    measurementUnit: MeasurementUnit;
    weather: IWeather
    timezone: string;
}

function HourlyWindSection(props: IHourlyWindSection) {
    const windSpeed = Math.floor(props.weather.dailyWeather![1].wind_speed);
    const windDescription = new BeaufortScale(windSpeed, props.measurementUnit.system).description;
    const findStartingHour = props.weather.hourlyWeather!.findIndex((element, index) => {
        const time = moment(element.dt * 1000).tz(props.timezone).format('HH');
        if (Number(time) === 7)
            return index;
        return 0
    });
    const forecast = props.weather.hourlyWeather!.slice(findStartingHour, findStartingHour + 24)
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
                    <span className="meta-text-color optical-font-alignments">{minimumWindSpeedConverted}-{maximumWindSpeedConverted} {props.measurementUnit.speedUnit}</span>
                </div>
            </Container>

            <Container fluid className=" d-flex p-0 mt-4 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.weather.hourlyWeather !== null ? <HourlyWindChart
                        data={props.weather.hourlyWeather}
                        height={100}
                        fontColor="dark"
                        showToday={false}
                        timezone={props.timezone}
                        measurementUnit={props.measurementUnit} /> : null}
                </div>
            </Container>
            <hr />
        </>
    );

}

function mapStateToProps(state: any) {
    return {
        weather: state.weather,
        measurementUnit: state.measurementUnit,
        timezone: state.timezone
    };
}
export default connect(
    mapStateToProps,
)(HourlyWindSection);