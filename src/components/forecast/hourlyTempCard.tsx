import Moment from 'react-moment';
import { connect } from 'react-redux';
import IHourlyItem from '../../models/IHourlyItem';
import './hourly.scss';

interface IHourlyTempCard {
    item: IHourlyItem,
    measurementUnit: string

}


function HourlyTempCard(props: any) {
    const tempUnite: string = props.measurementUnit === "imperial" ? "unite-fahrenheit" : "unite-celsius";
    const temperature = Math.round(props.item.temp);
    const weatherIcon: string = `http://openweathermap.org/img/wn/${props.item.weather[0].icon}.png`;

    function clickHandler(e: any) {

        props.setSelectedCard(props.id);
        props.setSelectedInfo(props.item);
    }

    return (

        <div className={`hourly-card ${props.id === props.selectedCard ? "selected" : ""}`}
            onClick={clickHandler}
        >
            <img src={weatherIcon} alt="Weather icon" className="width-100" />
            <br />
            <span>{props.item.weather[0]?.main}</span>
            <br />
            <span className={`${tempUnite}`}>{temperature}</span>
            <br />
            <Moment format="HH:mm">{new Date(props.item.dt * 1000)}</Moment>
        </div>


    );

}
function mapStateToProps(state: any) {
    return {
        measurementUnit: state.measurementUnit
    };
}

export default connect(
    mapStateToProps,

)(HourlyTempCard);