import MeasurementUnit from '../../models/MeasurementUnit';
import BeaufortColors from '../data/beaufortColors'
const beaufort = require('beaufort-scale')

class BeaufortScale {
    private speed: number;
    private measurementUnit: string;

    constructor(speed: number, measurementUnit: string) {
        this.measurementUnit = measurementUnit;
        this.speed = this.speedToKmh(speed);
    }

    speedToKmh(speed: number): number {
        if (this.measurementUnit === MeasurementUnit.metric) {
            const metreToKmh = speed * 18 / 5;
            return metreToKmh;
        } else if (this.measurementUnit === MeasurementUnit.imperial) {
            const mileToKmh = speed * 1.609344;
            return mileToKmh
        }
        return 0;
    }

    get color(): string {
        const windSpeedGrade = beaufort(this.speed, { int: true })
        return `#${BeaufortColors[windSpeedGrade.grade]}`
    }

    get description(): string {
        const windDescription = beaufort(this.speed, { int: true })
        return BeaufortColors[windDescription.desc]
    }

}

export default BeaufortScale;