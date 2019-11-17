import React from "react";
import RegisterForm from "./RegisterForm";
import {connect} from "react-redux";
import ConfirmationForm from "./ConfirmationForm";
import "../css/ConfirmationForm.css";
import {userRegisterComplete} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.registration
});
const mapDispatchToProps ={
    userRegisterComplete
};

class RegistrationContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={counter:3};
    }

    componentDidUpdate(prevProps, prevState) {
        const {confirmationSuccess, userRegisterComplete} = this.props;

        if (prevProps.confirmationSuccess !== confirmationSuccess && confirmationSuccess) {
            this.timer = setInterval(
                () => {
                    console.log(this.state.counter);
                    this.setState(prevState => ({counter: prevState.counter - 1}));
                },
                1000
            )
        }

        if (prevState.counter !== this.state.counter && this.state.counter <=0){
            userRegisterComplete();
            window.location.reload();
        }
    }

    componentWillUnmount() {
        this.props.userRegisterComplete();

        if(this.timer){
            clearInterval(this.timer);
        }
    }

    render() {
        const {registrationSuccess, confirmationSuccess} = this.props;

        if (!registrationSuccess){
            return (confirmationSuccess ? null : <RegisterForm/>);
        }

        if (!confirmationSuccess){
            return <ConfirmationForm/>;
        }

        return (
            <div className="main_confirmation">
                <div className="congratulation">
                    <h2>Gratulacje!</h2>
                    <p>
                        Twoje konto zostało potwierdzone. Za &nbsp;{this.state.counter} sekund możesz się zalogować.
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)