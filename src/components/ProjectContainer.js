import React from 'react';
import {projectFetch, projectUnload} from "../actions/actions";
import {connect} from "react-redux";
import Project from "./Project";
import Spinner from "./Spinner";
import TaskListContainer from "./TaskListContainer";

const mapeStateToProps = state => ({
    ...state.project
});

const mapDispatchToProps = {
    projectFetch,
    projectUnload
};

class ProjectContainer extends React.Component{
    componentDidMount() {
        this.props.projectFetch(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.projectUnload();
    }

    render() {
        const {isFetching, project, reset} = this.props;
        if (isFetching){
            return (<Spinner/>)
        }
        return (
            <div>
            <Project project={project} reset={reset} />
                { project && <TaskListContainer projectId={this.props.match.params.id}/>}
            </div>
            )
    }
}

export default connect(mapeStateToProps, mapDispatchToProps) (ProjectContainer);