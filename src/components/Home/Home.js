import React from 'react';
import Header from "./Header/Header";

export class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <React.Fragment>
                <h1>This is the homepage</h1>
            </React.Fragment>
        )
    }
}
