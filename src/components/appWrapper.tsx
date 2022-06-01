import Header from './header/header';
import NavBarLink from '../models/navBarLink';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchWeather, generateBackgroundColor } from '../services/redux/actions';

import MeasurementUnitSystem from '../types/MeasurementUnitSystem';
import IFontColor from '../models/IWeatherColor';
import navBarLink from '../models/navBarLink';
import ISelectedCity from '../models/ISelectedCity';
import IMeasurementUnit from '../models/MeasurementUnit';
import IWeather from '../models/IWeather';

const navLinks: Array<navBarLink> = [
	new NavBarLink('Today', '/'),
	new NavBarLink('Tomorrow', 'tomorrow'),
	new NavBarLink('8 Days', 'eightdays')
];


function AppWrapper(props: IMapStateToProps) {
	useEffect(
		() => {
			props.fetchWeather(props.selectedCity.lat, props.selectedCity.lon, props.measurementUnit.system);
		},
		[props.selectedCity, props.measurementUnit]// eslint-disable-line react-hooks/exhaustive-deps
	);

	return (
		<div>
			<Header appNavlinks={navLinks} />
			<Outlet />
		</div>
	);
}

interface IMapStateToProps {
	weather: IWeather;
	generateBackgroundColor: (weather: IWeather, measurementUnitSystem: MeasurementUnitSystem) => void;
	fetchWeather: (lat?: any, lon?: any, measurementUnitSystem?: any) => void;
	measurementUnit: IMeasurementUnit;
	fontColor: IFontColor;
	selectedCity: ISelectedCity;
};

const mapStateToProps = (state: IMapStateToProps) => {
	return {
		measurementUnit: state.measurementUnit,
		weather: state.weather,
		fontColor: state.fontColor,
		selectedCity: state.selectedCity
	};
};

export default connect(mapStateToProps, { fetchWeather, generateBackgroundColor })(AppWrapper);
