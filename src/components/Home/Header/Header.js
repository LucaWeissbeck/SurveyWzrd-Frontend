import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Button} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    headerOptions: {
        justifyContent: "space-evenly",
        display: "flex",
        flex: 1,
        fontSize: "1vw",
        font: "Roboto"
    },
    navImage:{
        width: "600px",
        height: "250px",
        marginLeft: "-170px"

    },
    navBar:{
        height: "90px"
    }
}));


export default function Header() {
        const classes = useStyles();

        return(
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static" color="primary" style={{height: '90px'}}>
                    <Toolbar variant="regular">
                        <img src={"./assets/survey_wzrd_logo_ideas.svg"} className={classes.navImage}/>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/overview">
                            <Typography variant="h5">Overview</Typography>
                        </Button>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/createsurvey">
                            <Typography variant="h5">Create Survey</Typography>
                        </Button>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/analytics">
                            <Typography variant="h5">Analytics</Typography>
                        </Button>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/how">
                            <Typography variant="h5">How To</Typography>
                        </Button>
                        <IconButton>
                            <AccountBoxIcon color="secondary" fontSize="large"></AccountBoxIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>


        )

}

