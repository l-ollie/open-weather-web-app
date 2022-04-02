import Header from './header/header';
import NavBarLink from '../models/navBarLink';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { setMeasurementUnit, setSelectedCity } from '../services/redux/actions';
import { fetchForecastsWeather, fetchCurrentWeather } from '../services/redux/actions';

import ICurrentWeather from '../models/ICurrentWeather';
import IFontColor from '../models/IWeatherColor';
import navBarLink from '../models/navBarLink';
import ISelectedCity from '../models/ISelectedCity';

const navLinks: Array<navBarLink> = [
	new NavBarLink('Current', '/'),
	new NavBarLink('Forecast', 'forecast'),
	new NavBarLink('5 Days', '5-days'),
	new NavBarLink('Pollution', 'pollution')
];

type IAppWrapper = {
	currentWeather: ICurrentWeather | null;
	setMeasurementUnit: (unite: string) => {};
	fetchForecastsWeather: (lat: number, lon: number, measurementUnit: string) => {}
	fetchCurrentWeather: (lat: number, lon: number, measurementUnit: string) => {}
	measurementUnit: string;
	fontColor: IFontColor;
	selectedCity: ISelectedCity;


};


function AppWrapper(props: IAppWrapper) {

	useEffect(() => {
		props.fetchCurrentWeather(props.selectedCity.lat, props.selectedCity.lon, props.measurementUnit);
		props.fetchForecastsWeather(props.selectedCity.lat, props.selectedCity.lon, props.measurementUnit);
	}, []);

	useEffect(
		() => {
			props.fetchCurrentWeather(props.selectedCity.lat, props.selectedCity.lon, props.measurementUnit);
			props.fetchForecastsWeather(props.selectedCity.lat, props.selectedCity.lon, props.measurementUnit);
		},
		[props.selectedCity.lat, props.selectedCity.lon, props.measurementUnit]
	);

	return (
		<div>
			<Header appNavlinks={navLinks} />
			<Outlet />
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		measurementUnit: state.measurementUnit,
		currentWeather: state.currentWeather,
		fontColor: state.fontColor,
		selectedCity: state.selectedCity
	};
};

export default connect(mapStateToProps, { setMeasurementUnit, fetchCurrentWeather, fetchForecastsWeather, setSelectedCity })(AppWrapper);
