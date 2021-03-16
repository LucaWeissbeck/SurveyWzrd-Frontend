import React from 'react';
import {
    Container,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    CardHeader,
    Card,
    CardContent, CardActions, Typography, Button, FormLabel, FormGroup, Checkbox
} from "@material-ui/core";
import { Alert }from '@material-ui/lab';
import * as surveyService from "../../../services/survey/survey-service";
import Header from "../../Home/Header/Header";



export class SurveyEmbedded extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //Survey API data
            surveyName: null,
            surveyDescription: '',
            surveyID: null,
            surveyMultiSelect: false,
            surveyQuestion: '',
            //Checkboxes Answers
            answerOptions: [],
            //Radiobutton Answer
            rbValue: null,
            //Checkbox Status
            checkboxesStatus: null
        };
    }

    //API calls in CDM
    async componentDidMount(){
        //Get specific survey
        surveyService.getSurveysByID(16)
            .then((res) => {
                this.setState({
                    surveyName: res.data.name,
                    surveyDescription: res.data.description,
                    surveyID: res.data.id,
                    surveyMultiSelect: res.data.multiSelect,
                    surveyQuestion: res.data.question
                })
            })
            .catch(err => console.log(err))

        //Get specific answeroptions
        surveyService.getAnswerOptionsByID(16)
            .then((res) => {
                for(let i = 0; i < res.data.length; i ++){
                    this.setState(prevState => ({
                        answerOptions: [...prevState.answerOptions, res.data[i]]
                    }))
                }
                let insertObject = {}
                for(let i = 0; i < this.state.answerOptions; i++){
                    insertObject[this.state.answerOptions[i].value] = false;
                }
                this.setState({checkboxesStatus: insertObject})
            })
            .catch(err => console.log(err));

    }
    //Component Change Handlers
    submitButtonOnClick = () =>{
        if(localStorage.getItem('ID')){
            this.setState({voted: true});
        }
        else{
            localStorage.setItem('ID', '299');
            if (this.state.surveyMultiSelect){

                //Implement Post request for MultipleChoice

            }
            else {
                //Getting ID for chosen answer from AnswerOption array
                let answerOptionID = 0;
                for(let i=0; i < this.state.answerOptions.length; i++){
                    if (this.state.answerOptions[i].value === this.state.rbValue){
                        answerOptionID = this.state.answerOptions[i].id;
                    }
                }
                let payload = {
                    answerOptionID: answerOptionID,
                    participantID: 1, //Hard Coded for now
                    timestamp: ""
                }
                surveyService.postSurveyAnswer(16, payload)
                    .then((res) => console.log(res))
                    .catch(err => console.log(err));
                this.props.switch();
            }
        }
    };

    handleRadioButtonChange = (event)  => {
        this.setState({rbValue: event.target.value})

    }

    handleCheckboxChange = (event) => {
        this.setState({...this.state.checkboxesStatus, [event.target.name]: event.target.checked});
    }

    //Creating HTML parts (Conditional rendering)
    getAnswerOptionsSingleChoiceHTML = () => {
        return(
            this.state.answerOptions.map(answerOption => (
                <FormControlLabel value={answerOption.value} control={<Radio/>} label={answerOption.value}/>
            ))
        )
    }

    getAnswerOptionsMultipleChoiceHTML = () => {
        return(
            this.state.answerOptions.map(answerOption => (
                <FormControlLabel
                    control={<Checkbox checked={this.state.checkboxesStatus[answerOption.value]} onChange={this.handleCheckboxChange} name={answerOption.value}/>}
                    label={answerOption.value}
                />
            ))
        )
    }


    render() {
        return (
            <React.Fragment>
                <Container>
                    <Container style={{marginTop: '15px' }}>
                        <Card>
                            <CardHeader
                                titleTypographyProps={{variant:'h5' }}
                                avatar={
                                    <img src={"./assets/survey_wzrd_logo_ideas.svg"} style={{width: "180px"}}/>
                                }
                                title="By: CompanyName"
                                style={{backgroundColor: "#254563", color: 'white', height: "35px", textAlign: "right"}}>
                            </CardHeader>
                            <CardContent>
                                <CardActions>
                                    <FormControl component="fieldset">
                                        <Typography variant="h5" component="h2">
                                            {this.state.surveyName}
                                        </Typography>
                                        <Typography style={{marginBottom: 12}} color="textSecondary">
                                            Please choose one of the following below:
                                        </Typography>
                                        {!this.state.surveyMultiSelect &&
                                            <RadioGroup aria-label="gender" name="gender1" value={this.state.rbValue}
                                                        onChange={this.handleRadioButtonChange}>
                                                {this.getAnswerOptionsSingleChoiceHTML()}
                                            </RadioGroup>
                                        }
                                        {this.state.surveyMultiSelect &&
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Please choose one or more answers.</FormLabel>
                                                <FormGroup>
                                                    {this.getAnswerOptionsMultipleChoiceHTML()}
                                                </FormGroup>
                                            </FormControl>
                                        }
                                    </FormControl>
                                </CardActions>
                                <CardActions>
                                    <Button  variant="contained" style={{backgroundColor: "#c4b1c9", color: "white"}} onClick={this.submitButtonOnClick}>
                                        SEND
                                    </Button>
                                </CardActions>
                            </CardContent>
                            {this.state.voted === true &&
                                <Alert severity="warning">You cannot vote twice!</Alert>
                            }
                            <div style={{backgroundColor: "#254563", height: "10px"}}/>
                        </Card>
                    </Container>
                </Container>
            </React.Fragment>


        )
    }

}
