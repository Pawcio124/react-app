import React from 'react';
import classNames from "classnames";
import "./css/form.css"

export const renderField = ({input, label, placeholder, type, min, max, meta: {error}}) =>{
    const classes = classNames(
        'form-control',
        {
            'is-invalid' : error
        }
    );
    return(
        <div className="form-group form_dis">
            {label !== null && label !=='' && <label>{label}</label>}
            {type !=='textarea' && <input {...input} type={type} placeholder={placeholder} min={min} max={max} className={classes}/>}
            {type ==='textarea' && <textarea {...input} placeholder={placeholder} className={classes}/>}
            {error && <small className="form-text text-danger">{error}</small>}
        </div>
    )
}