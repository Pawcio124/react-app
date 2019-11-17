import React from 'react';
import "../css/TaskList.css"
import {CSSTransition} from "react-transition-group";
import $ from 'jquery';
import {taskDelete, taskDone, taskEdit} from "../actions/actions";
import {connect} from "react-redux";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";

Moment.globalMoment = moment;
Moment.globalLocale='pl';
Moment.globalFormat='D MMM YYYY';

const mapDispatchToProps = {
    taskDelete,
    taskEdit,
    taskDone
};

class TaskList extends React.Component{

    constructor(props) {
        super(props);

        this.toggleClass= this.toggleClass.bind(this);
        this.state = {
            activeIndex: null
        }
    }

    setDone(task){
        const {reset} =this.props;
        task.done = !task.done;
        return (
            taskDone(task.id,task.done).then(()=> {
                $("#zadanie"+ task.id).prop('checked', task.done);
                reset();
            })
        )

    }

    onSubmitEdit(task, values){
        const {reset, taskEdit} =this.props;
        console.log(values);
        if (values.taskPriority === undefined){
            values.taskPriority = 4;
        }
        return taskEdit( task.id, values.content, values.place, values.dateEndTask, values.taskPriority)
            .then(() => {
                reset();
            })
    }

    toggleClass(index) {
        this.setState({ activeIndex: this.state.activeIndex === index ? null : index });
    };

    onClick(taskId){
        const {taskDelete} = this.props;
        return taskDelete(taskId)
    };
    render() {
        const {taskList, submitting}= this.props;

        if (null === taskList || 0 === taskList.length){
            return null;
        }
        return (
                taskList.map(task =>
                     <Col>
                        <CSSTransition key={task.id} timeout={1000} classNames="fade">
                        <div className="card mb-3 mt-3 shadow-sm task_circle_task_list " >
                            <div className="card_inside_task_list">

                                {(this.state.activeIndex === task.id) ?
                                    <div className="update_form" key={task.id}>
                                        <form  onSubmit={this.onSubmitEdit.bind(this, task)} className="form_add">
                                            <Field name="content" placeholder={task.content} type="text" component={renderField}/>
                                            <Field name="place" placeholder={task.place} type="text" component={renderField}/>
                                            <Field name="taskPriority" placeholder={task.taskPriority} type="number" min="1" max="5" component={renderField} />
                                            <Field name="dateEndTask" type="date" component={renderField}/>
                                            <Button size='lg'  type="submit" className="edit_btn" variant="outline-success"
                                                    disabled={submitting}>
                                                Zapisz
                                            </Button>
                                        </form>
                                    </div>
                                    : null }

                            <h2 className="card-text mb-0">
                                {task.content}
                            </h2>
                                {task.place && <p className="card-text">Miejsce:{task.place}</p>}
                                    { task.dateEndTask &&  <p>Do: <Moment date={task.dateEndTask}/></p>}
                            </div>
                        </div>
                        </CSSTransition>
                         <Button className="btn_delete_task" variant="outline-danger" onClick={this.onClick.bind(this, task.id)}>Usuń</Button>
                         <label className="checkboxContainer">
                         <input type="checkbox" id={`zadanie${task.id}`} onClick={this.setDone.bind(this, task)} checked = {task.done} />
                         <span className="checkmark"/>
                         </label>
                         <Button className="btn_update_task"  onClick={this.toggleClass.bind(this, task.id)} variant="outline-warning" >Edytuj</Button>
                 </Col>
                )
        )
    }
}
export default reduxForm({
    form: 'TaskList'
})(connect(null, mapDispatchToProps)(TaskList));