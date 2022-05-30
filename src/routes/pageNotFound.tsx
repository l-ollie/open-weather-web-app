import { Button, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function PageNotFound() {
    return (
        <Container fluid className='full-detail-page' >
            <div className="d-flex justify-content-center h-100">
                <div className="d-flex justify-content-center flex-column">
                    <div className="text-center">
                        <span>
                            Can't find page :'(
                        </span>
                        <br />
                        <NavLink to='/' >
                            <Button> Show Today's Weather</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default PageNotFound;