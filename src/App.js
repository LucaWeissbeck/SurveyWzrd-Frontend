import React from 'react';
import {Embedded} from "./components/Embedded/Embedded";
import {HowTo} from "./components/Home/HowTo/HowTo";
import {Overview} from "./components/Home/Overview/Overview";
import {CreateSurvey} from "./components/Home/CreateSurvey/CreateSurvey";
import {Home} from "./components/Home/Home";


import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/survey" component={Embedded}/>
                            <Route path="/createsurvey" component={CreateSurvey}/>
                            <Route path="/overview" component={Overview}/>
                            <Route path="/how" component={HowTo}/>
                        </Switch>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
