import React from 'react';
import navBarLink from '../../models/navBarLink';
import NavBarLinkButton from './navBarLinkButton';

function NavBar(props: any) {

    const NavLinks = props.appNavlinks.map((item: navBarLink, index: number) => {
        return (
            <NavBarLinkButton link={item} key={index} setSelectedNav={props.setSelectedNav} />
        )
    });

    return (
        <>
            {NavLinks}
        </>
    );
}

export default NavBar;