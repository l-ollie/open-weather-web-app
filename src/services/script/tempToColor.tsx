// coppied code from old arduino project 

import { IWeatherColor } from "../../models/IWeatherColor";

const tempColorSteps = [
    [0, 0, 255],    // 0 - dark blue -6 - 0
    [200, 200, 200],  // 1 - white    0 - 6
    [0, 255, 255],  // 2 - light blue 6 - 12
    [0, 255, 0],    // 3 - green      12 - 18
    [255, 255, 0],  // 4 - yellow     18 - 24
    [255, 129, 0],    // 5 - orange   24 - 30
    [200, 0, 0],    // 6 - red        30
];


const temperatureStep = 6;
let temperatureDiv: any = [];
let currentTempColor: any = [];

function setupTemperatureDiv() {
    for (let i = 0; i < 7; i++) {
        temperatureDiv[i] = -temperatureStep + (temperatureStep * i);
    }
}

(function () {
    setupTemperatureDiv()
})();

export default function getTempColorForLeds(feels_like: number, measurementUnit: string): IWeatherColor {
    let _feels_like = feels_like;

    if (measurementUnit === "imperial") {
        _feels_like = (_feels_like - 32) * 0.5556;
    }
    calculateTempColor(_feels_like);
    const color: IWeatherColor = {
        "r": currentTempColor[0],
        "g": currentTempColor[1],
        "b": currentTempColor[2],
        "fontColor": checkIfDark(currentTempColor[0], currentTempColor[1], currentTempColor[2])
    };

    return color;

}

function checkIfDark(r: number, g: number, b: number) {
    const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return "dark";
    }
    else {

        return "light";
    }
}

function calculateTempColor(main_feels_like: number) {
    for (let i = 0; i < 6; i++) {                                                                             // check for 6 tempDiv
        if (main_feels_like >= temperatureDiv[i] && main_feels_like <= temperatureDiv[i + 1]) {   // check if temp is in range of this div
            let procentage = returnProcentage(i, main_feels_like);
            for (let b = 0; b < 3; b++) {
                currentTempColor[b] = Math.round(tempColorSteps[i][b] * (1 - procentage) + (tempColorSteps[i + 1][b] * procentage));
            }
            return;
        }
    }
    // if temp is not between -6 and 30
    if (main_feels_like > temperatureDiv[6]) { // if its > 30 pick warm color
        for (let b = 0; b < 3; b++)
            currentTempColor[b] = tempColorSteps[6][b];
    }
    else if (main_feels_like < temperatureDiv[0]) { // if its colder then -6 pick cold color
        for (let b = 0; b < 3; b++)
            currentTempColor[b] = tempColorSteps[0][b];
    }
}

function returnProcentage(a: number, main_feels_like: number): number {
    let bTemp = main_feels_like + temperatureStep;
    bTemp = bTemp - (temperatureStep * a);
    return bTemp / 6;
}