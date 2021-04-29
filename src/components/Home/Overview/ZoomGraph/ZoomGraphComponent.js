import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography, IconButton, Select,
    MenuItem
} from "@material-ui/core";
import PieChart, {
    Legend,
    Series,
    Size
} from 'devextreme-react/pie-chart';
import { Chart, CommonSeriesSettings, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';

export class ZoomGraphComponent extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            dayGraphData: this.props.dayData,
            weekGraphData: this.props.weekData,
            monthGraphData: this.props.monthData,
            answerOptionsByName: this.props.answerOptionsByName,
            viewOption: "month"
        }
    }
    componentDidMount = () => {
        
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

    customizeTooltip = (arg) => {
        return {
            text: `${arg.seriesName}: ${arg.valueText}`
          };
    }

    menuChange = (event) => {
        this.setState({
            viewOption: event.target.value
        });
    }

    render(){
        return(
            <React.Fragment>
                <Dialog
                    style={{backgroundColor: "transparent", boxShadow:"none"}}
                    fullWidth={true}
                    maxWidth="lg"
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <DialogTitle style={{backgroundColor: "#254563", position: "relative"}}>
                        <Typography variant="h3" style={{fontWeight: "bold", textAlign: "center", color: "white"}}>
                            Detailed Analysis
                        </Typography>
                        <Select defaultValue="month" onChange={this.menuChange} variant="outlined" style={{position: "absolute", right: "20px", top: "15px", color: "white"}}>
                            <MenuItem value="day">Day</MenuItem>
                            <MenuItem value="week">Week</MenuItem>
                            <MenuItem value="month">Month</MenuItem>
                        </Select>
                    </DialogTitle>
                     <DialogContent style={{padding: "20px"}}>
                     <Chart
                        id="chart"
                        dataSource={this.getGraphData()}
                        palette="Bright"
                    >
                        <CommonSeriesSettings argumentField="date" type="stackedBar"/>
                        {this.state.answerOptionsByName.map((answer) => {
                            return(
                                <Series valueField={answer.value} name={answer.value}/>
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
                            zIndex={10001}
                            />
                        <Size width={1200} height={550}/>
                    </Chart>
                     </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}