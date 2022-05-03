
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { connect } from 'react-redux';
import '../../assets/css/shared.css';

function mapStateToProps(state: any) {
    return {
        measurementUnit: state.measurementUnit
    };
}

function MaxMin(props: any) {
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

export default connect(
    mapStateToProps,
)(MaxMin);