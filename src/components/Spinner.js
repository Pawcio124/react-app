import React from 'react';
import "../css/Spinner.css";

export class Spinner extends React.Component{
    render() {
        return (
                <div className="circle_inside">
                <i className="fas fa-spinner fa-spin"/>
                </div>
        );
    }
}

export default Spinner;