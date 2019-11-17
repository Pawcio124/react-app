import React from 'react';
import {reduxForm, Field} from "redux-form";
import {renderField} from "../form";
import '../css/LoginForm.css'
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import {userLoginAttempt} from "../actions/actions";
import $ from 'jquery';
import BackgroundTheme from "./BackgroundTheme";
import RegistrationContainer from "./RegistrationContainer";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps ={
  userLoginAttempt
};

class LoginForm extends React.Component{
    componentDidUpdate(prevProps) {
        const {history} = this.props;
        if (prevProps.token !== this.props.token){
            history.push('/');
        }
    }

    onSubmit(values){
        return this.props.userLoginAttempt(
            values.username,
            values.password
        );
    }

    handleSignupBtn(){
        $("#main").animate({left:"22.5%"}, 400);
        $("#main").animate({left:"30%"}, 500);
        $("#loginform").css("visibility", "hidden");
        $("#loginform").animate({left:"25%"}, 400);

        $("#signupform").animate({left:"20%"}, 400);
        $(".main_confirmation").animate({left:"20%"}, 400);
        $("#signupform").animate({left:"30%"}, 500);
        $(".main_confirmation").animate({left:"30%"}, 500);
        $("#signupform").css("visibility", "visible");
        $(".main_confirmation").css("visibility", "visible");
    }

    handleLoginBtn(){
        $("#main").animate({left:"77.5%"}, 400);
        $("#main").animate({left:"70%"}, 500);
        $("#signupform").css("visibility", "hidden");
        $(".main_confirmation").css("visibility", "hidden");
        $("#signupform").animate({left:"75%"}, 400);
        $(".main_confirmation").animate({left:"75%"}, 400);

        $("#loginform").animate({left:"83.5%"}, 400);
        $("#loginform").animate({left:"70%"}, 500);
        $("#loginform").css("visibility", "visible");
    }

    render() {
        const {handleSubmit, error, history}= this.props;
        return(
            <div>
                <BackgroundTheme />
            <div id="logo">
                <h1>ToDoMindMap</h1>
            </div>
           <div id="box">
               <div id="main"/>

               <div id="loginform">
                   <h1>ZALOGUJ</h1>
                   {error && <div className="alert alert-danger">{error}</div> }
                   <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                   <Field name="username" placeholder="Nazwa użytkownika" type="text" component={renderField} />
                   <Field name="password" placeholder="Hasło" type="password" component={renderField}/>
                   <Button type="submit" variant="dark" id="login_form_btn" >Zaloguj</Button>
                   </form>
                   </div>
               <RegistrationContainer history={history}/>

               <div id="login_msg"> Masz konto?</div>
               <div id="signup_msg">Nie masz jeszcze konta?</div>
                   <button id="login_btn" onClick={this.handleLoginBtn.bind(this)}>ZALOGUJ</button>
                   <button id="signup_btn" onClick={this.handleSignupBtn.bind(this)}>ZAREJESTRUJ</button>
           </div>
            </div>
        )
    }
}
export default reduxForm({
    form: 'Login'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm))