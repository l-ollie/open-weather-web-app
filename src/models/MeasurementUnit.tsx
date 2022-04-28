import CssUnit from '../types/CssUnit';
import MeasurementUnitSystem from '../types/MeasurementUnitSystem';
import SpeedUnit from '../types/speedUnit';

export default interface IMeasurementUnit {
    system: MeasurementUnitSystem,
    cssUnit: CssUnit,
    speedUnit: SpeedUnit
}