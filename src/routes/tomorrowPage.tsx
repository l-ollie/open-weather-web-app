import { connect } from 'react-redux'
import LoaderSpinner from '../components/shared/loaderSpinnerAndErrorMsg';
import RainSection from '../components/shared/rainSection';
import HourlyWeatherSection from '../components/tomorrow/hourlyWeatherSection';
import HourlyWindSection from '../components/tomorrow/hourlyWindSection';
import IWeather from '../models/IWeather';

function TomorrowPage(props: IMapStateToProps): JSX.Element {
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

interface IMapStateToProps {
    weather: IWeather;
}

const mapStateToProps = (state: IMapStateToProps) => {
    return {
        weather: state.weather
    };
}

export default connect(mapStateToProps)(TomorrowPage);
