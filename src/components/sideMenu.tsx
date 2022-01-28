import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, ListGroup, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import JsonCity from '../services/data/current.city.list.json';
import SearchCityService from '../services/script/searchCityService';
import SearchResultsItem from './searchResultsItem';

// export type SelectCallback = (
//     eventKey: string | null,
//     e: React.SyntheticEvent<unknown>,
// ) => void;

// http://bulk.openweathermap.org/sample/


function SideMenu(props: any) {
    const searchDelay: number = 1000;
    // const jsonCity = JSON.stringify(JsonCity);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [showResults, setshowResults] = useState(false);



    // console.log("sdfs")

    // console.log(_local[0].name);

    useEffect(() => {


    }, [1]);


    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target?.value);
        setshowResults(true);

    }

    useEffect(() => {
        const delaySearchTerm = setTimeout(() => {
            searchCityList();
        }, searchDelay)

        return () => clearTimeout(delaySearchTerm)
    }, [searchTerm, props.selectedCity]);

    function searchCityList() {


        if (searchTerm === "" || !showResults) {
            setSearchList([]);
            return
        }

        const searchCityService = new SearchCityService(JsonCity);
        const results = searchCityService.cityList(searchTerm);
        console.log(results);

        const _resultList = results.map((item: any, index: number) => {
            let listItem = <SearchResultsItem
                key={index}
                city={item}
                setSearchTerm={setSearchTerm}
                setSelectedCity={props.setSelectedCity}
                setshowResults={setshowResults}
            />
            return listItem;

        });

        console.log(_resultList);

        setSearchList(_resultList);
    }

    function handleSelect(e: any) {
        props.setMeasurementUnit(e);
    }

    return (
        <>
            <Navbar expand={false}>
                <Container fluid className="no-container-margin">
                    <Form className="d-flex flex-row-reverse width-100">
                        <Form.Control
                            size="lg"
                            type="search"
                            placeholder="Search"
                            className=""
                            aria-label="Search"
                            onChange={handleSearch}
                            value={searchTerm}
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
                <Container fluid className="no-container-margin">
                    < ListGroup className="width-100">
                        {searchList}
                    </ListGroup>
                </Container>
            </Navbar>
        </>
    );
}

export default SideMenu;