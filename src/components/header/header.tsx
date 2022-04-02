import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './navBar';
import SideMenu from './sideMenu';
import { connect } from 'react-redux';
import IWeatherColor from '../../models/IWeatherColor';
import ICurrentWeather from '../../models/ICurrentWeather';
import NavBarLink from '../../models/navBarLink';
// import ISelectedCity from '../../models/ISelectedCity';

interface IHeader {
    currentWeather: ICurrentWeather,
    weatherColor: IWeatherColor,
    // selectedCity: ISelectedCity,
    // setSelectedCity: (city: ISelectedCity) => void,
    // setSelectedNav: (nav: string) => void,
    appNavlinks: Array<NavBarLink>
}


function Header(props: IHeader) {

    useEffect(() => {
    }, [props.currentWeather?.current.main.feels_like]);

    return (
        <div className={`header_container pt-3 sticky_nav ${props.weatherColor.fontColor}`} style={{ backgroundColor: `rgb(${props.weatherColor.r},${props.weatherColor.g},${props.weatherColor.b})` }}>
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
        weatherColor: state.weatherColor
    };
};

export default connect(mapStateToProps)(Header);
