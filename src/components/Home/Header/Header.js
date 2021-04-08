import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Button, Tabs, Tab, MuiThemeProvider} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HelpIcon from '@material-ui/icons/Help';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import App from "../../../App";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

export default function Header(props) {
        const classes = useStyles();
        const [tabValue, setValue] = React.useState(props.header);
        return(
/*
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static" color="primary" style={{height: '90px'}}>
                    <Toolbar variant="regular">
                        <img src={"./assets/survey_wzrd_logo_ideas.svg"} className={classes.navImage}/>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/overview">
                            <Typography variant="h5" style={{fontWeight: "bold", textDecoration: "underline"}}>Overview</Typography>
                        </Button>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/createsurvey">
                            <Typography variant="h5" style={{fontWeight: "bold", textDecoration: "underline"}}>Create Survey</Typography>
                        </Button>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/analytics">
                            <Typography variant="h5" style={{fontWeight: "bold", textDecoration: "underline"}}>Analytics</Typography>
                        </Button>
                        <Button color="secondary" className={classes.headerOptions} component={Link} to="/how">
                            <Typography variant="h5" style={{fontWeight: "bold", textDecoration: "underline"}}>How To</Typography>
                        </Button>
                        <IconButton>
                            <AccountBoxIcon color="secondary" fontSize="large"></AccountBoxIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
*/
        <React.Fragment>
            <AppBar position="static">
                <img src={"./assets/logo_without_text.svg"} style={{maxWidth: "150px", maxHeight: "40px", display: "inline", marginBottom: "-60px", marginLeft: "20px", marginTop: "20px"}} />
                <Tabs value={tabValue} centered={true}>
                    <Tab label="Overview" classes={{ root: classes.tab }} icon={<HomeIcon fontSize="large"/>} component={Link} to="/overview"/>
                    <Tab label="Create Survey" classes={{ root: classes.tab }} icon={<NoteAddIcon fontSize="large"/>} component={Link} to="/createsurvey"/>
                    <Tab label="Analytics" classes={{ root: classes.tab }} icon={<AssessmentIcon fontSize="large"/>} component={Link} to="/analytics"/>
                    <Tab label="How To" classes={{ root: classes.tab }} icon={<HelpIcon fontSize="large"/>} component={Link} to="/how"/>
                </Tabs>
            </AppBar>
        </React.Fragment>

        )

}

