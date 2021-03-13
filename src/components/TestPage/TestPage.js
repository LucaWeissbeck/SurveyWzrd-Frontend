import React from 'react';
import './TestPage.css';
import Header from "../Home/Header/Header";
import {SurveyEmbedded} from "../Embedded/SurveyEmbedded";

export class TestPage extends React.Component{

    render(){
        return(
            <React.Fragment>
                <Header></Header>
                {/*<div className='Test'>
                    <iframe src="http://localhost:3000/survey" className='Testi'  gesture="media"  allow="encrypted-media" >Your Browser does not support Iframes! :(</iframe>
                    <Embedded></Embedded>
                </div>*/}
                <SurveyEmbedded></SurveyEmbedded>
            </React.Fragment>

        )
    }
}
