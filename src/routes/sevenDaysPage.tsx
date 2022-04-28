import * as React from 'react';
import { connect } from 'react-redux'
// import { IHourlyWeather } from '../models/IHourlyWeather';

export interface ISevenDaysProps {
    // hourly: IHourlyWeather;
    // measurementUnit: string
}

class SevenDays extends React.Component<ISevenDaysProps> {
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
        // forecast: state.forecast,
        measurementUnit: state.measurementUnit
    };
}

export default connect(mapState2Props)(SevenDays);
