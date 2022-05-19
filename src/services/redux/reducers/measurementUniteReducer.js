import ActionType from '../actionTypes';
import CssUnit from '../../../types/CssUnit';
import SpeedUnit from '../../../types/speedUnit';
import MeasurementUnitSystem from '../../../types/MeasurementUnitSystem';

const metric = { system: MeasurementUnitSystem.metric, cssUnit: CssUnit.celsius, speedUnit: SpeedUnit.kmh };
const imperial = { system: MeasurementUnitSystem.imperial, cssUnit: CssUnit.fahrenheit, speedUnit: SpeedUnit.mph };

// eslint-disable-next-line import/no-anonymous-default-export
const measurementUnitReducer = (state = metric, action) => {
	switch (action.type) {
		case 'SET_MEASUREMENT_UNIT':
			console.log(action.payload);
			return action.payload === MeasurementUnitSystem.metric ? metric : imperial;
		default:
			return state;
	}
};

export default measurementUnitReducer;
