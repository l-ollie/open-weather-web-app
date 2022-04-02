
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { setSelectedCity } from '../../services/redux/actions/index';
interface ISearchResultsItem {
}


function SearchResultsItem(props: any) {
    const landCode = props.city.country.toLowerCase();

    return (
        <>
            <ListGroup.Item
                onPointerDown={() => {
                    props.setShowResults(false);
                    props.setSelectedCity({ name: props.city.name, lat: props.city.coord.lat, lon: props.city.coord.lon });
                    props.setSearchTerm(`${props.city.name}, ${props.city.country}`);
                }}
            >

                {props.city.name}, {props.city.country} <img src={`https://openweathermap.org/images/flags/${landCode}.png`} /> {props.city.post}
            </ListGroup.Item>
        </>
    );
}


const mapState2Props = (state: any) => {
    return {

    };
}

export default connect(mapState2Props, { setSelectedCity })(SearchResultsItem);
