import React from 'react';
import './Homepage.css';
import Header from "./Header/Header";

export class Homepage extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header></Header>
                <div className='Test'>
                    <iframe src="http://localhost:3000/survey" className='Testi'  gesture="media"  allow="encrypted-media" allowfullscreen>Your Browser does not support Iframes! :(</iframe>
                </div>
            </React.Fragment>

        )
    }
}
