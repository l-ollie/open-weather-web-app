import { connect } from 'react-redux'
import SevenDayCard from '../components/sevenDays/sevenDayCard';
import LoaderSpinner from '../components/shared/loaderSpinner';
import IWeather from '../models/IWeather';
import MeasurementUnit from '../models/MeasurementUnit';

export interface ISevenDaysProps {
    weather: IWeather
    measurementUnit: MeasurementUnit;
}

function SevenDays(props: ISevenDaysProps) {
    let list: JSX.Element[] | null = null
    if (props.weather.dailyWeather !== null) {
        list = props.weather.dailyWeather.map((element, index) => {
            return (
                <SevenDayCard
                    key={index}
                    date={element.dt}
                    max={element.temp.max} min={element.temp.min}
                    weatherDescription={element.weather[0].description}
                    icon={element.weather[0].icon}
                    windSpeed={element.wind_speed}
                    windDirection={element.wind_deg}
                    humidity={element.humidity}
                    changeOfRain={element.pop}
                    uvIndex={element.uvi}
                    sunrise={element.sunrise}
                    sunset={element.sunset}
                    measurementUnit={props.measurementUnit} />
            )
        })
    }

    return (
        <>
            {props.weather.dailyWeather !== null && props.weather.loading === false ?
                <div className="full-detail-page">
                    {list}
                </div>
                :
                <LoaderSpinner />
            }
        </>



    );
}

const mapState2Props = (state: any) => {
    return {
        weather: state.weather,
        measurementUnit: state.measurementUnit
    };
}

export default connect(mapState2Props)(SevenDays);
