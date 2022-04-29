import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './navBar';
import SideMenu from './sideMenu';
import { connect } from 'react-redux';
import IWeatherColors from '../../models/IWeatherColor';
import NavBarLink from '../../models/navBarLink';
import { useLocation } from 'react-router-dom';

interface IHeader {
    weatherColors: IWeatherColors,
    appNavlinks: Array<NavBarLink>,
}

function Header(props: IHeader) {
    const [weatherColor, setWeatherColor] = useState(props.weatherColors.today);
    const location = useLocation();

    function changeHeaderColor() {
        if (location.pathname === "/")
            setWeatherColor(props.weatherColors.today);
        else if (location.pathname === "/tomorrow")
            setWeatherColor(props.weatherColors.tomorrow);
        else if (location.pathname === "/sevendays")
            setWeatherColor(props.weatherColors.sevenDays);
    }

    useEffect(() => {
        changeHeaderColor()
    }, [props.weatherColors, location.pathname]);// eslint-disable-line react-hooks/exhaustive-deps

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
        weatherColors: state.weatherColors,
    };
};

export default connect(mapStateToProps)(Header);
