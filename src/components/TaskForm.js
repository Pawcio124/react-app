import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../form";
import {taskAdd} from "../actions/actions";
import "../css/TaskForm.css";
import Button from 'react-bootstrap/Button';
import Message from "./Message";

const mapDispatchToProps ={
    taskAdd
};

class TaskForm extends React.Component{
    onSubmit(values) {
        if (values.taskPriority === undefined){
            values.taskPriority = 1;
        }
        const {taskAdd, projectId, reset}= this.props;
        return taskAdd(values.content, projectId, values.place, values.dateEndTask, values.taskPriority).then(() => reset());
    }

    render() {
        const {handleSubmit, submitting, taskList}= this.props;

        return(
            <div>
                { (null === taskList || 0 === taskList.length)?
                    (<Message message="Nie ma jeszcze zadań!" />) : null
                }
            <div className="card mb-3 mt-3 shadow-sm task_circle_form">
                <div className="card_inside_form">
                    <h4>Nowe zadanie</h4>
                    <form className="task_form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="content" placeholder="Zadanie" type="text" component={renderField} />
                        <Field name="place" placeholder="Miejsce" type="text" component={renderField} />
                        <Field name="taskPriority" placeholder="Priorytet (domyślnie 1)" type="number" min="1" max="5" component={renderField} />
                        <Field name="dateEndTask" type="date" component={renderField} />
                        <Button className="btn_add_task" variant="outline-success" type="submit"
                        disabled={submitting}>
                            Dodaj
                        </Button>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'TaskForm'
}) (connect(null, mapDispatchToProps)(TaskForm))