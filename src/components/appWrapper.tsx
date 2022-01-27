import Header from "./header";
import NavBarLink from "../models/navBarLink"
import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiKey } from "../services/data/data";
import ICurrentWeather from "../models/currentData"

// import getTempColorForLeds from "./tempToColor";
import WeatherRepository from "../services/data/weatherRepository";


const navLinks = [new NavBarLink("Current", "/"), new NavBarLink("Forecast", "forecast"), new NavBarLink("5 Days", "5-days"), new NavBarLink("Pollution", "pollution"),];

type ContextType = {
    data: ICurrentWeather | string;
    // measurementUnit: string;
};
// type ContextType = { user: User | null };
export default function AppWrapper() {
    const weatherRepository = new WeatherRepository(apiKey);
    const [data, setData] = useState(null);
    const [measurementUnit, setMeasurementUnit] = useState("metric");
    const [selectedNav, setSelectedNav] = useState("");
    const [selectedCity, setSelectedCity] = useState("Leiden");
    // const dataPackage = {
    //     data = null,
    //     measurementUnit = "metric"
    // }


    useEffect(() => {
        getCurrentWeather();
    }, []);


    async function getCurrentWeather() {
        const response = await weatherRepository.getCurrentWeather(selectedCity, measurementUnit);
        setData(response.data);
    }



    return (
        <>
            <Header
                appNavlinks={navLinks}
                data={data}
                measurementUnit={measurementUnit}
                setMeasurementUnit={setMeasurementUnit}
                setSelectedNav={setSelectedNav}
            />
            <Outlet context={data} />
        </>
    )
};


export function useData() {
    return useOutletContext<ContextType>();
}