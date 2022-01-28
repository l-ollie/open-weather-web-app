import React from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';
import NavBar from './navBar';
import SideMenu from './sideMenu';
import getTempColorForLeds from './tempToColor';

function Header(props: any) {
    const tempToColor = getTempColorForLeds(props.data?.main.feels_like);

    return (


        <div className={`header_container pt-3 sticky_nav ${tempToColor.fontColor}`} style={{ backgroundColor: `rgb(${tempToColor.r},${tempToColor.g},${tempToColor.b})` }}>
            <Container>
                <SideMenu
                    setMeasurementUnit={props.setMeasurementUnit}
                    measurementUnit={props.measurementUnit}
                    selectedCity={props.selectedCity}
                    setSelectedCity={props.setSelectedCity}
                />
            </Container>

            <div className=" d-flex justify-content justify-content-around ">
                <NavBar appNavlinks={props.appNavlinks} setSelectedNav={props.setSelectedNav} />
            </div>
        </div >
    );
}

export default Header;