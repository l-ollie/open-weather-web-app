import React, { useEffect, useState } from 'react';
import { Container, Form, ListGroup, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import JsonCity from '../../services/data/current.city.list.min.json';
import SearchCityService from '../../services/script/searchCityService';
import SearchResultsItem from './searchResultsItem';
import { connect } from 'react-redux';
import { setMeasurementUnit } from '../../services/redux/actions';
import ISelectedCity from '../../models/ISelectedCity';
import IMeasurementUnit from '../../models/MeasurementUnit';
import { SetMeasurementUnitR } from '../../services/redux/types';
import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import { ICurrentCityItem } from '../../models/ICurrentCityItem';


interface IProps extends IMapStateToProps {
    setMeasurementUnit: (unit: MeasurementUnitSystem) => SetMeasurementUnitR
}

function SideMenu(props: IProps) {
    const searchDelay: number = 1000;
    const [searchTerm, setSearchTerm] = useState<string>(props.selectedCity.name);
    const [searchList, setSearchList] = useState<JSX.Element[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        e.preventDefault();
        setSearchTerm(e.target?.value);
        setShowResults(true);
    }

    function clickHandler(): void {
        setShowResults(true);
    }

    useEffect(() => {
        const delaySearchTerm: NodeJS.Timeout = setTimeout(() => {
            searchCityList();
        }, searchDelay)

        return () => clearTimeout(delaySearchTerm)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, props.selectedCity]);

    function searchCityList(): void {

        if (searchTerm === "" || searchTerm === props.selectedCity.name) {
            return
        }

        const searchCityService = new SearchCityService(JsonCity);
        const results: ICurrentCityItem[] = searchCityService.cityList(searchTerm);

        const _resultList: JSX.Element[] = results.map((item: ICurrentCityItem, index: number) => {
            let listItem = <SearchResultsItem
                key={index}
                city={item}
                setShowResults={setShowResults}
                setSearchTerm={setSearchTerm}
            />
            return listItem;

        });
        setSearchList(_resultList);
    }

    function handleSelect(e: any): void {
        const selection: MeasurementUnitSystem = e.toString() === MeasurementUnitSystem.metric ? MeasurementUnitSystem.metric : MeasurementUnitSystem.imperial;
        props.setMeasurementUnit(selection);
    }

    return (
        <>
            <Navbar expand={false} >
                <Container fluid className="no-container-margin"  >
                    <Form className="d-flex flex-row-reverse width-100" onSubmit={e => { e.preventDefault(); }}>
                        <Form.Control
                            size="lg"
                            type="search"
                            placeholder="Search"
                            className=""
                            aria-label="Search"
                            onChange={handleSearch}
                            onFocus={clickHandler}
                            onBlur={() => setShowResults(false)}
                            value={searchTerm}
                        />
                    </Form>
                    <Navbar.Toggle aria-controls="offCanvasNavbar" className="index-1 p-absolute searcher-bar__burger no-border" />
                    <Navbar.Offcanvas
                        id="offCanvasNavbar"
                        aria-labelledby="offCanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title={`Measurement units: ${props.measurementUnit.system}`} id="offCanvasNavbarDropdown" onSelect={handleSelect}>
                                    <NavDropdown.Item eventKey="metric" >Metric</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="imperial" >Imperial</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                <Container fluid className="no-container-margin p-relative ">
                    < ListGroup className={`width-100 sideMenu__list `}>
                        {showResults ? searchList : null}
                    </ListGroup>
                </Container>
            </Navbar>
        </>
    );
}

interface IMapStateToProps {
    selectedCity: ISelectedCity;
    measurementUnit: IMeasurementUnit;
}

const mapStateToProps = (state: IMapStateToProps) => {
    return {
        measurementUnit: state.measurementUnit,
        selectedCity: state.selectedCity
    }
}


export default connect(mapStateToProps, { setMeasurementUnit })(SideMenu);