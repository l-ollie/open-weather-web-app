import { NavLink } from "react-router-dom";
import navBarLink from '../../models/navBarLink';

interface IProps {
    link: navBarLink
}

function NavBarLinkButton(props: IProps): JSX.Element {

    return (
        <div>
            <NavLink to={props.link.URL} className={({ isActive }) => (isActive ? 'NavBarLinkButton_link active' : 'NavBarLinkButton_link')}  >
                <div className="mt-3 mb-3">
                    {props.link.name}
                </div>
                <div className="NavBarLinkButton_underlines" ></div>
            </NavLink>
        </div>
    );
}

export default NavBarLinkButton;