import React from 'react';
import Header from "../Header/Header";
import * as surveyService from "../../../services/overview/overview-service";
import {
    Container,
    Grid,
    Card,
    CardHeader,
    IconButton,
    CardMedia,
    CardActions,
    Button,
    CardContent,
    Typography, FormControl, Dialog, DialogContent, DialogContentText, DialogActions, Paper
} from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Helmet} from "react-helmet";
import { ModalComponent } from "./ModalComponent"
import {CopyToClipboard} from 'react-copy-to-clipboard';

import PieChart, {
    Series,
    Label,
    Size,
    Connector,
    SmallValuesGrouping,
    Legend
} from 'devextreme-react/pie-chart';
import {postDeleteSurvey} from "../../../services/survey/deleteSurvey-service";
import Cookies from "universal-cookie/es6";

export class Overview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            allSurveys: [],
            data: [],
            modalOpen: false,
            modalButtonID: null,
            surveyName: "",
            cookies: new Cookies(),
            shareOpen: false,
            iFrame:""
            //deleteEvent: false
        }
    }


    componentDidMount() {
        this.fillState();
    }

    fillState = () =>{
        surveyService.getAllSurveys()
            .then((res) => {
                this.setState({allSurveys: res.data})
            })
            .then(() =>{
                for (let i=0; i < this.state.allSurveys.length; i++){
                    this.getData(this.state.allSurveys[i].id)
                }
                this.forceUpdate()
            })
            .catch(err => console.log(err));
    }

    getData = (id) => {
         surveyService.getSurveyAnswerCount(id)
             .then((res) => {
                 let surveyAnswerCounts = res.data;
                 return surveyAnswerCounts
             })
             .then((surveyAnswerCounts) => {
                 let dataArray = [];
                 surveyAnswerCounts.map((entry) => {
                     let insertObject = {x: null, y: null};
                     insertObject.x = entry.answerOption.value;
                     insertObject.y = entry.count;
                     dataArray.push(insertObject);

                 })
                dataArray.push(id)
                 this.setState(prevState => ({
                     data: [...prevState.data, dataArray]
                 }));
             })
             .catch(err => console.log(err));

     }

     displayData = (id) => {
         const response = this.state.data.find(element => element.includes(id)) ? this.state.data.find(element => element.includes(id)) : [];
         return response;
     }

     handleModalOpen = (event) => {
        this.setState({
            modalButtonID: event.target.parentNode.id,
            modalOpen: true
        });
     }

     handleModalClose =() => {
        this.setState({modalOpen: false})
     }


    handleEmbeddedShareClick = (surveyID, event) => {
        this.createIFrame(surveyID)
        this.setState({shareOpen: true})
    }

    handleClose = () => {
        this.setState({shareOpen: false})
    }

     deleteSurvey = (surveyID, event) => {
         postDeleteSurvey(surveyID)
             .then((res) => {
                 window.location.reload();
             })
             .catch(err => console.log(err));
     }

    createIFrame = (surveyID) => {
        return (this.iFrame = "<iframe src=\"http://api.tutorialfactory.org:8088/survey?id="+ surveyID +  "\"></iframe>")
    }

    render(){

        let CodeBlockStyle = {"background":"#f4f4f4","border":"1px solid #ddd","borderLeft":"3px solid #f36d33","color":"#666","pageBreakInside":"avoid","fontFamily":"monospace","fontSize":"15px","lineHeight":"1.6","marginBottom":"1.6em","maxWidth":"100%","overflow":"auto","padding":"1em 1.5em","display":"block","wordWrap":"break-word"};

        if (this.state.cookies.get("authKey") ==undefined ) this.props.history.push('/login');
        return(

            <React.Fragment>
                <Header header={0}/>
                <Helmet>
                    <style>{'body { background-color: #d4d7dd; }'}</style>
                </Helmet>
                <Container>
                    <Grid container spacing={6} style={{marginTop: "10px"}}>
                        {this.state.allSurveys.map((survey) => (
                            <Grid item xs = {4}>
                                <FormControl fullWidth={true}>
                                    <Card raised={true} style={{height: "100%", display: "flex", flexDirection:"column", flexShrink: 0}} id={survey.id}>
                                        <CardHeader title={survey.name}
                                                    action={<IconButton>
                                                                <ShareIcon />
                                                            </IconButton>}
                                                    onClick={(evt) => this.handleEmbeddedShareClick(survey.id, evt)}/>
                                        <CardMedia>
                                            <PieChart
                                                dataSource={this.displayData(survey.id)}
                                                palette="Bright"
                                                type="doughnut"
                                                style={{marginLeft: "20px"}}
                                            >
                                                <Series valueField="y" argumentField="x">
                                                    <SmallValuesGrouping mode="topN" topCount={3} />
                                                    <Label visible={true} format="fixedPoint">
                                                        <Connector visible={true} width={1} />
                                                    </Label>
                                                </Series>
                                                <Legend horizontalAlignment="right" verticalAlignment="bottom" />
                                                <Size width={300} height={150}/>
                                            </PieChart>
                                        </CardMedia>
                                        <CardContent style={{display: "flex", flex: 1}}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {survey.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button color="primary" onClick={this.handleModalOpen} id={survey.id}>Auswerten</Button>
                                            <Button color="primary">Bearbeiten</Button>
                                            <Button color="primary">Vorschau</Button>
                                            <IconButton onClick={(evt) => this.deleteSurvey(survey.id, evt)}>
                                                <DeleteOutlineIcon/>
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                <Dialog fullWidth maxWidth="md" open={this.state.shareOpen} onClose={this.handleClose}>
                    <DialogContent>
                        <pre style={CodeBlockStyle}>
                             {(this.iFrame)}
                        </pre>
                    </DialogContent>
                    <DialogActions>
                        <CopyToClipboard text={this.iFrame}
                                         onCopy={this.handleClose} >
                            <Button color="primary">Copy</Button>
                        </CopyToClipboard>
                        <Button onClick={this.handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>

                {/*Full Windows with Detailed analysis*/}
                {this.state.modalOpen === true &&
                <ModalComponent open={this.state.modalOpen} onClose={this.handleModalClose} surveyID={this.state.modalButtonID} data={this.state.data}/>}
            </React.Fragment>
        )
    }
}
