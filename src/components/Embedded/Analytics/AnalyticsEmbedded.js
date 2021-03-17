import React from "react";
import Header from "../../Home/Header/Header";
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
import {Stack, Animation, EventTracker, HoverState} from '@devexpress/dx-react-chart';
import * as surveyService from "../../../services/survey/survey-service";
import moment from 'moment';
var _ = require('lodash');


//from DevExpress Demo
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
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
export class AnalyticsEmbedded extends React.Component {
    constructor(props) {
        moment().format();
        super(props);

        this.state = {
            monthlyView: false,
            //Graph
            currentTooltip: '',
            data: [
                {month: 'Jan', Strawberry: 10, Chocolate: 20, Vanilla: 15},
                {month: 'Feb', Strawberry: 20, Chocolate: 10, Vanilla: 5},
                {month: 'Mar', Strawberry: 4, Chocolate: 18, Vanilla: 46},
                {month: 'Apr', Strawberry: 10, Chocolate: 20, Vanilla: 15},
                {month: 'Jun', Strawberry: 10, Chocolate: 62, Vanilla: 15},
                {month: 'Jul', Strawberry: 51, Chocolate: 20, Vanilla: 15},
                {month: 'Sep', Strawberry: 5, Chocolate: 53, Vanilla: 35},
                {month: 'Oct', Strawberry: 67, Chocolate: 20, Vanilla: 15},
                {month: 'Nov', Strawberry: 42,Chocolate: 34, Vanilla: 1},
                {month: 'Dec', Strawberry: 91, Chocolate: 87, Vanilla: 34}
            ],
            //API Survey General
            surveyCompanyName: "",
            surveyQuestion: "",
            surveyName: "",
            surveyDescription: "",
            answerOptions: [],

            //API Survey Feedback (Answers)
            surveyFeedbackArrayComplete: [],
            surveyFeedbackArrayMinimized: [],
            timeObjects: []
        };
    }

    // API Calls in CDM
    async componentDidMount() {
        surveyService.getSurveysByID(16)
            .then((res) => {
                this.setState({
                    surveyName: res.data.name,
                    surveyDescription: res.data.description,
                    surveyQuestion: res.data.question,
                    surveyCompanyName: res.data.companyName
                })
            })
            .catch(err => console.log(err))

        surveyService.getSurveyAnswersAnalysis(16)
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
                    this.fillData();
                }

            })
            .catch(err => console.log(err))

        surveyService.getAnswerOptionsByID(16)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.setState(prevState => ({
                        answerOptions: [...prevState.answerOptions, res.data[i]]
                    }))
                }
            })
            .catch(err => console.log(err));


    }

    //Handling Component Change
    handleTooltipChange = (target) =>{
        try{
            let portionQuantity = ((this.state.data[target.point])[target.series]).toString()
            this.setState({currentTooltip: (target.series + " " + portionQuantity)})
        } catch(error){}
    }
    onTimeSwitch = (event) => {
        this.setState({
            monthlyView: event.target.checked
        });
    }

    //Get HTML
    getContentComponent = () =>{
        return this.state.currentTooltip;
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
        if (!this.state.monthlyView){
            const weekArray = this.groupByTime(this.state.surveyFeedbackArrayMinimized, "week")
            let countArray = []
            let answerOptions = []
            let id = this.state.answerOptions
            for(let j = 0; j < this.state.answerOptions.length; j++){
                answerOptions.push(this.state.answerOptions[j].value)
            }
            for (const date in weekArray){
                let tempArray = []
                for(let i = 0; i < answerOptions.length; i++){
                    const valueName = answerOptions[i];
                    const count = weekArray[date].filter((obj) => obj.valueName === valueName).length;
                    tempArray.push(count)
                }
                countArray.push({week: date,
                                 choices: tempArray,})
            }
            console.log(countArray)


            //New


        }
    }


    TooltipContent = (props) => {
        const { targetItem, text, ...restProps } = props;
        return (
            <div>
                <div>
                    <Tooltip.Content
                        {...restProps}
                        style={tooltipContentTitleStyle}
                        text={(this.state.data[targetItem.point].month)}
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
                                    <img src={"./assets/survey_wzrd_logo_ideas.svg"} style={{width: "180px"}}/>
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
                                            <Chart data={chartData}>
                                                <ArgumentAxis />
                                                <ValueAxis max={2700} />
                                                <BarSeries
                                                    name = "Strawberry"
                                                    valueField = "Strawberry"
                                                    argumentField = "month"
                                                    color = "#8aaccc"
                                                    barWidth = "0.4"
                                                />
                                                <BarSeries
                                                    name = "Chocolate"
                                                    valueField = "Chocolate"
                                                    argumentField = "month"
                                                    color = "#4a6687"
                                                    barWidth = "0.4"
                                                />
                                                <BarSeries
                                                    name = "Vanilla"
                                                    valueField = "Vanilla"
                                                    argumentField = "month"
                                                    color = "#394760"
                                                    barWidth = "0.4"
                                                />
                                                <Animation />
                                                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
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
                                        </Paper>
                                    </FormControl>
                                </CardActions>
                            </CardContent>
                            <div style={{backgroundColor: "#254563", height: "10px"}} />
                        </Card>
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}

