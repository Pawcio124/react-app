import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWriteProject} from "../apiUtils";
import {Redirect} from "react-router";
import {renderField} from "../form";
import {projectAdd, taskEdit} from "../actions/actions";
import "../css/ProjectForm.css";
import Button from 'react-bootstrap/Button';

const mapDispatchToProps = {
    projectAdd,
    taskEdit
};

const mapStateToProps = state =>({
   userData: state.auth.userData,
});

class ProjectForm extends React.Component{


    onSubmit(values){
        const {projectAdd, reset, history } =this.props;
        if (values.priority === undefined){
            values.priority = 1;
        }
        return projectAdd(values.title, values.content, values.dateEnd, values.priority)
            .then(() => {
                reset();
                history.push('/');
            })
    }

    render() {
        if (!canWriteProject(this.props.userData)){
            return <Redirect to="/login"/>
        }

        const {submitting, handleSubmit, error,taskEdit } = this.props;

        return (
            <div className="project_add_form_body">
                <div className="project_add_form">
                    {error && <div className="alert alert-danger">{error}</div> }
                    <h1>Dodaj nowy projekt</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="project_form_add">
                        <Field  name="title" placeholder="Nazwa Projektu" type="text" component={renderField} />
                        <Field  name="content" placeholder="Opis projektu" type="text" component={renderField} />
                        <Field  name="priority" placeholder="Priorytet (domyślnie 1)" type="number" min="1" max="5" component={renderField} />
                        <Field  name="dateEnd" type="date" component={renderField} />
                        <Button size='lg' type="submit" className="add_btn_form" variant="outline-success"
                                disabled={submitting} taskEdit={taskEdit}>
                            Dodaj
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'ProjectForm'
})(connect(mapStateToProps, mapDispatchToProps)(ProjectForm))