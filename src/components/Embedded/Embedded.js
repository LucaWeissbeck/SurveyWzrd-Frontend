import React from "react";
import {SurveyEmbedded} from "./Survey/SurveyEmbedded";
import {AnalyticsEmbedded} from "./Analytics/AnalyticsEmbedded";

export class Embedded extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
        }
    }


    switch = () =>{
        let temp = this.state.submitted ? false : true;
        this.setState({submitted: temp});
    }

    reloadNeed = () =>{
        this.setState({reloadNeeded: true})
    }

    render(){
        return(

            <React.Fragment>
                {this.state.submitted ? <AnalyticsEmbedded switch={this.switch} surveyPath={this.props.location.pathname}/> : <SurveyEmbedded switch={this.switch} surveyPath={this.props.location.pathname}/>}
            </React.Fragment>
            )
        }
}


