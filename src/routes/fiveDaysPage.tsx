import * as React from 'react';
import { connect } from 'react-redux'
// import { IHourlyWeather } from '../models/IHourlyWeather';

export interface IFiveDaysProps {
    // hourly: IHourlyWeather;
    // measurementUnit: string
}

class FiveDays extends React.Component<IFiveDaysProps> {
    public render() {
        return (
            <div>
                <h3>fivedays</h3>
            </div>
        );
    }
}

const mapState2Props = (state: any) => {
    return {
        forecast: state.forecast,
        measurementUnit: state.measurementUnit
    };
}

export default connect(mapState2Props)(FiveDays);
