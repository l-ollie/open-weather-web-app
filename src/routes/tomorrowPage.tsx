import * as React from 'react';
import { connect } from 'react-redux'
import HourlyWeatherSection from '../components/tomorrow/hourlyWeatherSection';
import HourlyWindSection from '../components/tomorrow/hourlyWindSection';
import { IHourlyWeather } from '../models/IHourlyWeather';

export interface ITomorrowPageProps {
    // hourly: IHourlyWeather;
    // measurementUnit: string
    sevenDaysWeather: any
}

function TomorrowPage(props: ITomorrowPageProps) {
    return (
        <div>
            {props.sevenDaysWeather !== null ? <HourlyWeatherSection /> : null}
            {props.sevenDaysWeather !== null ? <HourlyWindSection /> : null}
        </div>
    );
}

const mapState2Props = (state: any) => {
    return {
        measurementUnit: state.measurementUnit,
        sevenDaysWeather: state.sevenDaysWeather
    };
}

export default connect(mapState2Props)(TomorrowPage);
