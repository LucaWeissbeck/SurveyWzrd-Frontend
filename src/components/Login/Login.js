import React from 'react';
import {Helmet} from "react-helmet";
import {
    AppBar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Container, Dialog, DialogContent, DialogTitle, FormControlLabel,
    Grid, Slide, Snackbar,
    TextField,
} from "@material-ui/core";
import {Face, Fingerprint} from "@material-ui/icons";
import Cookies from 'universal-cookie';
import {postLogin} from "../../services/user/login-service";

export class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cookies: new Cookies(),
            email: "",
            isChecked : false,
            password: "",
            //errorOpen: false,
        };
        if (this.state.cookies.get('authKey') !== undefined){
           console.log("User Authenticated")
            //this.props.history.push('/overview')
            window.location.replace("/overview");
        }

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
/*
    handleErrorOpen = (event) => {
        this.setState({
            errorOpen: true
        });
    }

    handleErrorClose =() => {
        this.setState({errorOpen: false})
    }
*/
    componentDidMount() {

    }

    loginActionSubmit = () =>{
        console.log(this.state.email)
        console.log(this.state.password)
        postLogin(this.state.email, this.state.password)
            .then((res) =>{
                console.log(res);
                localStorage.setItem("isOwner", res.data.owner);
                let dateactual = Date.now();
                if (this.state.isChecked) this.state.cookies.set('authKey', res.data.authToken.authKey , { path: '/', maxAge: 5259600 }); // 5259600 equals 2 Months in seconds
                else this.state.cookies.set('authKey', res.data.authToken.authKey , { path: '/' });


                //this.props.history.push('/overview')
                window.location.replace("/overview");
            })
            .catch(err => {
                //this.handleErrorOpen();
                console.log(err.response.data.error);
                console.log(err);
            });


    }
    handleRememberMeChange(e) {
        this.state.isChecked = e.target.checked;
    }

    render(){
        return (
            <React.Fragment >
                    <Dialog open={this.props.open}
                            onClose={this.props.onClose}
                            style={{marginTop: '15px'}}
                            fullWidth maxWidth="md">
                        <DialogTitle titleTypographyProps={{variant:'h5' }}
                                     style={{backgroundColor: "#254563", color: 'white', height: "35px", textAlign: "left"}}>
                                <img src="/assets/logo_with_text.png" style={{height:"45px", top: "-5px", position:"relative"}} alt="Logo"/>
                        </DialogTitle>
                        <DialogContent>
                                        <Grid container spacing={4} alignItems="flex-end">
                                            <Grid item>
                                                <Face />
                                            </Grid>

                                            <Grid item md={true} sm={true} xs={true}>
                                                <TextField id="email" label="Email" type="email" fullWidth autoFocus required onChange={this.setEmail} value={this.state.email}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={4} alignItems="flex-end">
                                            <Grid item>
                                                <Fingerprint />
                                            </Grid>
                                            <Grid item md={true} sm={true} xs={true}>
                                                <TextField id="password" label="Password" type="password" fullWidth required onChange={this.setPassword} value={this.state.password}/>
                                            </Grid>
                                        </Grid>
                                        <br/>
                                        <br/>
                                        <Grid container alignItems="center" justify="space-between">
                                            <Grid item>
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        color="primary" onChange={e => this.handleRememberMeChange(e)}
                                                    />
                                                } label="Remember me" />
                                            </Grid>
                                        </Grid>
                                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                                            <Button  color="primary" onClick={this.loginActionSubmit} style={{fontWeight: "bold", textTransform: "none", backgroundColor: "#B4A0B9", color: "white" }}>LOGIN</Button>
                                            <br/>
                                        </Grid>
                        </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}
