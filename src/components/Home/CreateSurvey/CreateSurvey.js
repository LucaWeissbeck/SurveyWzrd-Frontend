import React from 'react';
import 'date-fns';
import {Container, Card, CardActions, CardContent, Grid, Box, Button, Paper, Tooltip, Input, FormControlLabel, Switch, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Header from "../Header/Header";
import {Helmet} from "react-helmet";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import Cookies from "universal-cookie/es6";


import * as surveyService from '../../../services/survey/createSurvey-service'


export class CreateSurvey extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            checkedA: false,
            companyName: "",
            description: "",
            multiSelect: true,
            returncount : 0,
            name: "",
            question: "",
            cookies: new Cookies(),
            answerOptions: ["", ""],
            selectedDate: new Date()
        };
    }

    handleExpiryDateChange = (date) => {
        console.log(date.toISOString().slice(0, 19).replace('T', ' '));
        this.setState({ selectedDate: date});
    };

    handleChange = (event) => {
        this.setState({ checkedA: event.target.checked });
    };

    handleSubmit = (event) => {
        /*let answerOptionsPayLoad = {};
        this.state.answerOptions.map((answerOption, index) => (
            answerOptionsPayLoad{ "value" : answerOption}

        ))*/

        let payload = {
                "companyName": this.state.companyName,
                "description": this.state.description,
                "multiSelect": this.state.checkedA,
                "name": this.state.name,
                "question": this.state.question,
                "expiryDate": this.state.selectedDate.toISOString().slice(0, 19).replace('T', ' ')
        }
        surveyService.postSurveyQuestionSingle(payload)
            .then((res)=> {
                console.log(res);
                this.state.answerOptions.map((answerOption, index) => {
                    let payloadAnswerOption = {
                        "value": answerOption
                    }

                    surveyService.postSurveyAnswerOptionSingle(payloadAnswerOption, res.data.id)
                        .then((res) => {
                            console.log(res)
                            this.state.returncount = this.state.returncount + 1;
                            if (this.state.returncount == this.state.answerOptions.length){
                                console.log('Success! Now forwarding to overview');
                                this.props.history.push('/overview/');
                            }
                        })
                        .catch((err) => console.log(err))
                })
            })
            .catch((err)=>console.log(err))




        };

    surveyTitleOnChange = (event) => {
        this.setState({ name: event.target.value })
    }

    questionOnChange = (event) => {
        this.setState({ question: event.target.value })
    }

    descriptionOnChange = (event) => {
        this.setState({ description: event.target.value })
    }

    companyNameOnChange = (event) => {
        this.setState({ companyName: event.target.value })
    }

    handleAnswerOptionListChange= (index, event) => {
        //let answerOptions = this.state.answerOptions.slice(); // Make a copy of the answers first.
        this.state.answerOptions[index] = event.target.value; // Update it with the modified answers.
        //this.setState({answerOptions: answerOptions}); // Update the state.
        console.log(this.state.answerOptions)

    }



    addAnswer = (event) => {
        this.setState({
            answerOptions: [...this.state.answerOptions, ""]
        });
    }

    deleteAnswer = (event) => {
        let array = [...this.state.answerOptions];
        array.pop();
        this.setState({
            answerOptions: array
        });
    }

    render() {
        if (this.state.cookies.get("authKey") ==undefined ) this.props.history.push('/');
        return(
       <React.Fragment>
           <Header header={1}/>
           <Helmet>
               <style>{'body { background-color: #D9DCE1; }'}</style>
           </Helmet>

           <Container>
               <Box p={1}/>

               <Grid container justify = "center">
                   <Box width="70%">
                       <Card>
                           <CardContent>
                               <Grid container spacing={0}>
                                   <Grid item xs={4}>
                                       <img src={"./assets/logo_without_text.svg"} style={{maxWidth: "150px", maxHeight: "40px", display: "inline", marginLeft: "0px"}} />
                                   </Grid>
                                   <Grid item xs={4}>

                                   </Grid>
                                   <Grid item xs={4}>
                                       <TextField label="Your company"
                                                  fullWidth
                                                  id="outlined-size-small"
                                                  variant="outlined"
                                                  size="small"
                                                  onChange={this.companyNameOnChange}/>
                                   </Grid>
                               </Grid>
                               <Input
                                   placeholder="Insert Title..."
                                   fullWidth
                                   disableUnderline={true}
                                   inputProps={{style: {fontSize: 30, color: '#254563'}}} // font size of input text
                                   InputLabelProps={{style: {fontSize: 30, color: '#254563'}}} // font size of input label
                                   onChange={this.surveyTitleOnChange}
                               />
                               <form noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="filled-textarea"
                                           label="Insert survey description here..."
                                           InputProps={{ disableUnderline: true }}
                                           multiline
                                           rows={3}
                                           multiline
                                           fullWidth
                                           variant="filled"
                                           onChange={this.descriptionOnChange}
                                       />
                                   </div>
                               </form>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="standard-basic"
                                           label="Question"
                                           fullWidth
                                           onChange={this.questionOnChange}
                                       />
                                   </div>
                               </form>
                               <Box p={1}/>
                               {this.state.answerOptions.map((answerOption, index) => (
                                   <form noValidate autoComplete="off">
                                       <div key={index}>
                                           <Grid container spacing={0}>
                                               <Grid item sm={1}/>

                                               <Grid item sm={11}>
                                                   <TextField
                                                       id="standard-basic"
                                                       label={"Answer " + (index + 1)}
                                                       fullWidth
                                                       onChange={(evt) => this.handleAnswerOptionListChange(index, evt)}
                                                       />
                                               </Grid>
                                           </Grid>
                                       </div>
                                   </form>
                                   ))

                               }

                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <div>
                                                   <Grid container spacing={1} alignItems="flex-end">
                                                       <Grid item>
                                                           <Tooltip title="add answer">
                                                               <Button onClick={this.addAnswer}>
                                                                   <AddBoxIcon style={{fill: '#254563'}}/>
                                                               </Button>
                                                           </Tooltip>

                                                       </Grid>
                                                       <Grid item>
                                                           <Tooltip title="delete answer">
                                                               <Button disabled={(this.state.answerOptions.length <= 1)} onClick={this.deleteAnswer}>
                                                                   <IndeterminateCheckBoxIcon style={{fill: '#254563'}}/>
                                                               </Button>
                                                           </Tooltip>

                                                       </Grid>

                                                   </Grid>
                                               </div>

                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <form>
                                   <FormControlLabel
                                       control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" color="primary" />}
                                       label="Allow Several Answers"
                                   />
                               </form>
                               {<form>
                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                       <DateTimePicker
                                           margin="normal"
                                           id="date-picker-dialog"
                                           label="Survey expiry date"
                                           format="dd.MM.yyyy HH:mm"
                                           value={this.state.selectedDate}
                                           onChange={this.handleExpiryDateChange}
                                           KeyboardButtonProps={{
                                               'aria-label': 'change date',
                                           }}
                                       />
                                   </MuiPickersUtilsProvider>
                               </form>}

                           </CardContent>
                           <CardActions>
                               <Button variant="contained" color="primary"  style={{fontWeight: "bold", textTransform: "none"}} onClick={this.handleSubmit}>
                                   CREATE
                               </Button>
                           </CardActions>
                       </Card>
                   </Box>
               </Grid>
           </Container>
       </React.Fragment>
    )
}
}

