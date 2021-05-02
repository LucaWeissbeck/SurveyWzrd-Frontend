import React from 'react';
import {
    Container,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    CardHeader,
    Card,
    CardContent,
    Typography,
    FormLabel,
    Checkbox,
    CircularProgress,
    Paper,
    IconButton, Button
} from "@material-ui/core";
import { Alert }from '@material-ui/lab';
import * as surveyService from "../../../services/survey/embeddedSurvey-service";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DescriptionIcon from "@material-ui/icons/Description";
import BusinessIcon from '@material-ui/icons/Business';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {ErrorModal} from "../../Home/ErrorHandling/ErrorModal";

export class SurveyEmbeddedBare extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        let urlSurveyID = new URLSearchParams(this.props.location.search).get("id")
       // const { match, location, history } = this.props;
        this.state = {
            urlSurveyID: urlSurveyID,
            //Survey API data
            companyName: "",
            surveyName: null,
            surveyDescription: '',
            surveyID: null,
            surveyMultiSelect: false,
            surveyQuestion: '',
            //Answer Options for survey
            answerOptions: [],
            //Checkbox Answers
            checkboxAnswers: [],
            //Radiobutton Answer
            rbValue: null,
            //Checkbox Status
            checkboxesStatus: null,
            //Stepper
            activeStep: 0
        };
    }

    //API calls in CDM
    async componentDidMount(){
        //Get specific survey
        surveyService.getSurveysByID(this.state.urlSurveyID)
            .then((res) => {
                this.setState({
                    loading: false,
                    companyName: res.data.companyName,
                    surveyName: res.data.name,
                    surveyDescription: res.data.description,
                    surveyID: res.data.id,
                    surveyMultiSelect: res.data.multiSelect,
                    surveyQuestion: res.data.question

                })
            })
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });

        //Get specific answeroptions
        surveyService.getAnswerOptionsByID(this.state.urlSurveyID)
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
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });

    }



    //Component Change Handlers
    submitButtonOnClick = () =>{
        if(localStorage.getItem(this.state.urlSurveyID)){
            this.setState({voted: true});
        }
        else {
            console.log("now")
            let identifierID = "";
            if (localStorage.getItem("identifierID") !== null) {
                identifierID = localStorage.getItem("identifierID");
            }

            this.setState({loading: true});
            let userLang = navigator.language;
            localStorage.setItem(this.state.urlSurveyID, "voted");
            let checkboxAnswersIDs = [];
            if (this.state.surveyMultiSelect) {
                for (let i = 0; i < this.state.checkboxAnswers.length; i++) {
                    for (let j = 0; j < this.state.answerOptions.length; j++) {
                        if (this.state.answerOptions[j].value === this.state.checkboxAnswers[i]) {
                            checkboxAnswersIDs.push(this.state.answerOptions[j].id);
                        }
                    }
                }
                let payload = {
                    answerOptionIDs: checkboxAnswersIDs,
                    timestamp: "",
                    browserLanguage: userLang,
                    identifierID: identifierID
                }
                surveyService.postSurveyAnswerMutliple(this.state.urlSurveyID, payload)
                    .then((res) => {
                        console.log(res);
                        if (localStorage.getItem("identifierID") === null) {
                            localStorage.setItem("identifierID", res.data.identifierID)
                        }
                    })
                    .then(this.props.switch)
                    .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });
            }
            else if (!this.state.surveyMultiSelect) {
                console.log("printed")
                //Getting ID for chosen answer from AnswerOption array
                this.setState({loading: true});
                let answerOptionID = 0;
                for (let i = 0; i < this.state.answerOptions.length; i++) {
                    if (this.state.answerOptions[i].value === this.state.rbValue) {
                        answerOptionID = this.state.answerOptions[i].id;
                    }
                }
                let payload = {
                    answerOptionID: answerOptionID,
                    timestamp: "",
                    browserLanguage: userLang,
                    identifierID: identifierID
                }
                surveyService.postSurveyAnswerSingle(this.state.urlSurveyID, payload)
                    .then((res) => {
                        console.log(res);
                        if (localStorage.getItem("identifierID") === null) {
                            localStorage.setItem("identifierID", res.data.identifierID)
                        }
                    })
                    .then(this.props.switch)
                    .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });
            }

        }
    };

    handleRadioButtonChange = (event)  => {
        this.setState({rbValue: event.target.value});
    }

    handleCheckboxChange = (event) => {
        this.setState({...this.state.checkboxesStatus, [event.target.name]: event.target.checked});
        if(event.target.checked){
            this.setState(prevState => ({
                checkboxAnswers: [...prevState.checkboxAnswers, event.target.name]
            }));
        }
        else if (!event.target.checked){
            let newArray = this.state.checkboxAnswers;
            newArray.splice(newArray.indexOf(event.target.name), 1);
            this.setState({
                checkboxAnswers: newArray
            });
        }
    }

    handleSurveyDescriptionButton = () => {
        alert(this.state.surveyDescription)
    }

    handleSurveyCompanyButton = () => {
        alert(this.state.companyName)
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
                        style={{marginBottom: "10px"}}
                    />
                
            ))
        )
    }

    handleErrorOpen = (errorMessage) => {
        this.setState({
            errorMessage: errorMessage,
            errorOpen: true
        });
    }

    handleErrorClose =() => {
        this.setState({errorOpen: false})
    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Container style={{marginTop: '15px'}}>
                        <Card>
                            <CardHeader
                                titleTypographyProps={{variant:'h5' }}
                                avatar={
                                    <div style={{width: "100%"}}>
                                        <div style={{width: "70%", display: "inline"}}>
                                            <Typography variant="h4" style={{fontWeight: "bold"}}>
                                                {this.state.surveyName}
                                            </Typography>
                                        </div>
                                    </div>
                                }
                                action={
                                    <div style={{display:"flex", justifyContent:"flex-end", marginTop: "-15px", paddingRight: "20px"}} >
                                        <img src="/assets/logo_with_text.png" style={{width: "180px", height:"80px"}}/>
                                    </div>
                                }
                                style={{backgroundColor: "#254563", color: 'white', height: "35px", width:"100%"}}>
                            </CardHeader>
                            <CardContent style={{backgroundColor: "#f3f3f3", zIndex:5}}>
                                <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", flexFlow: "wrap", alignContent: "flex-start"}} id="main">
                                    <div style={{width: "700px", height: "100%", alignContent: "flex-start"}} id="left">
                                        <Paper style={{height: "100%", width: "100%", position: "relative"}} square={true}>
                                            <Typography variant="h6" component="h2" style={{fontWeight: "bold", padding: "15px 0px 0px 15px"}}>
                                                {this.state.surveyQuestion}
                                            </Typography>
                                            {!this.state.surveyMultiSelect &&
                                            <div>
                                                <RadioGroup aria-label="gender" name="gender1" value={this.state.rbValue}
                                                            onChange={this.handleRadioButtonChange}>
                                                    <div style={{width: "100%", height: "150px", overflow: "scroll", padding: "15px", display: "flex", flexDirection: "column", paddingRight: "99%"}}>
                                                        {this.getAnswerOptionsSingleChoiceHTML()}
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                            }
                                            {this.state.surveyMultiSelect &&
                                            <div>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" style={{padding: "0 0 0 15px"}}>Answers may be scrollable</FormLabel>
                                                    <div style={{width: "70%", height: "150px", overflow: "scroll", padding: "15px", display: "flex", flexDirection: "column", paddingRight: "99%"}}>
                                                        {this.getAnswerOptionsMultipleChoiceHTML()}
                                                    </div>
                                                </FormControl>
                                            </div>
                                            }
                                            <Button size="large"
                                                    variant="contained"
                                                    style={{backgroundColor: "#c4b1c9", color: "white", position: "absolute", top: "10px", right: "10px"}}
                                                    onClick={this.submitButtonOnClick}
                                                    disabled={this.state.surveyMultiSelect ? this.state.checkboxAnswers.length === 0 : this.state.rbValue === null}
                                            >SEND</Button>
                                            {this.state.loading && <CircularProgress size={26} style={{position: "absolute", top: "20px", right: "42px"}}/>}
                                        </Paper>
                                    </div>
                                    <div style={{width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "flex-start"}} id="right">
                                        <div id="right-top" style={{height: "40%", minHeight: "95px"}}>
                                            <Paper square={true} style={{height: "100%"}}>
                                                <Typography variant="h5" style={{fontWeight: "bold", textAlign: "center", paddingTop: "10px"}}>Multiple Choice</Typography>
                                                <div style={{textAlign: "center"}}>
                                                    {this.state.surveyMultiSelect ? <CheckIcon fontSize="large" style={{fill: "green"}}/> : <ClearIcon fontSize="large" style={{fill: "red"}}/>}
                                                </div>
                                            </Paper>
                                        </div>
                                        <div id="right bottom" style={{height: "40%", minHeight: "95px"}}>
                                            <Paper square={true} style={{height: "100%"}}>
                                                <div style={{height: "100%", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
                                                    <Typography variant="h5" style={{fontWeight: "bold", width: "100%", textAlign: "center"}}>Information</Typography>
                                                    <IconButton onClick={this.handleSurveyDescriptionButton} style={{marginTop: "-15px"}}>
                                                        <DescriptionIcon color="secondary" style={{fontSize: "35px"}}/>
                                                    </IconButton>
                                                    <IconButton onClick={this.handleSurveyCompanyButton}>
                                                        <BusinessIcon color="secondary" style={{fontSize: "35px", marginTop: "-15px"}}/>
                                                    </IconButton>
                                                </div>

                                            </Paper>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            {this.state.voted === true &&
                                <Alert severity="warning">You cannot vote twice!</Alert>
                            }
                            <div style={{backgroundColor: "#254563", height: "10px"}}/>
                        </Card>
                    </Container>
                </Container>


                {this.state.errorOpen === true &&
                <ErrorModal open={this.state.errorOpen} onClose={this.handleErrorClose} errorMessage={this.state.errorMessage}/>}
            </React.Fragment>


        )
    }

}
export const SurveyEmbedded = withRouter(SurveyEmbeddedBare);
