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
import moment from 'moment';
import { Chart, CommonSeriesSettings, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {ErrorModal} from "../ErrorHandling/ErrorModal";
let _ = require('lodash');

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
            countryInfo: [],
            isFirstLevelGraph: true,
            monthData: [],
            weekData: [],
            dayData: [],
            answerOptionsByName: [],
            viewOption: "month",
            dayGraphData: [],
            weekGraphData: [],
            monthGraphData: [],
            detailedSurvey: false,
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
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });

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
                        grouped_object_countries[item.locationCountry] = 1;
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
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });

        surveyService.getSurveyResults((parseInt((this.props.surveyID))))
        .then((res) => {
            console.log("This is Data", res.data);
            return res.data;
        })
        .then((data) => {
            //Data is now grouped into months, weeks and days
            console.log("Raw API Data", data);
            let weeks = this.groupByTime(data, "week");
            console.log("Grouped by Week Data", weeks);
            let months = this.groupByTime(data, "month");
            console.log("Grouped by Month Data", months);
            let days = this.groupByTime(data, "day");
            console.log("Grouped by Day", days);

            this.setState({
                monthData: months,
                weekData: weeks,
                dayData: days
            });
        })
        .then(() => {
            let dayGraph = this.createGraphData(this.state.dayData);
            let weekGraph = this.createGraphData(this.state.weekData);
            let monthGraph = this.createGraphData(this.state.monthData);
            this.setState({
                dayGraphData: dayGraph,
                weekGraphData: weekGraph,
                monthGraphData: monthGraph
            })
            console.log("COUNTS", dayGraph, weekGraph, monthGraph)
        })
        .catch(err => {
            this.handleErrorOpen(err.response.data.error);
            console.log(err.response.data.error);
            console.log(err);
        });

        surveyService.getAnswerOptionsByID((parseInt((this.props.surveyID))))
        .then((res) => {
            this.setState({
                answerOptionsByName: res.data
            });
        })
        .catch(err => {
            this.handleErrorOpen(err.response.data.error);
            console.log(err.response.data.error);
            console.log(err);
        });

    }


    replaceAnswerID = (data) =>{
        let new_array = data.map((entry) => {
            let foundObject = this.state.answerOptionsByName.find((element) => {
                if(element.id === entry.id){
                    return true;
                }
            })
            try{
                entry["answerOptionID"] = foundObject.value;
            }catch(err){
                entry["answerOptionID"] = "undefined";
            }
            
        })

        return new_array;
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
        return["Survey Name", "Survey Question", "Description" ]
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
                return "Unknown Step";
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

    menuChange = (event) =>{
        this.setState({
            viewOption: event.target.value
        })
    }

    //Helper Functions Country Graph
    getImagePath = (country) => {
        let countryCode = Object.keys(countryMapping).find(key => countryMapping[key] === country);
        countryCode = countryCode.toLowerCase();
        let imagePath = `/assets/countryFlags/${countryCode}.png`;
        return imagePath;
    }

    getCountryImage = () => {
        if(this.state.countryInfo.length != 0 && typeof this.state.countryInfo[0] !== "undefined") {
            let array = this.state.countryInfo
            let maxCount = Math.max(...array.map(e => e.count));
            let country = array.find(game => game.count === maxCount);
            country = country.country;
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


    //Helper Function Detailed Graph
    groupByTime = (results, format) => {
        if (format === "week") {
            return _.groupBy(results, (result) => moment(result['timestamp'], 'DD-MM-YYYY').startOf('isoWeek'));
        }
        else if(format === "month"){
            return _.groupBy(results, (result) => moment(result['timestamp'], 'DD-MM-YYYY').startOf('month'));
        }
        else if(format === "day"){
            return _.groupBy(results, (result) => moment(result['timestamp'], 'DD-MM-YYYY').startOf('day'));
        }
        else{
            return "Missing or false dateformat"
        }
    }

    getGraphData = () =>{
        switch(this.state.viewOption){
            case "month":
                return this.state.monthGraphData;
            case "week":
                return this.state.weekGraphData;
            case "day":
                return this.state.dayGraphData;
            default:
                return [];
    
        }
    }

    createGraphData = (rawUnpreparedData) => {
        let graphData = [];
        console.log("Raw unprepared data", rawUnpreparedData);
        for (const [key, value] of Object.entries(rawUnpreparedData)){
            let graphEntry = {}
            graphEntry["date"] = key;
            

            let tempResult = {};
            for (let {valueName} of value){
                tempResult[valueName] = {
                    valueName,
                    count: tempResult[valueName] ? tempResult[valueName].count + 1 : 1
                }
            }
            let result = Object.values(tempResult);
            console.log("result", result);

            for(let i = 0; i < result.length; i++){
                graphEntry[result[i].valueName] = result[i].count;
            }
            graphData.push(graphEntry);
            console.log(graphData);
            
        }
        return graphData
    }
    
    determineGraphDataSource = () => {
        if(this.state.viewOption === "day"){
            return this.state.dayGraphData;
        }
        else if(this.state.viewOption === "week"){
            return this.state.weekGraphData;
        }
        else if(this.state.viewOption === "month"){
            return this.state.monthGraphData;
        }
        else{
            return [];
        }
    }

    customizeTooltip = (arg) => {
        return {
            text: `${arg.seriesName}: ${arg.valueText}`
          };
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

    render(){
        const steps = this.getSteps();
        //CSS Styles
        const paperHeadingSurvey = {
            fontWeight: "bold",
            textAlign: "center"

        }
        const participantCount = {
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
                {console.log("current Target", this.state.anchorEl)}
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
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Result</Typography>
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
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Participant Count</Typography>
                                            <Box pt={16}>
                                                <Typography color="primary" variant="h1" style={participantCount}>{this.calculateParticipantCount()}</Typography>
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
                                <Paper square={true} style={{height: "100%", backgroundColor: "#f3f3f3"}} elevation={3}>
                                <Box pt={2}>
                                    <div style={{textAlign: "center", position: "relative"}}>
                                        <Typography color="primary" variant="h4" style={{fontWeight: "bold", textAlign: "center", display: "inline"}}>Information</Typography>
                                        <Select defaultValue="month" onChange={this.menuChange} variant="outlined" style={{position: "absolute", right: "10px", top: "-7px"}}>
                                            <MenuItem value="day">Day</MenuItem>
                                            <MenuItem value="week">Week</MenuItem>
                                            <MenuItem value="month">Month</MenuItem>
                                        </Select>

                                    </div>
                                        <div style={{padding: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "100%", width: "100%", padding: "10px 0 10px 10px", overflow: "hidden"}}>
                                            <Chart
                                                id="chart"
                                                dataSource={this.getGraphData()}
                                            >
                                                {console.log("Dertmined Data Source", this.state.dayGraphData)}
                                                <CommonSeriesSettings argumentField="date" type="stackedBar"/>
                                                {this.state.answerOptionsByName.map((answer) => {
                                                    return(
                                                        <Series valueField={answer.value} name={answer.value}/>
                                                    )
                                                })}
                                                <ValueAxis position="left"></ValueAxis>
                                                <Legend
                                                    visible={this.state.detailedSurvey}
                                                    orientation="horizontal"
                                                    horizontalAlignment="center" 
                                                    verticalAlignment="bottom"
                                                    posiition="outside">
                                                </Legend>
                                                <Tooltip
                                                    enabled={true}
                                                    customizeTooltip={this.customizeTooltip}
                                                    zIndex={10000}
                                                    />
                                                <Size width={700}/>
                                            
                                            </Chart>
                                        </div>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/*Herkunftsländer*/}
                            <Grid item xs={4}>
                                <Paper style={{height: "100%", backgroundColor: "#f3f3f3"}} elevation={3}>
                                    <Box display="flex" justifyContent="center" m={1} p={1} overflow="hidden">
                                        <Box pt={2}>
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Location</Typography>
                                                <Box p={1}>
                                                    {this.state.countryInfo.length !== 0 &&
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
                                                    }
                                                    {this.state.countryInfo.length === 0 &&
                                                        <h4>Check back later!</h4>
                                                    }
                                                </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>


                {this.state.errorOpen === true &&
                <ErrorModal open={this.state.errorOpen} onClose={this.handleErrorClose} errorMessage={this.state.errorMessage}/>}
            </React.Fragment>
        )
    }
}
