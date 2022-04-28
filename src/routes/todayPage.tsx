import CurrentSection from '../components/today/currentSection';
import TodayWindSection from '../components/today/todayWindSection';
import { connect } from 'react-redux';
import ICurrentWeather from '../models/ICurrentWeather';
import { IDailyWeather } from '../models/IDailyWeather';
import MeasurementUnit from '../models/MeasurementUnit';

type CurrentPageProps = {
	currentWeather: ICurrentWeather;
	measurementUnit: MeasurementUnit;
	sevenDaysWeather: IDailyWeather;
};

function TodayPage(props: CurrentPageProps) {
	return (
		<div>
			{props.sevenDaysWeather !== null ? <CurrentSection currentWeather={props.currentWeather} measurementUnit={props.measurementUnit} /> : null}
			{props.sevenDaysWeather !== null ? <TodayWindSection /> : null}
		</div>
	);
}

const mapStateToProps = (state: CurrentPageProps) => {
	return {
		currentWeather: state.currentWeather,
		measurementUnit: state.measurementUnit,
		sevenDaysWeather: state.sevenDaysWeather
	};
};

export default connect(mapStateToProps)(TodayPage);
