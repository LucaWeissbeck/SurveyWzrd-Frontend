import React from "react";
import {Box, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography} from "@material-ui/core";
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export, Size
} from 'devextreme-react/pie-chart';
import equal from 'fast-deep-equal'


export class ModalComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: [],
            surveyID: null
        };
    }
    componentDidMount() {
        this.setState({
            data: this.props.data,
            surveyID: this.props.surveyID
        });
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

    render(){
        //CSS Styles
        const paperHeadingSurvey = {
            fontWeight: "bold",
            textAlign: "center"

        }
        const teilnehmerZahl= {
            textAlign: "center",
            fontWeight: "bold"
        }
        return(
            <React.Fragment>
                {console.log(this.state.data)}
                {console.log(this.calculateParticipantCount())}
                {console.log("This is the data from props RENDER", this.props.data)}
                <Dialog
                    style={{backgroundColor: "transparent", boxShadow:"none"}}
                    fullWidth={true}
                    maxWidth="xl"
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <DialogTitle>
                        <Typography variant="h3" style={{textAlign: "center", fontWeight: "bold"}}>Auswertung</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={6} direction="row" alignItems="stretch">
                            <Grid item xs={4}>
                                <Paper square={true} style={{height: "100%"}}>
                                    <Box display="flex" justifyContent="center" m={1} p={1} overflow="hidden">
                                        <Box pt={1}>
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
                                        <Box pt={1}>
                                            <Typography color="primary" variant="h4" style={paperHeadingSurvey}>Teilnehmeranzahl</Typography>
                                            <Box pt={15}>
                                                <Typography color="primary" variant="h1" style={teilnehmerZahl}>{this.calculateParticipantCount()}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>Testing</Paper>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper>Testing</Paper>
                            </Grid>
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
