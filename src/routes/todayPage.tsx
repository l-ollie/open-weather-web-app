import CurrentSection from '../components/today/currentSection';
import TodayWindSection from '../components/today/todayWindSection';
import { connect } from 'react-redux';
import MeasurementUnit from '../models/MeasurementUnit';
import RainSection from '../components/shared/rainSection';
import IWeather from '../models/IWeather';
import LoaderSpinner from '../components/shared/loaderSpinnerAndErrorMsg';

function TodayPage(props: IMapStateToProps) {
	return (
		<>
			{props.weather.dailyWeather !== null && props.weather.loading === false ?
				<>
					<CurrentSection />
					<TodayWindSection />
					<RainSection showToday={true} />
				</> :
				<LoaderSpinner />
			}
		</>
	);
}

interface IMapStateToProps {
	weather: IWeather;
	measurementUnit: MeasurementUnit;
};

const mapStateToProps = (state: IMapStateToProps) => {
	return {
		measurementUnit: state.measurementUnit,
		weather: state.weather,
	};
};

export default connect(mapStateToProps)(TodayPage);
