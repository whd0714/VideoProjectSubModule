import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NavBar from "./component/views/NavBar/NavBar";
import LandingPage from "./component/views/LandingPage/LandingPage";
import LoginPage from "./component/views/LoginPage/LoginPage";
import RegisterPage from "./component/views/RegisterPage/RegisterPage";
import VideoUploadPage from "./component/views/VideoUploadPage/VideoUploadPage";
import Auth from './hoc/auth';
import VideoDetailPage from "./component/views/VideoDetailPage/VideoDetailPage";

function App(props) {
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, false)} />
                <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
                <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
            </Switch>
        </Router>
    );
}

export default App;