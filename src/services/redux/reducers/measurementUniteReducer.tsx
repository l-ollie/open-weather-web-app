import ActionType from '../actionTypes';
import CssUnit from '../../../types/CssUnit';
import SpeedUnit from '../../../types/speedUnit';
import MeasurementUnitSystem from '../../../types/MeasurementUnitSystem';
import { MeasurementUnitR } from '../types';

const metric = { system: MeasurementUnitSystem.metric, cssUnit: CssUnit.celsius, speedUnit: SpeedUnit.kmh };
const imperial = { system: MeasurementUnitSystem.imperial, cssUnit: CssUnit.fahrenheit, speedUnit: SpeedUnit.mph };

// eslint-disable-next-line import/no-anonymous-default-export
const measurementUnitReducer = (state = metric, action: MeasurementUnitR) => {
	switch (action.type) {
		case ActionType.setMeasurementUnit:
			return action.payload === MeasurementUnitSystem.metric ? metric : imperial;
		default:
			return state;
	}
};

export default measurementUnitReducer;
