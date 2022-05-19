import MeasurementUnit from "../../../../models/MeasurementUnit";
import ActionType from "../../actionTypes";

export interface ISetMeasurementUnit {
    type: ActionType.setMeasurementUnit;
    payload: MeasurementUnit
}