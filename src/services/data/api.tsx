import axios from "axios";

// http://api.openweathermap.org/data/2.5/weather?q=Leiden&appid=a2ed31ee07568e51c5901c4ea33082df&units=metric
// https://api.openweathermap.org/data/2.5/onecall?lat=52.1583&lon=4.4931&exclude=minutely&appid=a2ed31ee07568e51c5901c4ea33082df&units=metric

export default axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5",
});
