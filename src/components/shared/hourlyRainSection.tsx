import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IHourlyWeather } from '../../models/IHourlyWeather';
import IMeasurementUnit from '../../models/MeasurementUnit';
import HourlyRainChart from './hourlyRainChart';


interface props {
    hourlyWeather: IHourlyWeather;
    measurementUnit: IMeasurementUnit;
    showToday: boolean;
}
function mapStateToProps(state: any) {
    return {
        hourlyWeather: state.hourlyWeather,
        measurementUnit: state.measurementUnit,
    };
}

function HourlyRainSection(props: props) {
    return (
        <>
            <Container className="mt-4">
                <h5>Precipitation</h5>
            </Container>

            <Container fluid className=" d-flex mt-auto p-0 mb-4">
                <div className="scrolling-wrapper width-100vw d-grid"  >
                    {props.hourlyWeather !== null ? <HourlyRainChart
                        data={props.hourlyWeather}
                        height={100}
                        itemWidth={50}
                        fontColor="dark"
                        showToday={props.showToday}
                        measurementUnit={props.measurementUnit} /> : null}
                </div>
            </Container>
        </>
    );

}

export default connect(
    mapStateToProps,
)(HourlyRainSection); 