import React from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HelpIcon from '@material-ui/icons/Help';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {postLogout} from "../../../services/user/logout-service";
import Cookies from 'universal-cookie';


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
    tab: {
        width: "200px"
    },
    navBar: {
        height: "90px"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [tabValue] = React.useState(props.header);
    const history = useHistory();
    const cookies = new Cookies();
    const logoutActionSubmit = () => {
        postLogout()
            .then((res) => {
                cookies.remove('authKey');
                return history.push('/');
            })
            .catch(err => {
                console.log(err);
            });


    }

//TODO: ErrorHandling!!!

    return (

        <React.Fragment>
            <AppBar position="static">
                <img src={"/assets/icon_small.png"} alt="Logo" style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    display: "inline",
                    marginBottom: "-60px",
                    marginLeft: "20px",
                    marginTop: "20px"
                }}/>
                <Tabs value={tabValue} centered={true}>
                    <Tab label="Overview" classes={{root: classes.tab}} icon={<HomeIcon fontSize="large"/>}
                         component={Link} to="/overview"/>
                    <Tab label="Create Survey" classes={{root: classes.tab}} icon={<NoteAddIcon fontSize="large"/>}
                         component={Link} to="/createsurvey"/>
                    <Tab label="How To" classes={{root: classes.tab}} icon={<HelpIcon fontSize="large"/>}
                         component={Link} to="/how"/>
                    <Tab label="Logout" classes={{root: classes.tab}} icon={<MeetingRoomIcon fontSize="large"/>}
                         onClick={logoutActionSubmit}/>
                </Tabs>
            </AppBar>


        </React.Fragment>

    )

}

