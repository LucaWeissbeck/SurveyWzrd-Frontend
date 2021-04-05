import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    Paper, Step, StepButton, StepContent, StepLabel, Stepper, Switch,
    Typography
} from "@material-ui/core";
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export, Size
} from 'devextreme-react/pie-chart';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import * as surveyService from "../../../services/overview/overview-service"
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';


export class ModalComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: [],
            surveyID: null,
            surveyCompanyName: "",
            surveyDescription: "",
            surveyMultiSelect: null,
            surveyName: "",
            surveyQuestion: "",
            complete: []


        };
    }
    componentDidMount() {
        this.setState({
            data: this.props.data,
            surveyID: this.props.surveyID
        });

        //API Calls
        surveyService.getSurveysByID((parseInt(this.props.surveyID)))
            .then((res) => {
                this.setState({
                    complete: res.data,
                    surveyCompanyName: res.data.companyName,
                    surveyDescription: res.data.description,
                    surveyMultiSelect: res.data.multiSelect,
                    surveyName: res.data.name,
                    surveyQuestion: res.data.question,
                    activeStep: 0
                })
            })
            .catch(err => console.log(err))
    }



    calculateParticipantCount = () => {
        let count = 0;
        let id = parseInt(this.state.surveyID);
        let relevantData = this.state.data.find(element => element.includes(id));
        if(typeof relevantData === "undefined"){}
        else {
            for (let i = 0; i < relevantData.length; i++) {
                if (typeof relevantData[i] === "object") {
                    count = count + relevantData[i].y;
                }
            }
            return count;
        }
    }

    displayData = () => {
        let id = parseInt(this.state.surveyID);
        const response = this.state.data.find(element => element.includes(id));
        return response;
    }

    // Stepper for general Information about Survey
    getSteps = () => {
        return["Survey Name", "Survey Frage", "Beschreibung" ]
    }

    getStepContent = (step) => {
        switch (step){
            case 0:
                return this.state.surveyName;
            case 1:
                return this.state.surveyQuestion;
            case 2:
                return this.state.surveyDescription;
            default:
                return "Unbekannter Schritt";
        }

    }

    getStepIcon = (step) => {
        switch (step){
            case 0:
                return <DescriptionIcon />
            case 1:
                return <LiveHelpIcon />
            case 2:
                return <SubjectIcon />
            default:
                return "Unbekanntes Icon"
        }
    }


    handleStep = (step) => () =>{
        this.setState({
            activeStep: step
        })
    }


    render(){
        const steps = this.getSteps();
        //CSS Styles
        const paperHeadingSurvey = {
            fontWeight: "bold",
            textAlign: "center"

        }
        const teilnehmerZahl = {
            textAlign: "center",
            fontWeight: "bold"
        }
        const companyButton = {
            pointerEvents: "none",
            float: "right",
            display: "inline"
        }
        const questionHeader = {
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
            display: "contents"
        }

        return(
            <React.Fragment>
                {console.log("complete", this.state.complete)}
                <Dialog
                    style={{backgroundColor: "transparent", boxShadow:"none"}}
                    fullWidth={true}
                    maxWidth="xl"
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <DialogTitle style={{backgroundColor: "#254563"}}>
                        <Typography variant="h4" style={questionHeader}>{this.state.surveyQuestion}</Typography>
                        <Button variant="contained" color="secondary" style={companyButton}>{this.state.surveyCompanyName + "®"}</Button>
                    </DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <Grid container spacing={6} direction="row" alignItems="stretch">
                            <Grid item xs={4}>
                                <Paper square={true} style={{height: "100%"}}>
                                    <Box display="flex" justifyContent="center" m={1} p={1} overflow="hidden">
                                        <Box pt={2}>
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Ergebnis</Typography>
                                            <Box p={1}>
                                                <PieChart
                                                    type="doughnut"
                                                    palette="Bright"
                                                    dataSource={this.displayData()}
                                                    innerRadius={0.7}
                                                >
                                                    <Legend
                                                        position="outside"
                                                        horizontalAlignment="center"
                                                        verticalAlignment="bottom"
                                                    />
                                                    <Series valueField="y" argumentField="x">
                                                        <Label visible={true} position="columns">
                                                            <Connector visible={true} width={3}/>
                                                        </Label>
                                                    </Series>
                                                    <Size width={300}/>
                                                </PieChart>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper square={true} style={{height: "100%"}}>
                                    <Box display="flex" justifyContent="center" m={1} p={1} overflow="hidden" >
                                        <Box pt={2}>
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Teilnehmeranzahl</Typography>
                                            <Box pt={16}>
                                                <Typography color="primary" variant="h1" style={teilnehmerZahl}>{this.calculateParticipantCount()}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/*SurveyInformation*/}
                            <Grid item xs={4}>
                                <Paper square={true} style={{height: "100%"}}>
                                    <Box m={1} p={1} overflow="hidden" >
                                        <Box pt={2}>
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Information</Typography>
                                            <Box p={3} pt={5}>
                                                <Paper style={{backgroundColor: "#839fc2"}}>
                                                    <Box p={1}>
                                                        <Typography variant="h6" style={{fontWeight: "bold", textAlign: "center"}}>MultiSelect</Typography>
                                                        <Box style={{textAlign: "center"}}>
                                                            {this.state.surveyMultiSelect ? <CheckIcon fontSize="large" style={{fill: "green"}}/> : <ClearIcon fontSize="large" style={{fill: "red"}}/>}
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                                <Box pt={8}>
                                                    <Stepper activeStep={this.state.activeStep} orientation="vertical" nonLinear style={{width: "100%"}}>
                                                        {steps.map((label, index) => (
                                                            <Step key={label}>
                                                                <StepButton onClick={this.handleStep(index)} icon={this.getStepIcon(index)}>
                                                                    {label}
                                                                </StepButton>
                                                                <StepContent>
                                                                    <Typography>{this.getStepContent(index)}</Typography>
                                                                </StepContent>
                                                            </Step>
                                                        ))}
                                                    </Stepper>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/*Ergebnis im Lauf der Zeit*/}
                            <Grid item xs={8}>
                                <Paper>Testing</Paper>
                            </Grid>
                            {/*Herkunftsländer*/}
                            <Grid item xs={4}>
                                <Paper>Testing</Paper>
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}
