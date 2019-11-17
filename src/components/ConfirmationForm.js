import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";
import '../css/ConfirmationForm.css';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import {userConfirm} from "../actions/actions";

const mapDispatchToProps ={
    userConfirm
};

class ConfirmationForm extends React.Component{
    onSubmit(values) {
        return this.props.userConfirm(values.confirmationToken)
            .then(()=> {
                this.props.reset();
            });
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="main_confirmation">
            <div id="register_confirmation">
            <p>Wprowadź kod potwierdzający.</p>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="confirmationToken" placeholder="Kod potwierdzający" type="text" component={renderField} />
                <Button type="submit" variant="dark" id="register_confirmation_btn" disabled={submitting}>
                    Potwierdź!
                </Button>
            </form>
        </div>
            </div>)
    }
}

export default reduxForm({
    form: 'ConfirmationForm'
})(connect(null, mapDispatchToProps)(ConfirmationForm));