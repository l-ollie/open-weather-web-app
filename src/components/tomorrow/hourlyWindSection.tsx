import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDailyWeather } from '../../models/IDailyWeather';
import { IHourlyWeather } from '../../models/IHourlyWeather';
import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortScale from '../../services/script/beaufortScale';
import HourlyWindChart from '../shared/hourlyWindChart';

interface IHourlyWindSection {
    hourlyWeather: IHourlyWeather;
    measurementUnit: MeasurementUnit;
    sevenDaysWeather: IDailyWeather
}

function HourlyWindSection(props: IHourlyWindSection) {
    const windSpeed = Math.floor(props.sevenDaysWeather.daily[0].wind_speed);
    const beaufortScale = new BeaufortScale(windSpeed, props.measurementUnit.system)
    const deg = props.sevenDaysWeather.daily[0].wind_deg + 180;

    const arrow = () => {
        return (
            <svg viewBox={`0 0 ${50} ${50}`} >
                <polygon points="25 0 50 50 25 34 0 50 25 0" fill="gray" className="arrow-color"
                    transform={`
                        scale(${0.4} ${0.4})
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
            <Container className="d-flex mt-4 flex-row">
                <div className="" style={{ color: `${beaufortScale.color}` }}>
                    <h1>{windSpeed}</h1>
                </div>
                <div className="d-flex flex-column">
                    {arrow()}
                    <span>km/h</span>
                </div>
            </Container>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
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