import React from 'react';
import 'date-fns';
import {Container, Card, CardActions, CardContent, Grid, Box, Button, Paper, Tooltip, Input, FormControlLabel, Switch, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Header from "../Header/Header";
import {Helmet} from "react-helmet";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {Link} from "react-router-dom";
import * as surveyService from '../../../services/survey/createSurvey-service'


export class CreateSurvey extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            checkedA: false,
            companyName: "",
            description: "",
            multiSelect: true,
            name: "",
            question: ""
        };
    }

    handleExpiryDateChange = (date) => {
        console.log(date);
        this.setState({ selectedDate: date});
    };

    handleChange = (event) => {
        this.setState({ checkedA: event.target.checked });
    };

    handleSubmit = (event) => {
        let payload = {
                "companyName": this.state.companyName,
                "description": this.state.description,
                "multiSelect": this.state.checkedA,
                "name": this.state.name,
                "question": this.state.question,
                "expiryDate": this.state.selectedDate
        }
        surveyService.postSurveyQuestionSingle(payload)
            .then((res)=>console.log(res))
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

    render() {

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
                                       <TextField label="Company name"
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
                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <TextField
                                                   id="standard-basic"
                                                   label="Answer 1"
                                                   fullWidth
                                               />
                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <TextField
                                                   id="standard-basic"
                                                   label="Answer 2"
                                                   fullWidth
                                               />
                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <form noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={0}>
                                           <Grid item sm={1}/>

                                           <Grid item sm={11}>
                                               <div>
                                                   <Grid container spacing={1} alignItems="flex-end">
                                                       <Grid item>
                                                           <Tooltip title="Add additional answer">
                                                               <Button onClick={this.addAnswer}>
                                                                   <AddBoxIcon style={{fill: '#254563'}}/>
                                                               </Button>
                                                           </Tooltip>

                                                       </Grid>
                                                       <Grid item>
                                                           <TextField
                                                               disabled
                                                               id="input-with-icon-grid"
                                                               label="Additional Answer"
                                                               fullWidth
                                                               InputProps={{ disableUnderline: true }}
                                                           />
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
                               <form>
                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                       <KeyboardDatePicker
                                           margin="normal"
                                           id="date-picker-dialog"
                                           label="Survey expiry date"
                                           format="MM/dd/yyyy"
                                           value={this.state.selectedDate}
                                           onChange={this.handleExpiryDateChange}
                                           KeyboardButtonProps={{
                                               'aria-label': 'change date',
                                           }}
                                       />
                                   </MuiPickersUtilsProvider>
                               </form>

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

