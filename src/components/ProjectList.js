import React from 'react';
import {Link} from "react-router-dom";
import '../css/ProjectList.css'
import Message from "./Message";
import {connect} from "react-redux";
import {projectDelete, projectEdit} from "../actions/actions";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';

Moment.globalMoment = moment;
Moment.globalLocale='pl';
Moment.globalFormat='D MMM YYYY';

const  mapDispatchToProps = {
  projectDelete, projectEdit
};

const mapStateToProps = state =>({
userData: state.auth.userData,
...state.projectList
});

class ProjectList extends React.Component{
    onClickDelete(projectId){
        return this.props.projectDelete(projectId).then(()=> window.location.reload())
    }
    render() {
        const {projects, isAuthenticated}= this.props;
        if (null === projects || 0 === projects.length){
            return (<div>
                <Message message="Brak projektów."/>
                    <Container>
                        <Row>
                            {!isAuthenticated && (
                            <Col className="col_project">
                                <Link to="/project-post-form">
                                    <div className="card mb-3 mt-3 shadow-sm project_circle ">
                                        <div className="card_inside plus">
                                            <h1>
                                                +
                                            </h1>
                                            <p>
                                                Dodaj projekt
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        )}
                        </Row>
                    </Container>
                </div>
                );
        }
        return (
            <Container >
            <Row>
                {
                !isAuthenticated && (
                <Col className="col_project">
                    <Link to="/project-post-form">
                    <div className="card mb-3 mt-3 shadow-sm project_circle ">
                        <div className="card_inside plus">
                            <h1>
                                +
                            </h1>
                            <p>
                                Dodaj projekt
                            </p>
                        </div>
                    </div>
                    </Link>
                </Col>
                )}
                {projects && projects.map(project =>
                    <Col className="col_project">
                        <div className="card mb-3 mt-3 shadow-sm project_circle " key={project.id}>
                            <div className="card_inside">
                                <Link to={`/project/${project.id}`}>
                                <h3>{project.title}</h3>
                                </Link>
                                <p className="card-text border-top">
                                    <small>
                                        {console.log(project)}
                                        Termin: <Moment date={project.dateEnd}/>  <br/>
                                        Ilość zadań: {project.tasks.length}
                                    </small>
                                </p>
                                <Button className="btn_delete" onClick={this.onClickDelete.bind(this, project.id)} variant="outline-danger">Usuń</Button>
                            </div>
                        </div>
                    </Col>
                )
                }
            </Row>
        </Container>)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectList);