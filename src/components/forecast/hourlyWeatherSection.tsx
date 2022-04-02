import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux'
import { IHourlyWeather } from '../../models/IHourlyWeather';
import HourlyTempCard from './hourlyTempCard';
import './hourly.scss';
import Tomorrow from './tomorrow';
import { useEffect, useState } from 'react';
import IHourlyItem from '../../models/IHourlyItem';
import Moment from 'react-moment';

export interface IHourlyProps {
    hourlyWeather: IHourlyWeather;
}

function Hourly(props: IHourlyProps) {
    let hourlyTemp = null;
    const [selectedCard, setSelectedCard] = useState(0);
    const [selectedInfo, setSelectedInfo] = useState<any | null>(null);
    let humidity, uvI = 0;
    useEffect(() => {
        setSelectedInfo(props.hourlyWeather.hourly[0]);
    }, [props.hourlyWeather])

    if (props.hourlyWeather !== null) {
        hourlyTemp = props.hourlyWeather.hourly?.map((item: any, index: number) => {
            return (
                <HourlyTempCard
                    item={item}
                    key={index}
                    id={index}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    setSelectedInfo={setSelectedInfo} />
            )
        });
    }


    // const hourlyTemp = 
    return (
        <Container fluid className="full-detail-page d-flex flex-column" >

            <Tomorrow />

            <Container className="mt-auto" >
                <Row>
                    <h6>Details</h6>
                </Row>
                <Row>
                    <Col >
                        <small>Humidity </small> {selectedInfo !== null ? selectedInfo.humidity : 0}%
                        <br />
                        <small>UV index </small> {selectedInfo !== null ? selectedInfo.uvi : 0}
                        <br />
                        <small>Sunrise/sunset</small>  <Moment format="HH:MM">{selectedInfo?.sunrise}</Moment> - <Moment format="HH:MM">{selectedInfo?.sunset}</Moment>
                    </Col>
                </Row>
            </Container>

            <Container fluid className=" d-flex mt-auto p-0">
                <div className="scrolling-wrapper-flexbox width-100vw">
                    {hourlyTemp}
                </div>
            </Container>
        </Container>

    );
}


const mapState2Props = (state: any) => {
    return {
        hourlyWeather: state.hourlyWeather,
        forecast: state.forecast

    };
}

export default connect(mapState2Props)(Hourly);
