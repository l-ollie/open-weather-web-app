import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './navBar';
import SideMenu from './sideMenu';
import { connect } from 'react-redux';
import IWeatherColors, { IWeatherColor } from '../../models/IWeatherColor';
import NavBarLink from '../../models/navBarLink';
import { useLocation } from 'react-router-dom';

interface IHeader extends MapStateToProps {
    appNavlinks: Array<NavBarLink>,
}

function Header(props: IHeader): JSX.Element {
    const [weatherColor, setWeatherColor] = useState<IWeatherColor>(props.weatherColors.today);
    const location = useLocation();


    function changeHeaderColor(): void {
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

interface MapStateToProps {
    weatherColors: IWeatherColors
}

const mapStateToProps = (state: MapStateToProps) => {
    return {
        weatherColors: state.weatherColors,
    };
};

export default connect(mapStateToProps)(Header);
