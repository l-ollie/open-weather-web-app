import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";


function NavBarLinkButton(props: any) {

    function setCurrentNav() {
        if (props.link.URL === "/")
            return props.setSelectedNav("current");

        console.log(props.link.URL);
        return props.setSelectedNav(props.link.URL);
    }

    return (
        <div>
            <NavLink to={props.link.URL} className={({ isActive }) => (isActive ? 'NavBarLinkButton_link active' : 'NavBarLinkButton_link')} onClick={setCurrentNav} >
                <div className="mt-3 mb-3">
                    {props.link.name}
                </div>
                <div className="NavBarLinkButton_underlines" ></div>
            </NavLink>
        </div>
    );
}

export default NavBarLinkButton;