import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import getTempColorForLeds from './tempToColor';

function CurrentSection(props: any) {



    const dateToFormat = new Date();
    const temp = Math.round(props.data?.main.temp);
    const feelsLike = Math.round(props.data?.main.feels_like);
    const max = Math.round(props.data?.main.temp_max);
    const min = Math.round(props.data?.main.temp_min);
    const weatherIcon = `http://openweathermap.org/img/wn/${props.data?.weather[0].icon}.png`;
    const gradientStep = 0.5;
    const tempToColor = getTempColorForLeds(props.data?.main.feels_like);
    const backgroundGradient = `linear-gradient(rgba(${tempToColor.r}, ${tempToColor.g}, ${tempToColor.b},${gradientStep}),rgba(${tempToColor.r}, ${tempToColor.g}, ${tempToColor.b} ,255))`;
    const tempUnite = props.measurementUnit === "metric" ? "unite-celsius" : "unite-fahrenheit";

    useEffect(() => {
        // console.log(backgroundGradient);
    }, []);

    return (
        <Container fluid
            // style={{ backgroundColor: `rgb(${tempToColor.r},${tempToColor.g},${tempToColor.b})` }}
            style={{ backgroundImage: `${backgroundGradient}` }}
            className="current-section_wrapper" >
            <Container>
                <Row>
                    <Col xs={6} className="pt-3  d-flex justify-content-between" >
                        <div>
                            <span className={`${tempUnite}`}>max {max}</span><BsArrowUp />
                        </div>
                        <div>
                            <span className={`${tempUnite}`}>min {min}</span><BsArrowDown />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <span className="CurrentSection_date fw-bold fs-5 mt-2"><Moment format="D MMMM HH:mm">{dateToFormat}</Moment></span>
                </Row>
                <Row>
                    <Col className="">
                        <span className={`CurrentSection_temp ${tempUnite}`} >{temp}</span>
                    </Col>
                    <Col className="icon-centered">
                        <img src={weatherIcon} alt="Weather icon" className="width-100" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span className={`${tempUnite}`}>Feels like {feelsLike}</span>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
        </Container >
    );
}

export default CurrentSection;