import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import {Route} from "react-router";
import App from "./components/App";
import {applyMiddleware, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';
import {tokenMiddleware} from "./middleware";

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, tokenMiddleware)
);
const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
