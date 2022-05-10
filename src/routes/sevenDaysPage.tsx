import * as React from 'react';
import { connect } from 'react-redux'
import SevenDayCard from '../components/sevenDays/sevenDayCard';
import IDailyWeather from '../models/IDailyWeather';
import MeasurementUnit from '../models/MeasurementUnit';

export interface ISevenDaysProps {
    sevenDaysWeather: IDailyWeather;
    measurementUnit: MeasurementUnit;
}

function SevenDays(props: ISevenDaysProps) {
    let list: JSX.Element[] | null = null
    if (props.sevenDaysWeather !== null) {
        list = props.sevenDaysWeather.daily.map((element, index) => {
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
        <div className="full-detail-page">
            {list}
        </div>
    );
}

const mapState2Props = (state: any) => {
    return {
        sevenDaysWeather: state.sevenDaysWeather,
        measurementUnit: state.measurementUnit
    };
}

export default connect(mapState2Props)(SevenDays);
