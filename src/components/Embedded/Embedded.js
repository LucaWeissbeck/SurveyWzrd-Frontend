import React from "react";
import {SurveyEmbedded} from "./Survey/SurveyEmbedded";
import {AnalyticsEmbedded} from "./Analytics/AnalyticsEmbedded";

export class Embedded extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
    }


    switch = () =>{
        let temp = this.state.submitted ? false : true;
        this.setState({submitted: temp});
    }

    render(){
        return(

            <React.Fragment>
                {this.state.submitted ? <AnalyticsEmbedded switch={this.switch}/> : <SurveyEmbedded switch={this.switch}/>}
            </React.Fragment>
            )
        }
}


