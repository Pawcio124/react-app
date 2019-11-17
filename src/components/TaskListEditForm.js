import React from "react"
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import {taskEdit} from "../actions/actions";

const mapDispatchToProps ={
    taskEdit
};

class TaskListEditForm extends React.Component{


    onSubmit(values){
        const {taskEdit, reset, task} =this.props;
        console.log(values);
        return taskEdit(task.id, values.content, values.place, values.dateEndTask)
            .then(() => {
                reset();
            })
    }

    render() {
        const {submitting, task}= this.props;

        return(
            <div className="update_form">
                <form  onSubmit={this.onSubmit.bind(this)} className="form_add">
                    {task.id}
                    <Field name="content" placeholder={task.content} type="text" component={renderField}/>
                    <Field name="place" placeholder={task.place} type="text" component={renderField}/>
                    <Field name="dateEndTask" type="date" component={renderField}/>
                    <Button size='lg' type="submit" className="edit_btn" variant="outline-success"
                            disabled={submitting}>
                        Zapisz
                    </Button>
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form:'TaskListEditForm'
})(connect(null, mapDispatchToProps)(TaskListEditForm));