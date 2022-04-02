import React from 'react';
import CurrentSection from '../components/currentSection';
import WindSection from '../components/windSection';
import { connect } from 'react-redux';

import ICurrentWeather from '../models/ICurrentWeather';

class CurrentPage extends React.Component<CurrentPageProps> {


	render() {

		return (
			<div>
				<CurrentSection currentWeather={this.props.currentWeather} measurementUnit={this.props.measurementUnit} />
				<WindSection currentWeather={this.props.currentWeather} measurementUnit={this.props.measurementUnit} />
			</div>
		);
	}
}


type CurrentPageProps = {
	currentWeather: ICurrentWeather;
	measurementUnit: string;
};

const mapStateToProps = (state: CurrentPageProps) => {
	return {
		currentWeather: state.currentWeather,
		measurementUnit: state.measurementUnit
	};
};

export default connect(mapStateToProps)(CurrentPage);
