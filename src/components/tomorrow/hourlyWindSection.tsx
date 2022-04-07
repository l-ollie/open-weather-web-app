import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IHourlyWeather } from '../../models/IHourlyWeather';
import HourlyWindChart from '../shared/hourlyWindChart';
var beaufort = require('beaufort-scale')

interface IHourlyWindSection {
    hourlyWeather: IHourlyWeather
    measurementUnit: string
}


function HourlyWindSection(props: IHourlyWindSection) {

    const beaufortScale = beaufort(40)

    return (
        <Container fluid className=" d-flex mt-4 flex-column" >
            <Container className="mt-4">
                <h5>Wind</h5>
            </Container>
            <Container className="d-flex mt-4 flex-row">
                <div className="">
                    <h1>42</h1>
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
                        measurementUnit={props.measurementUnit}
                    /> : null}
                </div>
            </Container>
        </Container>
    );

}

function mapStateToProps(state: any) {
    return {
        hourlyWeather: state.hourlyWeather,
        measurementUnit: state.measurementUnit,
        dailyWeather: state.dailyWeather
    };
}
export default connect(
    mapStateToProps,
)(HourlyWindSection);