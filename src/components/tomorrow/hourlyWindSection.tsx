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
    const windSpeed = props.sevenDaysWeather.daily[0].wind_speed;
    const beaufortScale = new BeaufortScale(windSpeed, props.measurementUnit)
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
                    <i>arrow</i>
                    <span>km/h</span>
                </div>
            </Container>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.hourlyWeather !== null ? <HourlyWindChart
                        data={props.hourlyWeather}
                        height={100}
                        itemWidth={50}
                        fontColor="dark" showAmountOfHours={24}
                        startingHour={7}
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