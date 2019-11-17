import React from 'react';
import {connect} from "react-redux";
import Spinner from "./Spinner";
import {taskListFetch, taskListUnload} from "../actions/actions";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import {LoadMore} from "./LoadMore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/TaskListContainer.css'

const mapeStateToProps = state => ({
    ...state.taskList,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    taskListFetch,
    taskListUnload
}

class TaskListContainer extends React.Component{
    componentDidMount() {
        this.props.taskListFetch(this.props.projectId);
    }

    componentWillUnmount() {
        this.props.taskListUnload();
    }

    onLoadMoreClick(){
        const {projectId, currentPage, taskListFetch} = this.props;
       taskListFetch(projectId, currentPage);
    }

    render() {
        const {isFetching, taskList, isAuthenticated, projectId, currentPage, pageCount, handleSubmit} = this.props;
        const showLoadMore = pageCount > 1 && currentPage <= pageCount;

        if (isFetching && currentPage === 1){
            return (<Spinner/>)
        }
        return (
            <div>
                <Container className="container_task">
                    <Row>
                        <Col>
                {isAuthenticated && <TaskForm taskList={taskList} projectId={projectId} />}
                        </Col>
                <TaskList handleSubmit={handleSubmit} taskList={taskList} />
                    </Row>
                </Container>
                {showLoadMore && <LoadMore  label="Wczytaj więcej zadań..."
                                            onClick={this.onLoadMoreClick.bind(this)}
                                            disabled={isFetching}/>}
            </div>
        )
    }
}

export default connect(mapeStateToProps, mapDispatchToProps) (TaskListContainer);