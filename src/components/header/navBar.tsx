import navBarLink from '../../models/navBarLink';
import NavBarLinkButton from './navBarLinkButton';

interface IProps {
    appNavlinks: navBarLink[];
}

function NavBar(props: IProps): JSX.Element {
    const NavLinks: JSX.Element[] = props.appNavlinks.map((item: navBarLink, index: number) => {
        return (
            <NavBarLinkButton link={item} key={index} />
        )
    });

    return (
        <>
            {NavLinks}
        </>
    );
}

export default NavBar;