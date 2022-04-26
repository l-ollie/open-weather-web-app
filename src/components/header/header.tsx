import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './navBar';
import SideMenu from './sideMenu';
import { connect } from 'react-redux';
import IWeatherColor from '../../models/IWeatherColor';
import ICurrentWeather from '../../models/ICurrentWeather';
import NavBarLink from '../../models/navBarLink';
import { useLocation } from 'react-router-dom';
import { IHourlyWeather } from '../../models/IHourlyWeather';

interface IHeader {
    currentWeather: ICurrentWeather,
    hourlyWeather: IHourlyWeather,
    weatherColorToday: IWeatherColor,
    weatherColorTomorrow: IWeatherColor,
    weatherColorFiveDays: IWeatherColor,
    appNavlinks: Array<NavBarLink>,
}


function Header(props: IHeader) {
    const [weatherColor, setWeatherColor] = useState(props.weatherColorToday);
    const location = useLocation();

    function changeHeaderColorOnURL() {
        if (location.pathname === "/")
            setWeatherColor(props.weatherColorToday);
        else if (location.pathname === "/tomorrow")
            setWeatherColor(props.weatherColorTomorrow);
        else if (location.pathname === "/fivedays")
            setWeatherColor(props.weatherColorFiveDays);
    }


    useEffect(() => {
        changeHeaderColorOnURL()
    }, [props.currentWeather, props.hourlyWeather, props.weatherColorFiveDays]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeHeaderColorOnURL()
    }, [location.pathname]);// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className={`header_container pt-3 sticky_nav ${weatherColor.fontColor}`} style={{ backgroundColor: `rgb(${weatherColor.r},${weatherColor.g},${weatherColor.b})` }}>
            <Container>
                <SideMenu />
            </Container>

            <div className=" d-flex justify-content justify-content-around ">
                <NavBar appNavlinks={props.appNavlinks} />
            </div>
        </div >
    );
}


const mapStateToProps = (state: any) => {
    return {
        currentWeather: state.currentWeather,
        weatherColorToday: state.weatherColorToday,
        weatherColorTomorrow: state.weatherColorTomorrow,
        weatherColorFiveDays: state.weatherColorFiveDays,
        hourlyWeather: state.hourlyWeather,
    };
};

export default connect(mapStateToProps)(Header);
