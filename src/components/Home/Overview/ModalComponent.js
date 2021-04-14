import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Paper, Step, StepButton, StepContent, Stepper,
    Typography
} from "@material-ui/core";
import PieChart, {
    Legend,
    Series,
    Label,
    Connector, Size
} from 'devextreme-react/pie-chart';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import * as surveyService from "../../../services/overview/overview-service"
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import {countryMapping} from "./countries";


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
            complete: [],
            countryInfo: null


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

        surveyService.getLocationInfo((parseInt((this.props.surveyID))))
            .then((res) => {
                let raw_array = res.data;
                console.log("rawarray: ", raw_array)
                let grouped_object_countries = {};
                let grouped_object_cities = {};
                raw_array.forEach((item, index) => {
                    //Check if Country already in object
                    if(typeof grouped_object_countries[item.locationCountry] === "undefined"){
                        //Country is NOT in object yet
                        grouped_object_countries[item.locationCountry] = 0;
                    }
                    else{
                        grouped_object_countries[item.locationCountry] = grouped_object_countries[item.locationCountry] + 1;
                    }
                })
                let countriesGraphData = []
                for (let country in grouped_object_countries){
                    countriesGraphData.push({country: country, count: grouped_object_countries[country]})
                }
                this.setState({countryInfo: countriesGraphData})
            })
            .catch((err)  => console.log(err));
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

    //Helper Functions Country Graph
    getImagePath = (country) => {
        let countryCode = Object.keys(countryMapping).find(key => countryMapping[key] === country);
        console.log("coutnryCode in Method get Image", countryCode);
        countryCode = countryCode.toLowerCase();
        let imagePath = `./assets/countryFlags/${countryCode}.png`;
        return imagePath;
    }

    getCountryImage = (pieChart) => {
        if(this.state.countryInfo != null && typeof this.state.countryInfo !== "undefined") {
            const country = this.state.countryInfo[0].country;
            console.log("MAIN",this.getImagePath(country));
            return (
                <svg>
                    <image href={this.getImagePath(country)} x="25" y="60" width="30%" height="10%"/>
                    <text textAnchor="middle" x="100" y="120" style={{ fontSize: 18, fill:'#494949' }}>
                        <tspan x="70">{country}</tspan>
                        <tspan x="70" dy="20px" style={{ fontWeight: 600 }}>{
                            this.state.countryInfo[0].count
                        }</tspan>
                    </text>
                </svg>
            );
        }
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
                {console.log(this.getImagePath("Germany"))}
                <Dialog
                    style={{backgroundColor: "transparent", boxShadow:"none"}}
                    fullWidth={true}
                    maxWidth="lg"
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <DialogTitle style={{backgroundColor: "#254563"}}>
                        <Typography variant="h4" style={questionHeader}>{this.state.surveyQuestion}</Typography>
                        <Button variant="contained" color="secondary" style={companyButton}>{this.state.surveyCompanyName + "®"}</Button>
                    </DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <Grid container spacing={7} direction="row" alignItems="stretch">
                            <Grid item xs={4}>
                                <Paper square={true} style={{height: "100%", backgroundColor: "#f3f3f3"}} elevation={3}>
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
                                <Paper square={true} style={{height: "100%", backgroundColor: "#f3f3f3"}} elevation={3}>
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
                                <Paper square={true} style={{height: "100%", backgroundColor: "#f3f3f3"}} elevation={3}>
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
                                                    <Stepper activeStep={this.state.activeStep} orientation="vertical" nonLinear style={{backgroundColor: "#f3f3f3"}}>
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
                                <Paper>
                                    <p>Detailed Graph goes here</p>
                                </Paper>
                            </Grid>
                            {/*Herkunftsländer*/}
                            <Grid item xs={4}>
                                <Paper style={{height: "100%", backgroundColor: "#f3f3f3"}} elevation={3}>
                                    <Box display="flex" justifyContent="center" m={1} p={1} overflow="hidden">
                                        <Box pt={2}>
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Herkunft</Typography>
                                                <Box p={1}>
                                                    <PieChart
                                                        id="country-chart"
                                                        key="country-chart"
                                                        palette="Bright"
                                                        dataSource={this.state.countryInfo}
                                                        resolveLabelOverlapping="shift"
                                                        sizeGroup="piesGroup"
                                                        innerRadius={0.7}
                                                        type="doughnut"
                                                        centerRender={this.getCountryImage}
                                                        >
                                                        <Series
                                                        argumentField="country"
                                                        valueField="count">
                                                            <Label visible={true} position="columns">
                                                                <Connector visible={true} width={3}/>
                                                            </Label>
                                                        </Series>
                                                        <Legend
                                                            position="outside"
                                                            horizontalAlignment="center"
                                                            verticalAlignment="bottom"
                                                        />
                                                        <Size width={300}/>
                                                    </PieChart>
                                                </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}
