import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/today.css';
import '../../assets/css/shared.css';
import { IDailyWeather } from '../../models/IDailyWeather';
import { IHourlyWeather } from '../../models/IHourlyWeather';
import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortScale from '../../services/script/beaufortScale';
import HourlyWindChart from '../shared/hourlyWindChart';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
const Compass = require("cardinal-direction");

interface ITodayWindSection {
    hourlyWeather: IHourlyWeather;
    measurementUnit: MeasurementUnit;
    sevenDaysWeather: IDailyWeather;
    timezone: string;
}

function TodayWindSection(props: ITodayWindSection) {
    const windSpeed = Math.floor(props.measurementUnit.system === MeasurementUnitSystem.metric ? props.sevenDaysWeather.daily[0].wind_speed * (18 / 5) : props.sevenDaysWeather.daily[0].wind_speed);
    const beaufortScale = new BeaufortScale(props.sevenDaysWeather.daily[0].wind_speed, props.measurementUnit.system)
    const windDescription = beaufortScale.description;
    const deg = props.sevenDaysWeather.daily[0].wind_deg + 180;
    const windDirection = Compass.cardinalConverter(Compass.cardinalFromDegree(deg, Compass.CardinalSubset.Ordinal));

    const arrow = () => {
        return (
            <svg viewBox={`0 0 ${50} ${50}`} >
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
                    {props.hourlyWeather !== null ? <HourlyWindChart
                        data={props.hourlyWeather}
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

function mapStateToProps(state: any) {
    return {
        hourlyWeather: state.hourlyWeather,
        measurementUnit: state.measurementUnit,
        sevenDaysWeather: state.sevenDaysWeather,
        timezone: state.timezone,
    };
}
export default connect(
    mapStateToProps,
)(TodayWindSection);