import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    Typography,
    Button,
    FormControlLabel,
    Switch
} from "@material-ui/core";
import { Chart, CommonSeriesSettings, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';
import PieChart, {
    Legend,
    Series,
    Connector, Size
} from 'devextreme-react/pie-chart';
import { withStyles } from '@material-ui/core/styles';
import * as surveyService from "../../../services/survey/embeddedSurvey-service";
import moment from 'moment';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {ErrorModal} from "../../Home/ErrorHandling/ErrorModal";
let _ = require('lodash');

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
        const {data: chartData} = this.state;
        return(
            <React.Fragment>
                {console.log(chartData)}
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
                                            {this.state.surveyQuestion}
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

                                            <div style={{ marginTop: "10px", marginLeft: "10px"}}>
                                                <Chart
                                                    id="chart"
                                                    dataSource={chartData}
                                                    palette="Bright"
                                                >
                                                    <CommonSeriesSettings argumentField={this.state.monthlyView ? "month" : "week"} type="stackedBar"/>
                                                    {this.state.answerOptionsMinimized.map((answer) => {
                                                        return(
                                                            <Series valueField={answer} name={answer}/>
                                                        )
                                                    })}
                                                    <ValueAxis position="left"></ValueAxis>
                                                    <Legend
                                                        visible={true}
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
                                                    {/*<Size width={700}/>*/}

                                                </Chart>
                                            </div>

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

