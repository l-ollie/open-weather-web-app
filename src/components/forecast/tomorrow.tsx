
import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { IDailyWeather } from '../../models/IDailyWeather';
import MaxMin from '../shared/maxMin';

interface ITomorrow {
    fiveDaysWeather: IDailyWeather
}


function Tomorrow(props: ITomorrow) {

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    let tomorrowMin, tomorrowMax: number = 0;
    let weatherIcon: string | undefined = undefined;
    let weatherDescription: string = "";

    if (props.fiveDaysWeather !== null) {
        tomorrowMin = props.fiveDaysWeather.daily[1].temp.min;
        tomorrowMax = props.fiveDaysWeather.daily[1].temp.max;
        weatherIcon = `http://openweathermap.org/img/wn/${props.fiveDaysWeather.daily[1].weather[0].icon}.png`;
        weatherDescription = props.fiveDaysWeather.daily[1].weather[0].description;
    }

    return (
        <Container className="" >
            <Row>
                <Col>
                    <Col className="mt-3">
                        <span className="CurrentSection_date fw-bold fs-6 mt-3"> <Moment format="D MMMM YYYY">{tomorrowDate}</Moment></span>
                    </Col>
                    <Col xs={12} className="d-flex align-items-end">
                        <MaxMin
                            min={tomorrowMax}
                            max={tomorrowMin}
                        />

                    </Col>
                    <Col xs={12} >
                        <h3>{weatherDescription}</h3>
                    </Col>
                </Col>
                <Col xs={4} className="icon-centered text-center d-flex flex-column ">
                    <img src={weatherIcon} alt="Weather icon" className="width-100" />
                </Col>
            </Row>
        </Container>
    );
}

function mapStateToProps(state: any) {
    return {
        fiveDaysWeather: state.fiveDaysWeather
    };
}

export default connect(
    mapStateToProps,
)(Tomorrow);