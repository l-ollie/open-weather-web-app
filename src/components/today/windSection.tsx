import { Col, Container, Row } from 'react-bootstrap';
import windDirectBg from '../../assets/icons/Wind-dir-bg.svg'
import windDirectFg from '../../assets/icons/Wind-dir-fg.svg'

function WindSection(props: any) {
    const speedUnite = props.measurementUnit === "metric" ? "unite-mPerS" : "unite-mPerH";
    const windDeg = props.currentWeather?.current.wind.deg + 180;

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col className="">
                        <div className="d-flex flex-column">
                            <h5>Speed:</h5>
                            <h3 className={`${speedUnite}`}>
                                {props.currentWeather?.current.wind.speed}
                            </h3>
                        </div>
                    </Col>
                    <Col className="text-center">

                    </Col>
                    <Col className="">
                        <div className="d-flex flex-column">
                            <h5>Gust:</h5>
                            <h3 className={`${speedUnite}`}>
                                {props.currentWeather?.current.wind.gust}
                            </h3>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col className="overflow-hidden icon-centered wind-section-direction-bg" >
                            <img src={windDirectBg} className="wind-direction-image" alt="Compass" />
                            <img src={windDirectFg} className="wind-direction-image position-absolute" alt="Compass Pointer" style={{ transform: `rotate( ${windDeg}deg)` }} />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default WindSection;