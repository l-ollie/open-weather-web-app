import React, { Component } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { connect } from 'react-redux';
import './shared.css';

function mapStateToProps(state: any) {
    return {
        tempUnitCss: state.tempUnitCss
    };
}

function MaxMin(props: any) {
    const max = Math.round(props.max);
    const min = Math.round(props.min);


    return (
        <div className="d-flex">
            <div className="maxMin-signle-temp me-3">
                <span className={` ${props.tempUnitCss}`}>max {max}</span><BsArrowUp />
            </div>
            <div className="maxMin-signle-temp me-3">
                <span className={` ml-1  ${props.tempUnitCss}`}>min {min}</span><BsArrowDown />
            </div>
        </div>
    );
}

export default connect(
    mapStateToProps,
)(MaxMin);