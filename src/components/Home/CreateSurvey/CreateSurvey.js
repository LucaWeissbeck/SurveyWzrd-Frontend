import React from 'react';
import 'date-fns';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    FormControlLabel,
    Grid,
    Input,
    Switch,
    TextField,
    Tooltip
} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Header from "../Header/Header";
import {Helmet} from "react-helmet";
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Cookies from "universal-cookie/es6";


import * as surveyService from '../../../services/survey/createSurvey-service'
import {ErrorModal} from "../ErrorHandling/ErrorModal";


export class CreateSurvey extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedA: false,
            companyName: "",
            description: "",
            multiSelect: true,
            returncount: 0,
            name: "",
            question: "",
            cookies: new Cookies(),
            answerOptions: ["", ""],
            selectedDate: new Date()
        };
    }

    handleExpiryDateChange = (date) => {
        console.log(date.toISOString().slice(0, 19).replace('T', ' '));
        this.setState({selectedDate: date});
    };

    handleChange = (event) => {
        this.setState({checkedA: event.target.checked});
    };

    handleSubmit = () => {

        let payload = {
            "companyName": this.state.companyName,
            "description": this.state.description,
            "multiSelect": this.state.checkedA,
            "name": this.state.name,
            "question": this.state.question,
            "expiryDate": this.state.selectedDate.toISOString().slice(0, 19).replace('T', ' ')
        }
        surveyService.postSurveyQuestionSingle(payload)
            .then((res) => {
                console.log(res);
                this.state.answerOptions.forEach((answerOption) => {
                    let payloadAnswerOption = {
                        "value": answerOption
                    }

                    surveyService.postSurveyAnswerOptionSingle(payloadAnswerOption, res.data.id)
                        .then((res) => {
                            console.log(res);
                            this.setState({
                                returncount: this.state.returncount + 1
                            })
                            if (this.state.returncount === this.state.answerOptions.length) {
                                this.props.history.push('/overview/');
                            }
                        })
                        .catch(err => {
                            this.handleErrorOpen(err.response.data.error);
                            console.log(err.response.data.error);
                            console.log(err);
                        });
                })
            })
            .catch((err) => console.log(err))


    };

    surveyTitleOnChange = (event) => {
        this.setState({name: event.target.value})
    }

    questionOnChange = (event) => {
        this.setState({question: event.target.value})
    }

    descriptionOnChange = (event) => {
        this.setState({description: event.target.value})
    }

    companyNameOnChange = (event) => {
        this.setState({companyName: event.target.value})
    }

    handleAnswerOptionListChange = (index, event) => {
        let answerOptions = [...this.state.answerOptions];
        answerOptions[index] = event.target.value;
        this.setState({
            answerOptions: answerOptions
        })

    }


    addAnswer = () => {
        this.setState({
            answerOptions: [...this.state.answerOptions, ""]
        });
    }

    deleteAnswer = () => {
        let array = [...this.state.answerOptions];
        array.pop();
        this.setState({
            answerOptions: array
        });
    }

    handleErrorOpen = (errorMessage) => {
        this.setState({
            errorMessage: errorMessage,
            errorOpen: true
        });
    }

    handleErrorClose = () => {
        this.setState({errorOpen: false})
    }

    render() {
        if (this.state.cookies.get("authKey") === undefined) this.props.history.push('/');
        return (
            <React.Fragment>
                <Header header={1}/>
                <Helmet>
                    <style>{'body { background-color: #D9DCE1; }'}</style>
                </Helmet>

                <Container>
                    <Box p={1}/>

                    <Grid container justify="center">
                        <Box width="70%">
                            <Card>
                                <CardContent>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <img src={"./assets/logo_without_text.svg"} alt="Logo" style={{
                                                maxWidth: "150px",
                                                maxHeight: "40px",
                                                display: "inline",
                                                marginLeft: "0px"
                                            }}/>
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
                                        inputProps={{
                                            style: {
                                                fontSize: 30,
                                                color: '#254563'
                                            }
                                        }} // font size of input text
                                        inputlabelprops={{
                                            style: {
                                                fontSize: 30,
                                                color: '#254563'
                                            }
                                        }} // font size of input label
                                        onChange={this.surveyTitleOnChange}
                                    />
                                    <form noValidate autoComplete="off">
                                        <div>
                                            <TextField
                                                id="filled-textarea"
                                                label="Insert survey description here..."
                                                InputProps={{disableUnderline: true}}
                                                multiline
                                                rows={3}
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
                                                inputProps={{maxLength: 38}}
                                                onChange={this.questionOnChange}
                                            />
                                        </div>
                                    </form>
                                    <Box p={1}/>
                                    {this.state.answerOptions.map((answerOption, index) => (
                                        <form noValidate autoComplete="off" key={index}>
                                            <div key={index}>
                                                <Grid container spacing={0}>
                                                    <Grid item sm={1}/>

                                                    <Grid item sm={11}>
                                                        <TextField
                                                            id="standard-basic"
                                                            label={"Answer " + (index + 1)}
                                                            fullWidth
                                                            inputProps={{maxLength: 45}}
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
                                                                    <span>
                                                                        <Button
                                                                            disabled={(this.state.answerOptions.length >= 8)}
                                                                            onClick={this.addAnswer}>
                                                                            <AddBoxIcon style={{fill: '#254563'}}/>
                                                                        </Button>
                                                                    </span>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item>
                                                                <span>
                                                                    <Tooltip title="delete answer">
                                                                        <span>
                                                                            <Button
                                                                                disabled={(this.state.answerOptions.length <= 2)}
                                                                                onClick={this.deleteAnswer}>
                                                                                <IndeterminateCheckBoxIcon
                                                                                    style={{fill: '#254563'}}/>
                                                                            </Button>
                                                                        </span>
                                                                    </Tooltip>
                                                                </span>

                                                            </Grid>

                                                        </Grid>
                                                    </div>

                                                </Grid>
                                            </Grid>
                                        </div>
                                    </form>
                                    <form>
                                        <FormControlLabel
                                            control={<Switch checked={this.state.checkedA} onChange={this.handleChange}
                                                             name="checkedA" color="primary"/>}
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
                                                keyboardbuttonprops={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </form>}

                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary"
                                            style={{fontWeight: "bold", textTransform: "none"}}
                                            onClick={this.handleSubmit}>
                                        CREATE
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                </Container>


                {this.state.errorOpen === true &&
                <ErrorModal open={this.state.errorOpen} onClose={this.handleErrorClose}
                            errorMessage={this.state.errorMessage}/>}
            </React.Fragment>
        )
    }
}

