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
    ButtonGroup,
    CardContent,
    Typography, FormControl, Modal, Fade, Backdrop, Dialog, DialogTitle, DialogContent, Paper
} from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Helmet} from "react-helmet";
import { ModalComponent } from "./ModalComponent"

import { Animation } from '@devexpress/dx-react-chart';
import PieChart, {
    Series,
    Label,
    Size,
    Connector,
    SmallValuesGrouping,
    Legend
} from 'devextreme-react/pie-chart';
import {getAllSurveys} from "../../../services/overview/overview-service";

export class Overview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            allSurveys: [],
            data: [],
            modalOpen: false,
            modalButtonID: null
        }
    }


    componentDidMount() {
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
        this.setState({modalOpen: true, modalButtonID: event.target.parentNode.id})
     }

     handleModalClose =() => {
        this.setState({modalOpen: false})
     }


    render(){
        //Styled
        const paper ={
            position: "absolute",
            width: 400,

        }
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
                                        <CardHeader
                                            title={survey.name}
                                            action={
                                                <IconButton>
                                                    <ShareIcon />
                                                </IconButton>
                                            }
                                        />

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
                                            <IconButton>
                                                <DeleteOutlineIcon/>
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Container>


                {/*Full Windows with Detailed analysis*/}
                {console.log("MainComp",this.state.data)}
                <ModalComponent open={this.state.modalOpen} onClose={this.handleModalClose} surveyID={this.state.modalButtonID} data={this.state.data}/>


            </React.Fragment>
        )
    }
}
