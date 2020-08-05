import React, { Component } from 'react';
import {
    Router,
    Route, Switch
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './history';
import { PATH } from './config';
import { WEB_PAGES } from './components/index';
class App extends Component {

    render() {

        return (

            <Router history={history} >
                <Switch>
                    <Route exact path={PATH.HOME} component={WEB_PAGES.HOME} />
                    <Route path={PATH.VIDEOS} component={WEB_PAGES.VIDEO} />
                    <Route path={PATH.VIDEOPLAYER} component={WEB_PAGES.VIDEOPLAYER} />
                    <Route path={PATH.SIGNIN} component={WEB_PAGES.SIGNIN} />
                </Switch>
            </Router >


        )
    }
}

export default App;
