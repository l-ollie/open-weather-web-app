 enum ActionType {
    setMeasurementUnit = "SET_MEASUREMENT_UNIT",
    setSelectedCity = "SET_SELECTED_CITY",
    setTempUnitCss = "SET_TEMP_UNIT_CSS",
    fetchCurrentWeather = "FETCH_CURRENT_WEATHER",
    fetchCurrentRequest = "FETCH_CURRENT_WEATHER_REQUEST",
    fetchCurrentSuccess = "FETCH_CURRENT_WEATHER_SUCCESS",
    fetchCurrentFailure = "FETCH_CURRENT_WEATHER_FAILURE",

    fetchHourlyWeather = "FETCH_HOURLY_WEATHER",
    fetchSevenDaysWeather = "SEVEN_DAYS_WEATHER",

    fetchWeather = "FETCH_WEATHER",
    fetchWeatherRequest = "FETCH_WEATHER_REQUEST",
    fetchWeatherSuccess = "FETCH_WEATHER_SUCCESS",
    fetchWeatherFailure = "FETCH_WEATHER_FAILURE",
    fetchWeatherSave = "FETCH_WEATHER_SAVE",

    weatherColors = "WEATHER_COLORS",
    timeZone = "TIME_ZONE",
}

export default ActionType