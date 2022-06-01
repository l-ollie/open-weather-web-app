import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Hourly } from '../../models/IHourlyWeather';
import IMeasurementUnit from '../../models/MeasurementUnit';
import HourlyRainChart from '../shared/hourlyRainChart';


interface props extends IMapStateToProps {
    showToday: boolean;
}

function HourlyRainSection(props: props): JSX.Element {
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
                        timezone={props.timezone}
                        measurementUnit={props.measurementUnit} /> : null}
                </div>
            </Container>
        </>
    );

}

interface IMapStateToProps {
    hourlyWeather: Hourly[];
    measurementUnit: IMeasurementUnit;
    timezone: string;
}

const mapStateToProps = (state: IMapStateToProps) => {
    return {
        hourlyWeather: state.hourlyWeather,
        measurementUnit: state.measurementUnit,
        timezone: state.timezone,
    };
}

export default connect(
    mapStateToProps,
)(HourlyRainSection); 