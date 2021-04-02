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

}
