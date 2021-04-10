import React from 'react';
import Header from "../Header/Header";

export class HowTo extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header header={3}/>
                <h1>HowTo Page</h1>
                <img src={"./assets/onlyTheTruth.png"} />
            </React.Fragment>

        )
    }
}
