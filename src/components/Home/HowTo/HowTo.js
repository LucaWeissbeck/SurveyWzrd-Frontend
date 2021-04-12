import React from 'react';
import Header from "../Header/Header";

export class HowTo extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header header={3}/>
                <h1>HowTo Page</h1>
                <iframe src="http://localhost:3000/survey/263" width="1280px" height="720px"/>
            </React.Fragment>

        )
    }
}
