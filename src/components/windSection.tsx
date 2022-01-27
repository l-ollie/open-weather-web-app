import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsArrowUp } from 'react-icons/bs';

function WindSection(props: any) {
    const speedUnite = props.measurementUnit === "metric" ? "unite-mPerS" : "unite-mPerH";

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <span className={`${speedUnite}`}>
                            speed:{props.data?.wind.speed}
                        </span>
                    </Col>
                    <Col className="text-center">
                        North
                    </Col>
                    <Col>
                        <span className={`${speedUnite}`}>
                            Gust:{props.data?.wind.gust}
                        </span>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col className="overflow-hidden icon-centered" >
                            <BsArrowUp className="wind-section-direction  " style={{ transform: `rotate( ${props.data?.wind.deg}deg)` }} />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default WindSection;