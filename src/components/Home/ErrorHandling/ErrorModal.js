import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Grid,
} from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export class ErrorModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMessage : "",
        };
    }

    componentDidMount() {
        this.setState({
            errorMessage: this.props.errorMessage,
        });
    }

    render(){
        return (
            <React.Fragment >
                <Dialog open={this.props.open}
                        onClose={this.props.onClose}
                        style={{marginTop: '15px'}}
                        fullWidth maxWidth="md">
                    <DialogTitle style={{backgroundColor: "#B4A0B9"}}>
                        <Grid container spacing={4} alignItems="flex-end">
                            <Grid item>
                                <ErrorOutlineIcon style={{color: "white"}}/>
                            </Grid>
                            <Grid item md={true} sm={true} xs={true} style={{fontWeight: "bold", color: "white"}}>
                                Uh oh! Something went wrong...
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid>{this.state.errorMessage}</Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button  color="primary" onClick={this.props.onClose} style={{fontWeight: "bold", textTransform: "none", backgroundColor: "#B4A0B9", color: "white" }}>CLOSE</Button>
                            <br/>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}
