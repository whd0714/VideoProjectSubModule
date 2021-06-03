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

function App(props) {
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/video/upload" component={VideoUploadPage} />
            </Switch>
        </Router>
    );
}

export default App;