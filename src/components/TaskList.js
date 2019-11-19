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
            activeIndex: null,
            taskPriority: null,
            content: null,
            dateEndTask: null

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

    toggleClass(index) {
        this.setState({ activeIndex: this.state.activeIndex === index ? null : index });
        this.setState({content:null});
        this.setState({place:null});
        this.setState({taskPriority:null});
        this.setState({dateEndTask:null});
    };

    onClick(taskId){
        const {taskDelete} = this.props;
        return taskDelete(taskId)
    };

    handleChangeCo = (e) =>{
        this.setState({content:e.target.value});
    };
    handleChangePl = (e) =>{
        this.setState({place:e.target.value});
    };
    handleChangeTP = (e) =>{
        this.setState({taskPriority:e.target.value});
    };
    handleChangeDET = (e) =>{
        this.setState({dateEndTask :e.target.value});
    };
    onClickEdit(task){
        const {reset}= this.props;

        if (this.state.dateEndTask===null){
            this.state.dateEndTask = task.dateEndTask;
        }
        if (this.state.taskPriority === null){
            this.state.taskPriority = 1;
        }
        if (this.state.content === null){
            this.state.content = task.content;
        }
        if(this.state.place ===null){
            this.state.place = task.place;
        }
        return this.props.taskEdit(this.state.activeIndex, this.state.content, this.state.place, this.state.dateEndTask, this.state.taskPriority);
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

                                        <input type="text" value={this.state.content} onChange={this.handleChangeCo}/>
                                        <input type="text" value={this.state.place} onChange={this.handleChangePl} />
                                        <input type="number" min={1} max={5} value={this.state.taskPriority} onChange={this.handleChangeTP} />
                                        <input type="date" value={this.state.dateEndTask} onChange={this.handleChangeDET} />
                                        <button onClick={this.onClickEdit.bind(this, task)}>
                                        Zapis
                                        </button>
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
export default connect(null, mapDispatchToProps)(TaskList);