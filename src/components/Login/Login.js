import React from 'react';
import * as surveyService from "../../services/overview/overview-service";
import Header from "../Home/Header/Header";
import {Helmet} from "react-helmet";
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox,
    Container, FormControlLabel,
    Grid,
    IconButton, Paper, Tab, Tabs, TextField,
    Typography
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {Face, Fingerprint} from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import {Link} from "react-router-dom";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HelpIcon from "@material-ui/icons/Help";
import {makeStyles} from "@material-ui/core/styles";
import {postLogin} from "../../services/user/login-service";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        border: "none",
        boxShadow : "none",
        backgroundColor: '#D9DCE1'
    },
    headerOptions: {
        justifyContent: "space-evenly",
        display: "flex",
        flex: 1,
        fontSize: "1vw",
        font: "Roboto"
    },
    tab:{
        width: "200px"
    },
    navBar:{
        height: "90px"
    },
    menuButton:{
        marginRight: theme.spacing(2)
    }
}));

export class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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

    loginActionSubmit = () =>{

        console.log("Test");
        console.log(this.state.email)
        console.log(this.state.password)
        postLogin(this.state.email, this.state.password)
            .then((res) =>{
                console.log(res.data.authKey)
                localStorage.setItem("authKey", res.data.authKey)
            })
            .catch(err => console.log(err));


    }

    render(){
        //const { values, handleChangeForm } = props;
        const styles = theme => ({
            margin: {
                margin: theme.spacing.unit * 2,
            },
            padding: {
                padding: theme.spacing.unit
            }
        });

        //const ss = useStyles();

        return (
            <React.Fragment >
                <Helmet>
                    <style>{'body { background-color: #D9DCE1; }'}</style>
                </Helmet>
                <Container>
                    <Container style={{marginTop: '15px'}}>
                        <Card>
                            <CardHeader
                                titleTypographyProps={{variant:'h5' }}
                                avatar={
                                    <img src="/assets/logo_with_text.png" style={{width: "180px", height:"160px", marginBottom: "-5px"}}/>
                                }
                                style={{backgroundColor: "#254563", color: 'white', height: "35px", textAlign: "right"}}>
                            </CardHeader>
                            <CardContent>
                                    <div >
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
                                                        color="primary"
                                                    />
                                                } label="Remember me" />
                                            </Grid>
                                        </Grid>
                                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                                            <Button  color="primary" onClick={this.loginActionSubmit} style={{fontWeight: "bold", textTransform: "none", backgroundColor: "#B4A0B9", color: "white" }}>Login</Button>
                                            <br/>
                                        </Grid>
                                    </div>
                            </CardContent>
                        </Card>

                </Container>
                </Container>

            </React.Fragment>
        )
    }
}
