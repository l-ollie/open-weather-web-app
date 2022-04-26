import React from 'react';
import CurrentSection from '../components/today/currentSection';
import WindSection from '../components/today/windSection';
import { connect } from 'react-redux';
import ICurrentWeather from '../models/ICurrentWeather';

type CurrentPageProps = {
	currentWeather: ICurrentWeather;
	measurementUnit: string;
};

class TodayPage extends React.Component<CurrentPageProps> {


	render() {

		return (
			<div>
				<CurrentSection currentWeather={this.props.currentWeather} measurementUnit={this.props.measurementUnit} />
				<WindSection currentWeather={this.props.currentWeather} measurementUnit={this.props.measurementUnit} />
			</div>
		);
	}
}

const mapStateToProps = (state: CurrentPageProps) => {
	return {
		currentWeather: state.currentWeather,
		measurementUnit: state.measurementUnit
	};
};

export default connect(mapStateToProps)(TodayPage);
