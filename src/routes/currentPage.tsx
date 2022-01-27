import React from 'react';
import { useData } from '../components/appWrapper';
import CurrentSection from '../components/currentSection';
import WindSection from '../components/windSection';
import getTempColorForLeds from '../components/tempToColor'
import Header from '../components/header';
// import DataContext from 
import ICurrentWeather from "../models/currentData"

function CurrentPage() {
    const data = useData();

    // const temperatureColor = getTempColorForLeds(data);

    // const datasdf = data;



    return (
        <>
            <CurrentSection data={data} />
            <WindSection data={data} />

        </>
    );
}

export default CurrentPage;