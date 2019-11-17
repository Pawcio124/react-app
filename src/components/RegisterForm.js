import React from "react";
import {Field, reduxForm} from "redux-form";
import '../css/LoginForm.css';
import Button from 'react-bootstrap/Button';
import {renderField} from "../form";
import {connect} from "react-redux";
import {userRegister} from "../actions/actions";

const mapDispatchToProps= {
  userRegister
};

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {termsAccepted: false};
    }

    onSubmit(values){
        return this.props.userRegister(...Object.values(values))
            .then(()=> {
                this.props.reset();
            });
    }

    onTermsAcceptedClick(e){
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}));
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        return (<div id="signupform">
            <h1>ZAREJESTRUJ</h1>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="username" placeholder="Nazwa użytkownika" type="text" component={renderField} />
            <Field name="password" placeholder="Hasło" type="password" component={renderField} />
            <Field name="retypedPassword" placeholder="Powtórz hasło" type="password" component={renderField} />
            <Field name="email" placeholder="Email" type="text" component={renderField} />
            <Button type="submit" variant="dark" id="signup_form_btn" disabled={submitting || !this.state.termsAccepted}>
                ZAREJESTRUJ
            </Button>
                <div className="form-check form-group">
                <input className=" form-check-input checkbox_position" type="checkbox"
                       value={false}
                       onClick={this.onTermsAcceptedClick.bind(this)}
                />
                <label className="terms"> Zgadzam się z warunkami. </label>
                </div>
            </form>
        </div>)
    }
}

export default reduxForm({
    form:'RegisterForm'
})(connect(null, mapDispatchToProps)(RegisterForm));