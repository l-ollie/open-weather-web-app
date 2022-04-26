import * as React from 'react';
import { connect } from 'react-redux'
import HourlyWeatherSection from '../components/tomorrow/hourlyWeatherSection';
import HourlyWindSection from '../components/tomorrow/hourlyWindSection';
import { IHourlyWeather } from '../models/IHourlyWeather';

export interface IForeCastPageProps {
    // hourly: IHourlyWeather;
    // measurementUnit: string
}

class ForeCastPage extends React.Component<IForeCastPageProps> {
    public render() {
        return (
            <div>
                <HourlyWeatherSection />
                <HourlyWindSection />
            </div>
        );
    }
}

const mapState2Props = (state: any) => {
    return {
        forecast: state.forecast,
        measurementUnit: state.measurementUnit
    };
}

export default connect(mapState2Props)(ForeCastPage);
