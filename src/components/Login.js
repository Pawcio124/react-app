import React from 'react';
import {reduxForm, Field} from "redux-form";
import {renderField} from "../form";

class Login extends React.Component{
    onSubmit(values){
        console.log(values);
    }

    render() {
        const {handleSubmit}= this.props;
        return(
            <div>
            <div className="text-center">
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="username" label="Username" type="text" component={renderField} />
                    <Field name="password" label="Password" type="password" component={renderField}/>
                    <button type="sumbit" className="btn btn-primary btn-big btn-block"> Log in</button>
                </form>
            </div>
     </div>
        )
    }

}

export default reduxForm({
    form: 'Login'
})(Login)