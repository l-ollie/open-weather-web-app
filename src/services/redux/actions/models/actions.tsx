import MeasurementUnit from "../../../../models/MeasurementUnit";
import ActionType from "../../types";

export interface ISetMeasurementUnit {
    type: ActionType.setMeasurementUnit;
    payload: MeasurementUnit
}