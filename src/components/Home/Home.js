import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Grid,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
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

const useStyles = makeStyles({
    root: {
        minWidth: 100,
        border: "none",
        boxShadow : "none",
        backgroundColor: '#254563'
    },
    mainCard: {
        backgroundColor: '#254563',
    },
    mainCard2: {
        color: '#FFFFFF',
        backgroundColor: '#c4b1c9',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const useStyles2 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        border: "none",
        boxShadow : "none",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useStyles3 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Home() {
    const classes = useStyles();

    const classes2 = useStyles2();

    const classes3 = useStyles3();

    return(
            <React.Fragment>
                <Helmet>
                    <style>{'body { background-color: #254563; }'}</style>
                </Helmet>

                <Container>
                    <div className={classes2.root}>
                        <AppBar className={classes2.root} position="static">
                            <Toolbar>
                                <Typography variant="h6" className={classes2.title}>

                                </Typography>
                                <Button color="secondary" component={Link} to="/overview">Start now</Button>
                                <AccountBoxIcon color="secondary"/>
                            </Toolbar>
                        </AppBar>
                    </div>
                </Container>

                <Container>
                    <div className={classes3.root}>
                        <Grid container spacing={1} direction="row"
                              justify="center"
                              alignItems="center">
                            <Grid item xs={6}>
                                <img src={"./assets/logo_without_text.svg"} style={{width: "500px"}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Card className={classes.root}>
                                    <CardContent className={classes.mainCard}>
                                        <Typography variant="h3" component="h2" color="secondary">
                                            DISCOVER THE <br/> SURVEY WIZARDS <br/> SURVEY TOOL
                                        </Typography>
                                        <Typography variant="h6" component="p" color="secondary">
                                            create surveys easily to embed them on your website
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.mainCard}>
                                        <Button className={classes.mainCard2} variant="contained" component={Link} to="/login">
                                            START NOW
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </Container>

            </React.Fragment>
        )
}
