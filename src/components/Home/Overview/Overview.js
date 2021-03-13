import React from 'react';
import Header from "../Header/Header";

export class Overview extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header header={0}/>
                <h1>Overview Page</h1>
            </React.Fragment>
        )
    }
}
