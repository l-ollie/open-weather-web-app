
import React from 'react';
import { ListGroup } from 'react-bootstrap';

function SearchResultsItem(props: any) {
    const landCode = props.city.country.toLowerCase();

    // function clickHander(){
    //     props.setSearchTerm()
    // }

    return (
        <>
            <ListGroup.Item
                onClick={() => {
                    props.setSelectedCity(props.city.name)
                    props.setSearchTerm(`${props.city.name}, ${props.city.country}`);
                    props.setshowResults(false);
                }}
            >

                {props.city.name}, {props.city.country} <img src={`https://openweathermap.org/images/flags/${landCode}.png`} />
            </ListGroup.Item>
        </>
    );
}

export default SearchResultsItem;