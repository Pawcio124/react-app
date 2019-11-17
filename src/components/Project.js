import React from 'react';
import Message from "./Message";
import "../css/Project.css"
import {connect} from "react-redux";
import Container from 'react-bootstrap/Container';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import {Field, reduxForm} from "redux-form";
import Button from 'react-bootstrap/Button'
import {renderField} from "../form";
import {projectEdit} from "../actions/actions";


Moment.globalMoment = moment;
Moment.globalLocale='pl';
Moment.globalFormat='D MMM YYYY';


const mapDispatchToProps = {
  projectEdit
};

class Project extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            active: true,
        };
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    onSubmit(values){
        const {projectEdit, reset, project} =this.props;
        if (values.priority === undefined){
            values.priority = project.priority;
        }
        return projectEdit(values.title, values.content, values.dateEnd, project.id, values.priority)
            .then(() => {
                reset();
                window.location.reload();
            })
    }

    render() {
        const {project, submitting, handleSubmit}= this.props;
        if (null === project){
            return (<Message message="Projekt nie istnieje." />);
        }

    return (
        <Container  className="Project_with_tasks">
            <div className="Project_with_tasks_body">
            <div className="Project_data">
                <h1> {project.title}</h1>
            <p className="card-text">{project.content}</p>
                <p className="card-text border-top">
                    <small className="text-muted">
                        Dodany: <Moment date={project.date} fromNow /><br/>
                        Do: <Moment date={project.dateEnd}/>
                    </small>
                </p>
            </div>
            <div>
                <Button className="edit_form_btn_show" variant="outline-warning" onClick={this.toggleClass.bind(this)} >Edytuj</Button>
            </div>
                { this.state.active? null :
                    <div className="update_project_form">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="update_form_add">
                            <Field name="title" placeholder={project.title} type="text" component={renderField}/>
                            <Field name="content" placeholder={project.content} type="text" component={renderField}/>
                            <Field  name="priority" placeholder={project.priority} type="number" min="1" max="5" component={renderField} />
                            <Field name="dateEnd" type="date" component={renderField}/>
                            <Button size='lg' type="submit" className="update_edit_btn" variant="outline-success"
                                    disabled={submitting}>
                                Zapisz
                            </Button>
                        </form>
                    </div>
                }
            </div>
        </Container>
    )
    }
}
export default reduxForm({
    form: 'Project'
})(connect(null, mapDispatchToProps)(Project))