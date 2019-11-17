import React from 'react';
import "../css/Header.css"
import {Link} from "react-router-dom"

export default class Header extends React.Component{
    renderUser(){
        const {userData, logout}= this.props;
        if (null===userData){
            return (<i className="fas fa-spinner fa-spin"/>);
        }

        return (
            <span className="user_text">
                Witaj {userData.username}, &nbsp;
                <button className="btn btn-link btn-sm" href="#" onClick={logout}>Wyloguj</button>
            </span>
        );
    }
    render() {
        const {isAuthenticated} = this.props;
        return (
            <nav className="navbar">
                <Link to={"/"} className="navbar-brand brand">
                    <h1>ToDoMindMap</h1>
                </Link>
                <span className="navbar-text">
                    {isAuthenticated ? this.renderUser() :  <Link className="user_text" to="/login">Zaloguj</Link>}
                </span>
            </nav>
        );
    }
}