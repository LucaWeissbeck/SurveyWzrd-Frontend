
import React from 'react';
import { SurveyEmbedded } from './components/SurveyEmbedded/SurveyEmbedded';
import {Homepage} from "./components/Homepage/Homepage";
import  CreateSurvey from "./components/Homepage/CreateSurvey/CreateSurvey"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/survey" component={SurveyEmbedded} />
                        <Route path="/createsurvey" component={CreateSurvey} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
