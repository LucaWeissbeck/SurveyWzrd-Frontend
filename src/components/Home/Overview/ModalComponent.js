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


export class ModalComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: []
        }
    }
    componentDidMount() {
        this.setState({data: this.props.data})
    }

    //Makes sure that props are always up to date: Important as props rely on API call (may include latency)
    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps){
            this.setState({
                data: nextProps.data
            })
        }
    }

    displayData = (id) => {
        if(this.state.data.length != 0){
            id = parseInt(id);
            const response = this.state.data.find(element => element.includes(id)) ? this.state.data.find(element => element.includes(id)) : [];
            console.log("Method for data response", response);
            return response;}
        else{
            console.log("Timeout")
            setTimeout(this.forceUpdate, 1000)
        }
    }

    render(){
        //CSS Styles
        const paperHeading = {
            textAlign: "center",
            paddingTop: "20px",
            fontWeight: "bold",

        }
        const surveyResultsDiv = {
            width: "100%",
            height: "auto"
        }
        return(
            <React.Fragment>
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
                        <Grid container spacing={6}>
                            <Grid item xs={4}>
                                <Paper square={true} >
                                        <Typography color="primary" variant="h4" style={paperHeading}>Ergebnis</Typography>
                                        <Box display="flex" justifyContent="center" m={1} p={1} overflow="hidden">
                                            <Box p={1}>
                                                <PieChart
                                                    style={surveyResultsDiv}
                                                    type="doughnut"
                                                    palette="Bright"
                                                    dataSource={this.displayData(this.props.surveyID)}
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
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper square={true}>Testing</Paper>
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
