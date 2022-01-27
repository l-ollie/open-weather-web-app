import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';

// export type SelectCallback = (
//     eventKey: string | null,
//     e: React.SyntheticEvent<unknown>,
// ) => void;


interface SelectCallback extends React.EventHandler<any> {
    (eventKey: any, e: React.SyntheticEvent<{}>): void;
    /**
        @deprecated
        This signature is a hack so can still derive from HTMLProps.
        It does not reflect the underlying event and should not be used.
    */
    (e: React.MouseEvent<{}>): void;
}

function SideMenu(props: any) {


    function handleSelect(e: any) {
        props.setMeasurementUnit(e);
    }

    return (
        <div>
            <Navbar expand={false}>
                <Container fluid className="no-container-margin">
                    <Form className="d-flex flex-row-reverse width-100">
                        <FormControl
                            size="lg"
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" className="index-1 p-absolute searcher-bar__burger no-border" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title={`Measurement units: ${props.measurementUnit}`} id="offcanvasNavbarDropdown" onSelect={handleSelect}>
                                    <NavDropdown.Item eventKey="metric" >Metric</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="imperial" >Imperial</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default SideMenu;