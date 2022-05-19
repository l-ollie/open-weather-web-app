import { connect } from 'react-redux'
import LoaderSpinner from '../components/shared/loaderSpinner';
import RainSection from '../components/shared/rainSection';
import HourlyWeatherSection from '../components/tomorrow/hourlyWeatherSection';
import HourlyWindSection from '../components/tomorrow/hourlyWindSection';
import IWeather from '../models/IWeather';

export interface IPros {
    weather: IWeather;
}

function TomorrowPage(props: IPros) {
    return (
        <>
            {
                props.weather.dailyWeather !== null && props.weather.loading === false ?
                    <>
                        <HourlyWeatherSection />
                        <HourlyWindSection />
                        <RainSection showToday={false} />
                    </> :
                    <LoaderSpinner />
            }
        </>
    );
}

const mapState2Props = (state: any) => {
    return {
        measurementUnit: state.measurementUnit,
        weather: state.weather
    };
}

export default connect(mapState2Props)(TomorrowPage);
