import MeasurementUnitSystem from '../../types/MeasurementUnitSystem';
import BeaufortColors from '../data/beaufortColors'
const beaufort = require('beaufort-scale')

class BeaufortScale {
    private speed: number;
    private measurementSystem: string;

    constructor(speed: number, measurementSystem: string) {
        this.measurementSystem = measurementSystem;
        this.speed = this.speedToKmh(speed);
    }

    speedToKmh(speed: number): number {
        if (this.measurementSystem === MeasurementUnitSystem.metric) {
            const metreToKmh = speed * 18 / 5;
            return metreToKmh;
        } else if (this.measurementSystem === MeasurementUnitSystem.imperial) {
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
        return windDescription.desc
    }

}

export default BeaufortScale;