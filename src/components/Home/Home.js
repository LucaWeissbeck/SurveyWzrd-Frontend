import React from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {
    Grid,
    AppBar,
    Toolbar,
    Card,
    CardActions,
    CardContent,
    Container,
    Button,
    Typography,
    Tab
} from "@material-ui/core";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie/es6";
import {ModalComponent} from "./Overview/ModalComponent";
import {Login} from "../Login/Login";
import {Register} from "../Login/Register";


export class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loginOpen: false,
            registerOpen: false
        }
    }

    handleLoginOpen = (event) => {
        this.setState({
            loginOpen: true
        });
    }

    handleLoginClose =() => {
        this.setState({loginOpen: false})
    }

    handleRegisterOpen = (event) => {
        this.setState({
            registerOpen: true
        });
    }

    handleRegisterClose =() => {
        this.setState({registerOpen: false})
    }

    render() {
    return(
            <React.Fragment>
                <Helmet>
                    <style>{'body { background-color: #254563; }'}</style>
                </Helmet>

                <Container>
                    <div>
                        <AppBar style={{boxShadow: "none"}}>
                            <Toolbar>
                                <Grid container spacing={0}>
                                    <Grid item xs={11}>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button color="secondary" component={Link} to="/overview">
                                            <AccountBoxIcon color="secondary" />
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Toolbar>
                        </AppBar>
                    </div>
                </Container>

                <Container>
                    <div>
                        <Grid container spacing={1} direction="row" justify="center" alignItems="center" style={{minHeight: "100vh"}}>
                            <Grid item xs={6}>
                                <img src={"./assets/logo_without_text.svg"} style={{maxWidth: "500px"}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Card style={{backgroundColor: '#254563', border: "none", boxShadow: "none" }}>
                                    <CardContent>
                                        <Typography variant="h3" component="h2" color="secondary">
                                            DISCOVER THE <br/> SURVEY WIZARDS <br/> SURVEY TOOL
                                        </Typography>
                                        <Typography variant="h6" component="p" color="secondary">
                                            create surveys easily to embed them on your website
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" style={{fontWeight: "bold", textTransform: "none", backgroundColor: "#B4A0B9", color: "white" }} onClick={this.handleRegisterOpen}>
                                            REGISTER
                                        </Button>
                                        <Button variant="contained" style={{fontWeight: "bold", textTransform: "none", backgroundColor: "#B4A0B9", color: "white" }} onClick={this.handleLoginOpen}>
                                            LOGIN
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </Container>

                {this.state.loginOpen === true &&
                <Login open={this.state.loginOpen} onClose={this.handleLoginClose}/>}

                {this.state.registerOpen === true &&
                <Register open={this.state.registerOpen} onClose={this.handleRegisterClose}/>}

            </React.Fragment>
        )
}
}
