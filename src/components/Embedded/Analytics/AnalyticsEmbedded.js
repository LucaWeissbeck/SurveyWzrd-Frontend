import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    Paper,
    Typography,
    Button,
    FormControlLabel,
    Switch
} from "@material-ui/core";
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Plugin } from "@devexpress/dx-react-core";
import {Stack, Animation, EventTracker, HoverState} from '@devexpress/dx-react-chart';
import * as surveyService from "../../../services/survey/embeddedSurvey-service";
import moment from 'moment';
import * as url from "url";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {ErrorModal} from "../../Home/ErrorHandling/ErrorModal";
let _ = require('lodash');


//from DevExpress Demo
const legendStyles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});

const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);

const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

const tooltipContentTitleStyle = {
    fontWeight: 'bold',
    paddingBottom: 0,
    textAlign: "center",
};

const tooltipContentBodyStyle = {
    paddingTop: 0,
};



// MAIN
export class AnalyticsEmbeddedBare extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        moment().format();
        super(props);
        let urlSurveyID = new URLSearchParams(this.props.location.search).get("id")

        this.state = {
            reload: false,
            monthlyView: false,
            //Graph
            currentTooltip: '',
            data: [],
                /*{month: 'Jan', Strawberry: 10, Chocolate: 20, Vanilla: 15},
                {month: 'Feb', Strawberry: 20, Chocolate: 10, Vanilla: 5},
                {month: 'Mar', Strawberry: 4, Chocolate: 18, Vanilla: 46},
                {month: 'Apr', Strawberry: 10, Chocolate: 20, Vanilla: 15},
                {month: 'Jun', Strawberry: 10, Chocolate: 62, Vanilla: 15},
                {month: 'Jul', Strawberry: 51, Chocolate: 20, Vanilla: 15},
                {month: 'Sep', Strawberry: 5, Chocolate: 53, Vanilla: 35},
                {month: 'Oct', Strawberry: 67, Chocolate: 20, Vanilla: 15},
                {month: 'Nov', Strawberry: 42,Chocolate: 34, Vanilla: 1},
                {month: 'Dec', Strawberry: 91, Chocolate: 87, Vanilla: 34}*/
            urlSurveyID: urlSurveyID,
            //API Survey General
            surveyCompanyName: "",
            surveyQuestion: "",
            surveyName: "",
            surveyDescription: "",
            answerOptions: [],
            answerOptionsMinimized: [],

            //API Survey Feedback (Answers)
            surveyFeedbackArrayComplete: [],
            surveyFeedbackArrayMinimized: [],
            timeObjects: []
        };
    }

    fixGraph = () =>{
        this.forceUpdate();
    }

    // API Calls in CDM
    async componentDidMount() {
        surveyService.getSurveysByID(this.state.urlSurveyID)
            .then((res) => {
                this.setState({
                    surveyName: res.data.name,
                    surveyDescription: res.data.description,
                    surveyQuestion: res.data.question,
                    surveyCompanyName: res.data.companyName
                })
            })
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });

        surveyService.getSurveyAnswersAnalysis(this.state.urlSurveyID)
            .then((res) => {
                this.setState({
                    surveyFeedbackArrayComplete: res.data
                })
                for(let i=0; i < this.state.surveyFeedbackArrayComplete.length; i++) {
                    let copyObject = this.state.surveyFeedbackArrayComplete[i];
                    delete copyObject.answerOptionID;
                    delete copyObject.id;
                    this.setState(prevState => ({
                        surveyFeedbackArrayMinimized: [...prevState.surveyFeedbackArrayMinimized, copyObject]
                    }));
                }
            })
            .then(() => {
                this.state.monthlyView ? this.fillData("month") : this.fillData("week");
            })
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });

        surveyService.getAnswerOptionsByID(this.state.urlSurveyID)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.setState(prevState => ({
                        answerOptions: [...prevState.answerOptions, res.data[i]]
                    }))
                }
            })
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });
    }

    //Handling Component Change
    handleTooltipChange = (target) =>{
        try{
            let portionQuantity = ((this.state.data[target.point])[target.series]).toString()
            this.setState({currentTooltip: (target.series + " " + portionQuantity)})
        } catch(error){}
    }
    onTimeSwitch = () => {
        let toBeMonthlyView = !this.state.monthlyView;
        this.setState({
            monthlyView: toBeMonthlyView
        },this.fillData
        )

    }

    //Get HTML
    getContentComponent = () => {
        return this.state.currentTooltip;
    }

    getBarsGraph = () => {
        let colours = [ "#c4b1c9", "#f7e3fc", "#8aaccc","#e6bb56", "#264664", "#839fc2"];
        return(
            <Plugin name="Bars">
                {this.state.answerOptions.map(answer => (
                    <div>
                        <BarSeries
                            name = {answer.value}
                            valueField = {answer.value}
                            argumentField = {this.state.monthlyView ? "month" : "week"}
                            color = {colours.pop()}
                            barWidth = "0.4"
                        />
                    </div>
                ))}
            </Plugin>
        );
    }


    //Helper functions
    groupByTime = (results, format) => {
        if (format === "week") {
            return _.groupBy(results, (result) => moment(result['timestamp'], 'DD-MM-YYYY').startOf('isoWeek'));
        }
        else if(format === "month"){
            return _.groupBy(results, (result) => moment(result['timestamp'], 'DD-MM-YYYY').startOf('month'));
        }
        else{
            return "Missing or false dateformat"
        }
    }

    //Fill Data
    fillData = () => {
        //Clear Array if content inside
        if (this.state.data.length || this.state.answerOptionsMinimized.length > 0) {
            this.setState({
                data: [],
                answerOptionsMinimized: []
            })
        }
        let timespan = this.state.monthlyView ? "month" : "week";
        const timespanArray = this.groupByTime(this.state.surveyFeedbackArrayMinimized, timespan)
        let countArray = []
        let answerOptions = []
        for (let j = 0; j < this.state.answerOptions.length; j++) {
            answerOptions.push(this.state.answerOptions[j].value)
        }
        this.setState({
            answerOptionsMinimized: answerOptions
        })

        for (const date in timespanArray) {
            let occurrencesInObject = []
            for (let i = 0; i < answerOptions.length; i++) {
                const valueName = answerOptions[i];
                //Counting occurences of Values in Object
                const count = timespanArray[date].filter((obj) => obj.valueName === valueName).length;
                occurrencesInObject.push(count);
            }
            //Object for final use
            let tempObj = {};
            tempObj[timespan] = date;
            tempObj["choices"] = occurrencesInObject;
            countArray.push(tempObj);
        }
        //Converting Timestmap in countArray
        let arrayOfObjects = [];
        for (let i = 0; i < countArray.length; i++) {
            let resultObject = {};
            let convertedDate = countArray[i][timespan].substring(0, countArray[i][timespan].length - 17);
            resultObject[timespan] = convertedDate;
            for (let j = 0; j < countArray[i].choices.length; j++) {
                resultObject[answerOptions[j]] = countArray[i].choices[j];
            }
            arrayOfObjects.push(resultObject);
        }
        //Pushing every item(Object with Timestamp and AnswerOptions with corresponding count)
        arrayOfObjects.sort(function(a,b){
            return new Date(a[timespan]) - new Date(b[timespan])
        })
        this.setState({
            data: arrayOfObjects
        })
        this.forceUpdate();
    }

    TooltipContent = (props) => {
        let timespan = this.state.monthlyView ? "month" : "week";
        const { targetItem, text, ...restProps } = props;
        return (
            <div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentTitleStyle}
                        text={(this.state.data[targetItem.point][timespan])}
                    />
                </div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentBodyStyle}
                        text={targetItem.series + " " + this.state.data[targetItem.point][targetItem.series]}
                    />
                </div>
            </div>
        );
    };

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
        const {data: chartData} = this.state;
        return(
            <React.Fragment>
                <Container>
                    <Container maxWidth="lg" style={{marginTop: '15px' }}>
                        <Card>
                            <CardHeader
                                titleTypographyProps={{variant:'h5' }}
                                avatar={
                                    <img src="/assets/logo_with_text.png" style={{width: "180px", height:"80px", marginBottom: "-5px"}}/>
                                }
                                action={
                                    <Button variant="contained" color="secondary" style={{pointerEvents: "none"}}>{this.state.surveyCompanyName + "®"}</Button>
                                }
                                style={{backgroundColor: "#254563", color: 'white', height: "35px", textAlign: "right"}}>
                            </CardHeader>
                            <CardContent>
                                <CardActions>
                                    <FormControl fullWidth={true}>
                                        <Typography variant="h5" component="h2" style={{fontWeight: "bold"}}>
                                            Survey Results
                                        </Typography>
                                        <Typography style={{marginBottom: 12}} color="textSecondary">
                                            See what other people voted!
                                        </Typography>
                                        <div style={{display: "inline"}}>
                                            <label style={{marginRight: "12px"}}>Weekly</label>
                                            <FormControlLabel
                                                value="start"
                                                control={<Switch checked={this.state.monthlyView} onChange={this.onTimeSwitch} color="primary" />}
                                                label="Monthly"
                                                labelPlacement="end"
                                            />
                                        </div>
                                        <Paper elevation={2} square={true}>
                                            <div style={{overflow: "scroll"}}>
                                                <Chart data={chartData}>
                                                    <ArgumentAxis />
                                                    <ValueAxis max={2700} />
                                                    {this.getBarsGraph()}
                                                    <Animation />
                                                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} rowCount={3}/>
                                                    <Title text={this.state.surveyQuestion} />
                                                    <EventTracker />
                                                    <Tooltip onTargetItemChange={this.handleTooltipChange} contentComponent={this.TooltipContent}/>
                                                    <Stack
                                                        stacks={[
                                                            {series: ['Strawberry', 'Chocolate', 'Vanilla']}
                                                        ]}
                                                    />
                                                    <HoverState />
                                                </Chart>
                                            </div>
                                        </Paper>
                                    </FormControl>
                                </CardActions>
                            </CardContent>
                            <div style={{backgroundColor: "#254563", height: "10px"}} />
                        </Card>
                    </Container>
                </Container>


                {this.state.errorOpen === true &&
                <ErrorModal open={this.state.errorOpen} onClose={this.handleErrorClose} errorMessage={this.state.errorMessage}/>}
            </React.Fragment>
        )
    }
}
export const AnalyticsEmbedded = withRouter(AnalyticsEmbeddedBare);

