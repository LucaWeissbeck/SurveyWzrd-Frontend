import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Card, CardActions, CardContent, Grid, Box, Button, FormControlLabel, Switch, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Header from "../Header/Header";
import {Helmet} from "react-helmet";
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";




const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

const useStylesMUI =  makeStyles((theme) =>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        textField: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(1),
            width: '25ch',
        },

    },
}));

export default function CreateSurvey(){
    const classes = useStyles();
    const classesMUI = useStylesMUI();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return(
       <React.Fragment>
           <Header header={1}/>
           <Helmet>
               <style>{'body { background-color: #D9DCE1; }'}</style>
           </Helmet>

           <Container>
               <Box p={1}/>

               <Grid container justify = "center">
                   <Box width="70%">
                       <Card className={classes.root}>
                           <CardContent>
                               <TextField
                                   id="standard-basic"
                                   label="Insert Title..."
                                   InputProps={{ disableUnderline: true }}
                               />
                               <form className={classes.root} noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="filled-textarea"
                                           label="Insert survey description here..."
                                           InputProps={{ disableUnderline: true }}
                                           multiline
                                           rows={3}
                                           multiline
                                           fullWidth
                                           variant="filled"
                                       />
                                   </div>
                               </form>
                               <form className={classes.root} noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="standard-basic"
                                           label="Question"
                                           fullWidth
                                       />
                                   </div>
                               </form>
                               <Box p={1}/>
                               <form className={classesMUI.textField} noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="standard-basic"
                                           label="Answer 1"
                                           fullWidth
                                       />
                                   </div>
                               </form>
                               <form className={classesMUI.textField} noValidate autoComplete="off">
                                   <div>
                                       <TextField
                                           id="standard-basic"
                                           label="Answer 2"
                                           fullWidth
                                       />
                                   </div>
                               </form>
                               <form className={classesMUI.textField} noValidate autoComplete="off">
                                   <div>
                                       <Grid container spacing={1} alignItems="flex-end">
                                           <Grid item>
                                               <AddBoxIcon/>
                                           </Grid>
                                           <Grid item>
                                               <TextField
                                                   id="input-with-icon-grid"
                                                   label="Additional Answer"
                                                   fullWidth
                                               />
                                           </Grid>
                                       </Grid>
                                   </div>
                               </form>
                               <FormControlLabel
                                   control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                   label="Allow Several Answers"
                               />
                           </CardContent>
                           <CardActions>
                               <Button className={classes.mainCard2} variant="contained" component={Link} to="/overview">
                                   CREATE
                               </Button>
                           </CardActions>
                       </Card>
                   </Box>
               </Grid>
           </Container>
       </React.Fragment>
    )
}

