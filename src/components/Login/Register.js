import React from 'react';
import {
    Button,
    Dialog, DialogContent, DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core";
import {Face, Fingerprint} from "@material-ui/icons";
import {postRegister} from "../../services/user/register-service";
import {postLogin} from "../../services/user/login-service";
import Cookies from "universal-cookie";
import {ErrorModal} from "../Home/ErrorHandling/ErrorModal";

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            cookies: new Cookies(),
            errorOpen: false,
        };
    }

    setEmail = event => {
        this.setState({
            email: event.target.value
        });
    };

    setPassword = event => {
        this.setState({
            password: event.target.value
        });
    };

    componentDidMount() {

    }

    registerActionSubmit = () => {

        postRegister(this.state.email, this.state.password)
            .then((res) => {
                //console.log(res.data.authKey)
                //localStorage.setItem("authKey", res.data.authKey)
                postLogin(this.state.email, this.state.password)
                    .then((res) => {
                        this.state.cookies.set('authKey', res.data.authKey, {path: '/'});
                        window.location.replace("/overview");
                    })
                    .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });
            })
            .catch(err => {
                this.handleErrorOpen(err.response.data.error);
                console.log(err.response.data.error);
                console.log(err);
            });
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

    render() {
        return (
            <React.Fragment>
                <Dialog open={this.props.open}
                        onClose={this.props.onClose}
                        style={{marginTop: '15px'}}
                        fullWidth maxWidth="lg">
                    <DialogTitle titleTypographyProps={{variant:'h5' }}
                                 style={{backgroundColor: "#254563", color: 'white', height: "35px", textAlign: "left"}}>
                        <img src="/assets/logo_with_text.png" style={{height:"45px", top: "-5px", position:"relative"}} alt="Logo"/>
                    </DialogTitle>
                    <DialogContent>
                                    <Grid container spacing={4} alignItems="flex-end">
                                        <Grid item>
                                            <Face/>
                                        </Grid>

                                        <Grid item md={true} sm={true} xs={true}>
                                            <TextField id="email" label="Email" type="email" fullWidth autoFocus
                                                       required onChange={this.setEmail} value={this.state.email}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={4} alignItems="flex-end">
                                        <Grid item>
                                            <Fingerprint/>
                                        </Grid>
                                        <Grid item md={true} sm={true} xs={true}>
                                            <TextField id="password" label="Password" type="password" fullWidth required
                                                       onChange={this.setPassword} value={this.state.password}/>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <br/>
                                    <Grid container justify="center" style={{marginTop: '10px'}}>
                                        <Button color="primary" onClick={this.registerActionSubmit} style={{
                                            fontWeight: "bold",
                                            textTransform: "none",
                                            backgroundColor: "#B4A0B9",
                                            color: "white"
                                        }}>CREATE NEW ACCOUNT</Button>
                                        <br/>
                                    </Grid>
                                    <Grid container justify="center" style={{marginTop: '10px'}}>
                                        <p>100% free for personal use</p>
                                    </Grid>
                    </DialogContent>
                </Dialog>

                {this.state.errorOpen === true &&
                <ErrorModal open={this.state.errorOpen} onClose={this.handleErrorClose} errorMessage={this.state.errorMessage}/>}
            </React.Fragment>
        )
    }
}
