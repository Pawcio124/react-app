import React from 'react';
import {Route, Switch} from "react-router";
import ProjectListContainer from "./ProjectListContainer";
import ProjectContainer from "./ProjectContainer";
import LoginForm from "./LoginForm";
import {request} from "../agent";
import Header from "./Header";
import {connect} from "react-redux";
import {userLogout, userProfileFetch, userSetId} from "../actions/actions";
import ProjectForm from "./ProjectForm";

const mapStateToProps = state =>({
   ...state.auth
});

const mapDispatchToProps={
  userProfileFetch, userSetId, userLogout
};

class App extends React.Component{
    constructor(props){
        super(props);
        const token= window.localStorage.getItem('jwtToken');

        if (token){
            request.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');

        const {userSetId} = this.props;

        if (userId){
            userSetId(userId);
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userData ,userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null && userData ===null){
            userProfileFetch(userId);
        }
    }

    render() {
        const {isAuthenticated, userData, userLogout} = this.props;

        return(
            <div>
                { (this.props.location.pathname==="/login") ? null : <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} />}
        <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/project-post-form" component={ProjectForm}/>
            <Route path="/project/:id" component={ProjectContainer} />
            <Route path="/:page?" component={ProjectListContainer}/>
        </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);