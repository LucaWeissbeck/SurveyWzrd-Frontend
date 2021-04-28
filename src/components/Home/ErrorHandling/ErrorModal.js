import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Grid,
} from "@material-ui/core";

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
                    <DialogTitle style={{backgroundColor: "#e9c261"}}>
                        Uh oh! Something went wrong...
                    </DialogTitle>
                    <DialogContent style={{backgroundColor: "#e9c261"}}>
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
