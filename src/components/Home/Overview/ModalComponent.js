import React from "react";
import {Dialog, DialogContent, DialogTitle, Grid, Paper, Typography} from "@material-ui/core";
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
            data: this.props.data
        }
    }


    render(){
        const paperHeading ={
            textAlign: "center",
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
                    <DialogTitle>Auswertung {this.props.surveyID}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={6}>
                            <Grid item xs={4}>
                                <Paper square={true} >
                                    <div>
                                        <Typography variant="h4" style={paperHeading}>Ergebnis</Typography>
                                        <PieChart
                                            type="doughnut"
                                            palette="Soft Pastel"
                                            dataSource={this.state.data.find(element => element.includes(this.props.surveyID))}
                                        >
                                            <Series argumentField="x">
                                                <Label visible={true}>
                                                    <Connector visible={true}/>
                                                </Label>
                                            </Series>
                                            <Size width={2000} height={1000}/>
                                        </PieChart>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>Testing</Paper>
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
