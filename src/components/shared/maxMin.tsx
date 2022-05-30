
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { connect } from 'react-redux';
import '../../assets/css/shared.css';
import MeasurementUnit from '../../models/MeasurementUnit';

interface IProps {
    min: number;
    max: number;
}

function MaxMin(props: IProps) {
    const max = Math.round(props.max);
    const min = Math.round(props.min);

    return (
        <div className="d-flex">
            <div className="maxMin-single-temp me-3">
                <span >day {max}&#176;</span><BsArrowUp />
            </div>
            <div className="maxMin-single-temp me-3">
                <span >night {min}&#176;</span><BsArrowDown />
            </div>
        </div>
    );
}

interface MapStateToProps {
    measurementUnit: MeasurementUnit
}

const mapStateToProps = (state: MapStateToProps) => {
    return {
        measurementUnit: state.measurementUnit
    };
}
export default connect(
    mapStateToProps,
)(MaxMin);